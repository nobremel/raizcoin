import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, 
    doc, 
    getDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD1JxgT8Qm2W0p4uHkGgkMZpQ0zVvYt1x0",
    authDomain: "mundoraiz-e8e08.firebaseapp.com",
    projectId: "mundoraiz-e8e08",
    storageBucket: "mundoraiz-e8e08.appspot.com",
    messagingSenderId: "1029384756",
    appId: "1:1029384756:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let manterAberto = false;
let autoCloseTimer = null;

// Fecho automático inteligente
function iniciarFechoAutomatico() {
    autoCloseTimer = setTimeout(() => {
        if (!manterAberto) {
            window.close();
        }
    }, 3000); // 3 segundos
}

// Botão Fechar/Manter
const btn = document.getElementById("fecharBtn");
btn.textContent = "Fechar / Manter";

btn.onclick = () => {
    if (!manterAberto) {
        // Primeiro clique → cancelar fecho automático
        manterAberto = true;
        clearTimeout(autoCloseTimer);
        btn.textContent = "Fechar";
    } else {
        // Segundo clique → fechar
        window.close();
    }
};

// Carregar saldo
async function carregarSaldo() {
    const saldoEl = document.getElementById("saldo");
    const animContainer = document.getElementById("animContainer");

    const docRef = doc(db, "users", "mario");
    const snap = await getDoc(docRef);

    const dados = snap.data();
    const saldo = dados.carteira || 0;

    saldoEl.textContent = saldo + " RC";
    saldoEl.classList.add("pulse");

    const ganho = window.localStorage.getItem("ultimoGanhoRC");
    if (ganho) {
        const anim = document.createElement("div");
        anim.className = "rise";
        anim.textContent = "+" + ganho + " RC";
        animContainer.appendChild(anim);

        setTimeout(() => anim.remove(), 1500);
        window.localStorage.removeItem("ultimoGanhoRC");
    }
}

// Iniciar tudo
(async () => {
    await carregarSaldo();
    iniciarFechoAutomatico();
})();
