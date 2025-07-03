require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/css', express.static(path.join(__dirname, '..', 'css')));
app.use('/images', express.static(path.join(__dirname, '..', 'images')));
app.use('/scripts', express.static(path.join(__dirname, '..', 'scripts')));
app.use('/pages', express.static(path.join(__dirname, '..', 'pages')));

app.use(express.json());


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'pages', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});









console.log("Email: ", process.env.EMAIL_USER)
console.log("Senha: ", process.env.EMAIL_PASS)







// Rota para processar o formulário
app.post('/enviar', (req, res) => {
  const { nome, email, mensagem } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: "julioflaviojunior.bh@gmail.com",
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
          icon: "success"
        });
      </script>
    `);
  });
});