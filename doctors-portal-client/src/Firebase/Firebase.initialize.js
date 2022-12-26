import { initializeApp } from "firebase/app";
import firebaseConfig from "./Firebase.Config";

const initializeAuth = () => {
    initializeApp(firebaseConfig);
}

export default initializeAuth;