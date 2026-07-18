// Inicialização Firebase para o RaizCoin
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// A tua configuração REAL
const firebaseConfig = {
  apiKey: "AIzaSyDnJzzyFXyhmohrOSVrrXhmrVrVHjpeUSQ",
  authDomain: "mundoraiz-e8e08.firebaseapp.com",
  projectId: "mundoraiz-e8e08",
  storageBucket: "mundoraiz-e8e08.firebasestorage.app",
  messagingSenderId: "461587763140",
  appId: "1:461587763140:web:487528650faddfd4869e91"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Tornar Firestore acessível às páginas
window.db = getFirestore(app);
