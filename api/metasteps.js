module.exports = async (req, res) => {
  const { tipo, id, user } = req.query;

  // Chamar a API principal que atribui pontos
  await fetch(`https://raizcoin.vercel.app/api/missao?user=${user}&token=RAIZ-SECRETO-2024&tipo=${tipo}&id=${id}`);

  // Página mínima que fecha automaticamente
  res.send(`
    <html>
      <body style="font-family:Arial; text-align:center; padding-top:40px;">
        <h3>Missão registada!</h3>
        <script>
          setTimeout(() => window.close(), 500);
        </script>
      </body>
    </html>
  `);
};
