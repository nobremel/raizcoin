import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// ⚠️ Usa a tua config real do firebase.js
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

export async function handler(event, context) {
  const params = event.queryStringParameters;

  const user = params.user;
  const missao = params.id;
  const token = params.token;

  const TOKEN_SECRETO = "RAIZ-SECRETO-2024";

  if (token !== TOKEN_SECRETO) {
    return {
      statusCode: 403,
      body: "Token inválido"
    };
  }

  await setDoc(doc(db, "users", user, "missoes", missao), {
    cumprida: true,
    timestamp: new Date()
  });

  return {
    statusCode: 200,
    body: "Missão registada com sucesso"
  };
}

