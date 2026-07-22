// api/missaoCompleta.js

const admin = require("firebase-admin");

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.firebase_service_account);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

// Valores das missões
const valores = {
  "Explorar um Espaço": 5,
  "Completar uma Atividade": 10,
  "Descoberta Especial": 20
};

module.exports = async (req, res) => {
  try {
    const { id, tipo, user, token } = req.query;

    // Segurança básica
    if (token !== "RAIZ-SECRETO-2024") {
      return res.status(403).json({ erro: "Token inválido" });
    }

    if (!id || !tipo || !user) {
      return res.status(400).json({ erro: "Parâmetros em falta" });
    }

    // Verificar se o tipo existe
    if (!valores[tipo]) {
      return res.status(400).json({ erro: "Tipo de missão desconhecido" });
    }

    const valorRC = valores[tipo];

    // 1. Registar missão cumprida
    await db
      .collection("users")
      .doc(user)
      .collection("missoes")
      .doc(id)
      .set({
        cumprida: true,
        tipo: tipo,
        valor: valorRC,
        timestamp: new Date()
      });

    // 2. Atualizar carteira
    const carteiraRef = db.collection("users").doc(user);
    const carteiraSnap = await carteiraRef.get();

    const saldoAtual = carteiraSnap.data()?.saldo || 0;
    const novoSaldo = saldoAtual + valorRC;

    await carteiraRef.update({ saldo: novoSaldo });

    // 3. Registar histórico
    await db
      .collection("users")
      .doc(user)
      .collection("historico")
      .add({
        missao: id,
        tipo: tipo,
        valor: valorRC,
        timestamp: new Date()
      });

    // 4. Resposta final
    return res.json({
      mensagem: "Missão completa e RC atribuídos",
      missao: id,
      tipo: tipo,
      ganho: valorRC,
      saldo: novoSaldo
    });

  } catch (erro) {
    console.error("Erro:", erro);
    return res.status(500).json({ erro: "Erro interno no servidor" });
  }
};
