<script setup>
import { getAuth, signOut } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();



function cerrarsesion(){
    const auth = getAuth();
        signOut(auth).then(() => {
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });

    router.push("/")
}



</script>


<template>

    <button @click="cerrarsesion">cerrar sesion</button>

</template>