require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = 3000;

// Configurações do Express pra enviar localhost para a pasta "pages"
app.use(express.static(path.join(__dirname, '../pages')));

// Redirecionando ao arquivo "index.html"
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/pages/index.html'));
  });
  
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Middleware
app.use(express.json()); // Substitui o bodyParser.json()
app.use(express.urlencoded({ extended: true })); // Para lidar com formulários HTML

// Tornando estas pastas públicas para o navegador (necessário para carregar estilos e scripts)
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));
app.use('/db', express.static(path.join(__dirname, 'db')));


// Rota para processar o formulário
app.post('/enviar', async (req, res) => {
  const { nome, email, mensagem } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
  });

  function removerTagsHTML(mensagem) {
    return mensagem.replace(/<[^>]*>/g, '');
  }
  removerTagsHTML(mensagem)

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Mensagem de ${nome}`,
    html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
      <h2 style="color: #333;">📩 Mensagem do formulário do site</h2>
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensagem:</strong></p>
      <div style="background: #f7f7f7; padding: 10px; border-radius: 5px; white-space: pre-wrap;">
        ${mensagem}
      </div>
    </div>
  `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.send('Erro ao enviar: ' + error.toString());
    }
    res.send(`
      <script>
        Swal.fire({
          title: "Mensagem Enviada!",
          text: "Entraremos em contato!",
          icon: "sucess"
        });
    `);
  });
});