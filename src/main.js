import './assets/main.css'

import { VueFire, VueFireAuth } from 'vuefire'
import { createApp } from 'vue'
import App from './App.vue'
import { firebaseApp } from './firebase'
import { createRouter, createWebHistory} from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";


import privada from './components/privada.vue'
import inicio from './components/inicio.vue'
import cuerpo from './components/cuerpo.vue'

const routes = [
  { path: '/', component: inicio},
  { path: '/privada', component: cuerpo },
  {path: '/notas', component: cuerpo}

]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(import.meta.env.BASE_URL),
  routes, // short for `routes: routes`
})


let estasIdentidicado=false;

router.beforeEach((to, from)=>{

  console.log('cambio de ruta')

  if(to.path =="/privada"  && !estasIdentidicado)
    return false;
  else
  return true;
})


const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    estasIdentidicado=true;
    // ...
  } else {

    estasIdentidicado=false;


    
  }
});



const app = createApp(App)

app.use(router)

app.use(VueFire, {
  // imported above but could also just be created here
  firebaseApp,
  modules: [
    // we will see other modules later on
    VueFireAuth(),
  ],
})

app.mount('#app')