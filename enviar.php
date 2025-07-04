<?php    
  if ($_POST['security'] == '') {} else{
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $mensagem = htmlspecialchars($_POST['mensagem']);
    
    // Exibe os valores no navegador
    // echo "<h1>Dados Recebidos</h1>";
    // echo "<p><strong>Nome:</strong> " . htmlspecialchars($nome) . "</p>";
    // echo "<p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>";
    // echo "<p><strong>Mensagem:</strong> " . htmlspecialchars($mensagem) . "</p>";
    
    $to = 'julinho@lagesoliveira.com.br';
    $subject = 'Contato de junior.lagesoliveira.com.br';
    $message = "
    <html>
      <body>
        <div style=\"font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 10px;\">
          <h2 style=\"color: #333;\">📩 Mensagem do formulário do site</h2>
          <p><strong>Nome:</strong> $nome</p>
          <p><strong>Email:</strong> $email</p>
          <p><strong>Mensagem:</strong></p>
          <div style=\"background: #f7f7f7; padding: 10px; border-radius: 5px; white-space: pre-wrap;\">
            $mensagem
          </div>
        </div>
      </body>
    </html>
    ";
    $headers = "Content-type:text/html;charset=UTF-8";

    try {
      if (mail($to, $subject, $message, $headers)) {
        header("Location: index.html?status=sucesso");
      } else {
        header("Location: index.html?status=erro");
      }
    } catch (Exception $error) {
      header("Location: index.html?status=erro");
    }
  }
?>