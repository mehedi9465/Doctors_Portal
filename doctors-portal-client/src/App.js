import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home/Home/Home';
import Appointment from './Pages/Appointment/Appointment/Appointment';
import Login from './Pages/Login/Login/Login';
import Register from './Pages/Login/Register/Register';
import AuthProvider from './Context/AuthProvider';
import PrivateRoute from './Private Route/PrivateRoute';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import DashboardHome from './Pages/Dashboard/Dashboard Home/DashboardHome';
import AdminRoute from './Pages/Login/Admin Route/AdminRoute';
import AddDoctor from './Pages/Dashboard/Dashboard/Add Doctor/AddDoctor';
import MakeAdmin from './Pages/Dashboard/Make Admin/MakeAdmin';
import Payment from './Pages/Dashboard/Dashboard/Payment/Payment';


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />

            <Route
            path="/appointment"
            element={
              <PrivateRoute>
                <Appointment />
              </PrivateRoute>
            }
            />

            <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>}>
                  <Route path='/dashboard' element={ <DashboardHome /> } />
                  <Route path={`/dashboard/payment/:appointmentId`} element={<Payment />} />
                  <Route 
                  path='/dashboard/makeAdmin' 
                  element={
                    <AdminRoute>
                      <MakeAdmin />
                    </AdminRoute>
                  }/>
                  <Route 
                  path='/dashboard/addDoctor' 
                  element={
                    <AdminRoute>
                      <AddDoctor></AddDoctor>
                    </AdminRoute>
                  } />      
            </Route>

            <Route 
              path='/dashboard'
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
