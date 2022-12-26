const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const admin = require("firebase-admin");
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const fileUpload = require('express-fileupload');

const port = process.env.PORT || 5000;

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(cors());
app.use(express.json());
app.use(fileUpload());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u8ama.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function verifyToken (req, res, next){
  if(req?.headers?.authorization?.startsWith('Bearer ')){
    const token = req?.headers?.authorization?.split(' ')[1];

    try{
      const decodedUser = await admin.auth().verifyIdToken(token);
      req.decodedEmail = decodedUser.email;
    }
    catch{

    }
  }
  next();
}

async function run() {
    try {
      await client.connect();
      const database = client.db("DoctorsPortal");
      const appointmentCollection = database.collection("AvailableAppointment");
      const usersCollection = database.collection("Users");
      const doctorsCollection = database.collection("Doctors");
      
      // get appointments
      app.get('/appointments', async (req, res) => {
        const query = req.query;
        const result = await appointmentCollection.find(query).toArray();
        res.send(result);
      });

      // post appointments
      app.post('/appointments', async (req, res) => {
        const appointment = req.body;
        const result = await appointmentCollection.insertOne(appointment);
        res.send(result);
      });

      app.get('/appointments/:id', async (req, res) => {
        const id = req.params.id;
        const query = {_id: ObjectId(id)}
        const result = await appointmentCollection.findOne(query);
        res.send(result);
      })

      // post Users
      app.post('/users', async (req, res) => {
        const user = req.body;
        const result = await usersCollection.insertOne(user);
        res.send(result);
      })

      // Filter Admin among Users
      app.get('/users', async (req, res) => {
        const query = req.query;
        // console.log(query);
        const user = await usersCollection.findOne(query);
        let isAdmin = false;
        if(user?.role === 'admin'){
          isAdmin = true;
        }
        res.send({"admin" : isAdmin})
      })

      // update user info
      app.put('/users', async (req, res) => {
        const user = req.body;
        const filter = { email: user.email };
        const options = { upsert: true };
        const updateUser = { $set: user };
        const result = await usersCollection.updateOne(filter, updateUser, options);
        res.send(result);
      })

      // Make an User Admin
      app.put('/users/admin', verifyToken, async (req,res) => {
        const user = req.body;
        const requester = req.decodedEmail;
        if(requester){
          const requesterAccount = await usersCollection.findOne({ email: requester});
          if(requesterAccount?.role === 'admin'){
            const filter = { email: user.email };
            const updateDoc = { $set: {role: 'admin'} };
            const result = await usersCollection.updateOne(filter, updateDoc);
            res.send(result);
          }
          else{
            res.status(403).send({ message: 'You do not have access to make someone Admin'});
          }
        }
      })

      // A
      app.post('/create-payment-intent', async (req, res) => {
        const paymentInfo = req.body;
        const amount = paymentInfo.price * 100;
        const paymentIntent = await stripe.paymentIntents.create({
          currency: 'usd',
          amount: amount,
          payment_method_types: ['card']
        })
        console.log(paymentIntent);
        res.send({ clientSecret: paymentIntent.clientSecret })
      })

      // Store Payment Info
      app.put('appointment/:id', async (req, res) => {
        const id = req.params.id;
        const payment = req.body;
        const query = { _id: ObjectId(id) };
        const updateDoc = { 
          $set: {
            payment: payment
          }
         }
         const result = await appointmentCollection.updateOne(query, updateDoc);
         res.send(result);
      })

      // Post Doctors data
      app.post('/doctors', async (req, res) => {
        const name = req.body.name;
        const email = req.body.email;
        const picture = req.files.image;
        const picData = picture.data;
        const encodedPic = picData.toString('base64');
        const imageBuffer = Buffer.from(encodedPic, 'base64');
        const doctor = {
          name,
          email, 
          imageBuffer
        }
        const result = await doctorsCollection.insertOne(doctor);
        res.json(result);
      });

      // Get doctors
      app.get('/doctors', async (req, res) => {
        const result = await doctorsCollection.find({}).toArray();
        res.send(result);
      });

    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Server is running')
});

app.listen(port, () => {
    console.log('Listening to', port);
});