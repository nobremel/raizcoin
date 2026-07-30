module.exports = async (req, res) => {
  const { tipo, id, user } = req.query;

  // Chamar a API principal que atribui pontos
  const resposta = await fetch(
    `https://raizcoin.vercel.app/api/missao?user=${user}&token=RAIZ-SECRETO-2024&tipo=${tipo}&id=${id}`
  );

  const dados = await resposta.json();
  const pontos = dados.pontos || 0;

  // Página mínima que fecha automaticamente e envia o ganho para localStorage
  res.send(`
    <html>
      <body style="font-family:Arial; text-align:center; padding-top:40px;">
        <h3>Missão registada!</h3>

        <script>
          // Guardar o valor ganho para a animação da carteira
          try {
            window.localStorage.setItem("ultimoGanhoRC", "${pontos}");
          } catch(e) {}

          // Fechar automaticamente
          setTimeout(() => window.close(), 500);
        </script>
      </body>
    </html>
  `);
};
