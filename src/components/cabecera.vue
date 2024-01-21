<script setup>
import { ref } from 'vue';
import { useFirestore } from 'vuefire';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = useFirestore();
let files = null;
let uid;
let nota = ref({
  texto: '',
  prioridad: 'baja',
  terminada: false,
});
let estasIdentidicado=false;

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    uid = user.uid;
    estasIdentidicado=true;
    // ...
  } else {

    estasIdentidicado=false;


    
  }
});

async function nuevanota() {
  if (nota.value.texto.trim() !== '') {
    
    const storage = getStorage();

    for (const file of files) {
      const storageRefVar = storageRef(storage, file.name);
      const snapshot = await uploadBytes(storageRefVar, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      console.log("download url: " + downloadURL);

      addDoc(collection(db, 'prueba'), {
        texto: nota.value.texto,
        prioridad: nota.value.prioridad,
        img: downloadURL,
        terminada: false,
        uid: uid
      });
    }
  }
}

function newnotefile(event) {
  files = event.target.files;
  console.log(files);
}
</script>

<template>
  <div>
    <input type="text" v-model="nota.texto">
    <select v-model="nota.prioridad">
      <option value="baja">Baja</option>
      <option value="media">Media</option>
      <option value="alta">Alta</option>
    </select>
    <input type="file" id="archivo" accept=".jpg, .jpeg, .png" multiple @change="newnotefile($event)">
    <button @click="nuevanota">Nueva nota</button>
  </div>
</template>