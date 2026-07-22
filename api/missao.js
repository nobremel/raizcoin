import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

export default async function handler(req, res) {
  const { id, user, token } = req.query;

  const TOKEN_SECRETO = "RAIZ-SECRETO-2024";

  if (token !== TOKEN_SECRETO) {
    return res.status(403).send("Token inválido");
  }

  await db
    .collection("users")
    .doc(user)
    .collection("missoes")
    .doc(id)
    .set({
      cumprida: true,
      timestamp: new Date()
    });

  return res.status(200).send("Missão registada com sucesso");
}
