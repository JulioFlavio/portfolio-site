<?php
// Só processa se for POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Segurança básica: evitar código malicioso
    $nome = htmlspecialchars($_POST['nome']);
    $email = htmlspecialchars($_POST['email']);
    $mensagem = htmlspecialchars($_POST['mensagem']);

    $destinatario = "julinho@lagesoliveira.com.br";
    $assunto = "Nova mensagem do formulário";

    $corpo = "Nome: $nome\n";
    $corpo .= "Email: $email\n";
    $corpo .= "Mensagem:\n$mensagem";

    $cabecalhos = "From: $email";

    // Tenta enviar o e-mail
    $sucesso = mail($destinatario, $assunto, $corpo, $cabecalhos);
    ?>
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8" />
        <title>Resultado do Envio</title>
        <!-- Importa SweetAlert2 -->
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    </head>
    <body>
    <script>
        // Função para exibir alerta e depois redirecionar
        function mostrarAlerta(tipo, titulo, texto) {
            Swal.fire({
                icon: tipo,        // 'success' ou 'error'
                title: titulo,
                text: texto,
                confirmButtonText: 'OK'
            }).then(() => {
                // Volta para o formulário após fechar o alerta
                window.location.href = 'form.html';
            });
        }

        // Exibe o alerta dependendo do resultado do mail
        const sucesso = <?php echo $sucesso ? 'true' : 'false'; ?>;

        if (sucesso) {
            mostrarAlerta('success', 'Mensagem enviada!', 'Obrigado por entrar em contato. Responderei em breve.');
        } else {
            mostrarAlerta('error', 'Erro no envio', 'Ops! Algo deu errado. Tente novamente mais tarde.');
        }
    </script>
    </body>
    </html>
    <?php
} else {
    // Se acessou direto, redireciona para o formulário
    header("Location: form.html");
    exit;
}
?>
