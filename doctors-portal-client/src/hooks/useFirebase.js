import { useEffect, useState } from "react";
import initializeAuth from "../Firebase/Firebase.initialize";
import axios from 'axios';
import swal from 'sweetalert';
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, getIdToken } from "firebase/auth";

// Initialize Firebase App
initializeAuth();

const useFirebase = () => {

    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [status, setStatus] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [token, setToken] = useState('');

    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();

    const googleSignIn = (location, navigate) => {
    
        setStatus(true);
        signInWithPopup(auth, googleProvider)
        .then((result) => {
            const user = result.user;
            saveUser(user.email, user.displayName, 'PUT');
            setError('');
            const destination = location?.state?.from || '/';
            navigate(destination);
        }).catch((error) => {
            setError(error.message);
        }).finally(() => setStatus(false));
    }

    const registerUser = (name, email, password, navigate) => {
        setStatus(true);
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            setError('');
            const newUser = { email, displayName: name};
            setUser(newUser);
            saveUser(email, name, 'POST' );
            updateProfile(auth.currentUser, {
                displayName: name
            }).then(() => {
                setError('');
            }).catch(e => {
                setError(e.message);
            })
            
            navigate('/');
        }).catch(e => {
            setError(e.message)
        })
        .finally(() => {
            setStatus(false);
        })
    }

    const loginUser = (email, password, location, navigate) => {
        setStatus(true);
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const des = location?.state?.from || '/' ;
            navigate(des);
            setError('');
        }).catch(e => {
            setError(e.message)
        })
        .finally(() => {
            setStatus(false);
        })
    }

    const logOut = () => {
        setStatus(true);
        signOut(auth)
        .then(() => {
            setUser({});
            setError('');
        }).catch(e => {
            setError(e.message)
        })
        .finally(() => {
            setStatus(false);
        })
    }

    const saveUser = (email, displayName, method) => {
        const user = {email, displayName};
        fetch('http://localhost:5000/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.insertedId || data.acknowledged){
                swal({
                    title: "Welcome!",
                    icon: "success",
                    button: "ok",
                  });
            }
            else {
                swal({
                    title: "Something Went Wrong!",
                    icon: "error",
                    button: "ok",
                  });
            }
        })
    }

    useEffect(() => {
        onAuthStateChanged(auth ,user => {
            if(user){
                setUser(user)
                getIdToken(user)
                .then(idToken => {
                    setToken(idToken);
                })
                .catch(e => setError(e.message))
            }
            else{
                setUser({});
            }
            setStatus(false);
        })
    }, [auth])

    useEffect(() => {
        if(user?.email){
            axios.get(`http://localhost:5000/users?email=${user?.email}`)
            .then(({ data }) => setAdmin(data.admin))
        }
    }, [user?.email])

    return {
        admin,
        user, 
        error,
        status,
        token,
        registerUser,
        loginUser,
        logOut,
        googleSignIn
    }
}

export default useFirebase;