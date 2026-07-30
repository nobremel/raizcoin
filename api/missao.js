const admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.firebase_service_account);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

module.exports = async (req, res) => {
  const { id, user, token, tipo } = req.query;
  const TOKEN_SECRETO = "RAIZ-SECRETO-2024";

  if (token !== TOKEN_SECRETO) {
    return res.status(403).json({ status: "erro", mensagem: "Token inválido" });
  }

  // Pontos por tipo de missão
  const pontosPorTipo = {
    ritual: 10,
    explorar: 5,
    descoberta: 20
  };

  const pontos = pontosPorTipo[tipo] || 0;

  const missaoRef = db
    .collection("users")
    .doc(user)
    .collection("missoes")
    .doc(id);

  const missaoSnap = await missaoRef.get();

  // ✔️ Se a missão já existe, verificar cooldown
  if (missaoSnap.exists) {
    const dados = missaoSnap.data();
    const ultimaVez = dados.timestamp.toDate();
    const agora = new Date();

    const diffMinutos = (agora - ultimaVez) / (1000 * 60);

    // ✔️ Cooldown de 5 minutos
    if (diffMinutos < 5) {
      return res.status(200).json({
        status: "cooldown",
        mensagem: "Missão repetida demasiado rápido",
        minutosRestantes: Math.ceil(5 - diffMinutos),
        pontos: 0
      });
    }
  }

  // ✔️ Registar missão (primeira vez ou após cooldown)
  await missaoRef.set({
    cumprida: true,
    tipo,
    pontos,
    timestamp: new Date()
  });

  // ✔️ Incrementar carteira
  await db
    .collection("users")
    .doc(user)
    .set(
      { carteira: admin.firestore.FieldValue.increment(pontos) },
      { merge: true }
    );

  return res.status(200).json({
    status: "ok",
    mensagem: "Missão registada",
    pontos
  });
};
