import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

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

  await db
    .collection("users")
    .doc(user)
    .collection("missoes")
    .doc(missao)
    .set({
      cumprida: true,
      timestamp: new Date()
    });

  return {
    statusCode: 200,
    body: "Missão registada com sucesso"
  };
}



