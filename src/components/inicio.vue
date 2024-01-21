<script setup>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";


import { ref } from 'vue';
import { routerKey } from "vue-router";
import { useRouter } from "vue-router";



var user = ref("");
var email = ref("");
var password = ref("");

var emailr = ref("");
var passwordr = ref("");

function registroEmailYPassword(email,password) {
        
        const auth= getAuth()
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...
            

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage)
            // ..
        });
    }

function iniciarSesion() {
    console.log("inicia sesion");
    const auth = getAuth();

    // Reemplaza 'tu_email' y 'tu_contraseña' con las credenciales que deseas usar
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            user = userCredential.user;
            console.log(user);

            // Redirige al usuario a la página de notas-personales
            router.push("notas-personales");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
            // Manejar errores de inicio de sesión aquí
        });
}

    function iniciasesion(){
        console.log("inicia sesion");
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                user = result.user;
                console.log(user)
                
                



                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });

            router.push("notas-personales")
    }
    

    

</script>


<template>
  <div>
    <div class="login-form">
      <div class="inicio">
        <div>
      <input v-model="email" type="email" placeholder="Correo electrónico">
      <input v-model="password" type="password" placeholder="Contraseña">
      <button @click="iniciarSesion" class="login-button">Iniciar Sesión</button>
      </div>
      <div>
      <input v-model="emailr" type="email" placeholder="Correo electrónico">
      <input v-model="passwordr" type="password" placeholder="Contraseña">
      <button @click="registroEmailYPassword(emailr, passwordr)" class="login-button">Registro Sesión</button>
    </div>
      </div>
      <hr>
      <p>Or</p>
      <button @click="iniciasesion" class="google-login-button">
        <img src="../assets/2000px-Google_G_Logo.svg_.png" alt="Google Logo" class="google-logo">
        Iniciar Sesión con Google
      </button>
    </div>
  </div>
</template>

<style scoped>
.login-form {
  max-width: 300px;
  margin: 0 auto;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.inicio{
  display: flex;
  flex-direction: row;
  gap: 5px;
}



.login-button {
  width: 100%;
  padding: 10px;
  background-color: #ff7139;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #45a049;
}

.google-login-button {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.442);
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
}

.google-logo {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
</style>