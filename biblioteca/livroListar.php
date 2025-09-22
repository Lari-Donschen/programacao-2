<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $connection = require("dbfactory.php");
    $sql = "SELECT id, descricao, titulo, autor FROM livro";
    
    $result = $connection->query($sql);
    $livros = [];
    
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $livros[] = [
                'id' => $row['id'],
                'descricao' => $row['descricao'],
                'titulo' => $row['titulo'],
                'autor' => $row['autor']
            ];
        }
    }
    
    $connection->close();
    echo json_encode($livros);
} else {
    $response = [
        'error' => 'Only GET method is allowed'
    ];
    echo json_encode($response);
}
?>