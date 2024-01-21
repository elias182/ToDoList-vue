<script setup>
import { useCollection } from 'vuefire'
import { collection, addDoc, query, where} from 'firebase/firestore'
import { useFirestore } from 'vuefire';
import { doc, deleteDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { ref, computed } from 'vue';

const router = useRouter();
const auth = getAuth();
let usuario = auth.currentUser;
console.log(usuario);
const db = useFirestore()

// Condicional para decidir qué colección usar
let col;


  // Si el usuario no es admin, usar la colección filtrada por uid
  col = collection(db, 'prueba');


let que;
if (usuario.email !== "eliasmouimi2016@gmail.com") {
  que = query(col, where("uid", "==", usuario.uid));
  console.log(que)
}else{
  que= collection(db, 'prueba');
}
const todos = useCollection(que);
let miNuevaNota = "";

function eliminar(id){
  console.log("hola" + id)
  deleteDoc(doc(db, "prueba", id));
}

function borrarTerminadas() {
  todos.value.forEach((prb) => {
    if (prb.terminada) {
      deleteDoc(doc(db, "prueba", prb.id));
    }
  });
}

function actualizar(id, priori){
  const washingtonRef = doc(db, "prueba", id);
  if (priori=="alta"){
    // Set the "capital" field of the city 'DC'
    updateDoc(washingtonRef, {
      prioridad: "baja"
    });
  } else if(priori=="media"){
    // Set the "capital" field of the city 'DC'
    updateDoc(washingtonRef, {
      prioridad: "alta"
    });
  } else if(priori=="baja") {
    // Set the "capital" field of the city 'DC'
    updateDoc(washingtonRef, {
      prioridad: "media"
    });
  }
}

function marcarTerminada(id, terminada) {
  updateDoc(doc(db, "prueba", id), {
    terminada: !terminada
  });
  console.log(!terminada);
}
function ordenarPorPrioridad() {
  // Ordenar las tareas por prioridad (alta, media, baja)
  todos.value.sort((a, b) => {
    const prioridadOrden = { 'alta': 0, 'media': 1, 'baja': 2 };
    return prioridadOrden[a.prioridad] - prioridadOrden[b.prioridad];
  });
}

function cerrarsesion(){
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });

  router.push("/")
}
</script>

<template>
  <div>
    <button @click="ordenarPorPrioridad" class="sort-button">Ordenar por Prioridad</button>
    <button @click="borrarTerminadas" class="delete-completed-button">Borrar Tareas Terminadas</button>
    <ul class="task-list">
      <li v-for="prb in todos" :key="prb.id" class="task-item">
        <div class="checkbox-wrapper">
          <input type="checkbox" v-model="prb.terminada" @click="marcarTerminada(prb.id, prb.terminada)" class="custom-checkbox">
          <span class="checkmark"></span>
        </div>
        <div class="task-info">
          <img v-if="prb.img" :src="prb.img" class="task-image"/>
          <div class="task-details">
            <span class="task-text">{{ prb.texto }}</span>
            <span class="task-priority">{{ prb.prioridad }}</span>
            
          </div>
          <div class="task-buttons">
            <button @click="eliminar(prb.id)" class="task-button delete-button">Eliminar</button>
            <button @click="actualizar(prb.id, prb.prioridad)" class="task-button priority-button">Aumentar Prioridad</button>
          </div>
        </div>
      </li>
    </ul>
    <button @click="cerrarsesion" class="logout-button">Cerrar Sesión</button>
  </div>
</template>

<style scoped>
.task-list {
  list-style: none;
  padding: 0;
}

.task-item {
  display: flex;
  align-items: center;
  border-bottom: 2px solid #ddd;
  padding: 15px;
  background-color: #F06449;
  border-radius: 15px;
  margin-bottom: 10px;
  overflow: hidden;
  position: relative;
  width: 70vw;
}
.task-item:hover {

  background-color: #F06449;
  box-shadow: 5px 5px 5px 5px #913c2bcb;

}

.task-info {
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-details {
  flex-grow: 1;
  margin-right: 10px;
}

.task-text {
  margin-right: 10px;
  font-size: 18px;
  color: #fff;
}

.task-priority {
  font-weight: bold;
  margin-right: 10px;
  font-size: 16px;
  color: #fff;
}

.task-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
}

.task-buttons {
  display: flex;
  align-items: center;
}

.task-button {
  background-color: #fff;
  color: #F06449;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s, color 0.3s;

}

.task-button:hover {
  background-color: #F06449;
  color: #fff;
}

.delete-button {
  margin-right: 10px;
}

.logout-button {
  background-color: #F06449;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
  transition: background-color 0.3s, color 0.3s;
}

.logout-button:hover {
  background-color: #fff;
  color: #F06449;
}

</style>