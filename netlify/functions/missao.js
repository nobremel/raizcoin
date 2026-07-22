import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: "mundoraiz-e8e08"
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


