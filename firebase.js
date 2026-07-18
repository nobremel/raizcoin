// Configuração Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDq-3u8p1uG9p7vY8Zp8g8p8p8p8p8p8p8",
    authDomain: "mundoraiz-e8e08.firebaseapp.com",
    projectId: "mundoraiz-e8e08",
    storageBucket: "mundoraiz-e8e08.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
window.db = getFirestore(app);
