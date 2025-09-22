<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulário de Livros</title>
</head>
<body>
    <h1>Gerenciamento de Livros</h1>
    
    <!-- Tabela será renderizada aqui pelo JavaScript -->
    <div id="livrosContainer">
        <table id="livrosTable">
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="livrosTableBody">
                <!-- Os dados serão inseridos aqui via JavaScript -->
            </tbody>
        </table>
    </div>
    
    <form method="post" id="form-livro">
        <label for="Livro">Cadastros de Livros</label>
        <input name="descricao" id="descricao" placeholder="descrição" type="text" required>
        <input name="titulo" id="titulo" placeholder="título" type="text" required>
        <input name="autor" id="autor" placeholder="autor" type="text" required>
        <button type="submit">Gravar</button>
    </form>
    
    <div>
        <a href="index.php">Voltar ao Menu</a>
    </div>
</body>
<script src="/js/index.js"></script>
</html>