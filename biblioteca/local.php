<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulário de Locais</title>
</head>
<body>
    <h1>Gerenciamento de Locais</h1>
    
    <!-- Tabela será renderizada aqui pelo JavaScript -->
    <div id="locaisContainer">
        <table id="locaisTable">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>CEP</th>
                    <th>Endereço</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="locaisTableBody">
                <!-- Os dados serão inseridos aqui via JavaScript -->
            </tbody>
        </table>
    </div>
    
    <form method="post" id="form-local">
        <label for="local">Cadastros de Local</label>
        <input name="nome" id="nome" placeholder="nome" type="text" required>
        <input name="cep" id="cep" placeholder="cep" type="text" required>
        <input name="endereco" id="endereco" placeholder="endereço" type="text" required>
        <button type="submit">Gravar</button>
    </form>
    
    <div>
        <a href="index.php">Voltar ao Menu</a>
    </div>
</body>
<script src="/js/index.js"></script>
</html>