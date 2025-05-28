<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $mensagem = $_POST['mensagem'];

    $destinatario = "julinho@lagesoliveira.com.br";
    $assunto = "Mensagem de $nome (Formulário de Contato)";

    $corpo = "Nome: $nome\n";
    $corpo .= "E-mail: $email\n\n";
    $corpo .= "Mensagem:\n$mensagem";

    $headers = "From: $email";

    // Tenta enviar o e-mail
    $enviado = mail($destinatario, $assunto, $corpo, $headers);

    if ($enviado) {
        echo json_encode(["success" => true, "message" => "Mensagem enviada com sucesso! 😊"]);
    } else {
        echo json_encode(["success" => false, "message" => "Erro ao enviar. Tente novamente mais tarde."]);
    }
    exit;
}
?>