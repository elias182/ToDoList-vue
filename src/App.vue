<script setup>
import { ref } from 'vue';
import cabecera from './components/cabecera.vue';
import cuerpo from './components/cuerpo.vue';
import inicio from './components/inicio.vue';
import { RouterLink, RouterView } from 'vue-router';
import { getAuth, onAuthStateChanged } from "firebase/auth";

let allnotes = ref([]);
let estasIdentidicado = false;
let fotop = ref();

const user = ref(getAuth().currentUser);


function hola(usur) {
  console.log(usur);
}
</script>

<template>
  <div class="container">
    <header class="fixed-header">
      <div class="wrapper">
        <cabecera ></cabecera>
        <!-- <button v-else="!user" @click="iniciasesion" class="google-login-button">
      <img src="./assets/2000px-Google_G_Logo.svg_.png" alt="Google Logo" class="google-logo">
      Iniciar Sesión con Google
    </button> -->

        
      </div>
      <h1>TO-DO List</h1>
      <nav>
        <router-link class="link" to="/">Inicio</router-link>
        <router-link class="link" to="privada">notas</router-link>
      </nav>
      <img v-if="estasIdentidicado" :src="fotop" alt="Foto de perfil" class="profile-photo">
    </header>

    <RouterView/>
  </div>
</template>

<style scoped>

.link:hover{
  color: #F06449;

}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #36382E;
  color: rgb(255, 255, 255);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

nav {
  margin-right: 20px;
}

nav a {
  text-decoration: none;
  color: white;
  margin-left: 20px;
}

.profile-photo {
  width: 40px; /* Ajusta el tamaño según tus necesidades */
  height: 40px; /* Ajusta el tamaño según tus necesidades */
  border-radius: 50%; /* Para hacer la foto de perfil redonda */
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
}

.google-logo {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
</style>
