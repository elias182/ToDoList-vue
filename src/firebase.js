import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
// ... other firebase imports

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyDC5uQqjmwK5FaFkncDnGekVd67yBjDDJ0",
    authDomain: "tienda-online-strada.firebaseapp.com",
    projectId: "tienda-online-strada",
    storageBucket: "tienda-online-strada.appspot.com",
    messagingSenderId: "312639848218",
    appId: "1:312639848218:web:faef23b077992997a5b6a3",
    measurementId: "G-503T5Y04EQ"
})

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const todosRef = collection(db, 'todos')


//conexion en sources FIREBASE.js