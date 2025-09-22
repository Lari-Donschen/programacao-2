<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $connection = require("dbfactory.php");
    $sql = "SELECT id, nome, cep, endereco FROM local";
    
    $result = $connection->query($sql);
    $locais = [];
    
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $locais[] = [
                'id' => $row['id'],
                'nome' => $row['nome'],
                'cep' => $row['cep'],
                'endereco' => $row['endereco']
            ];
        }
    }
    
    $connection->close();
    echo json_encode($locais);
} else {
    $response = [
        'error' => 'Only GET method is allowed'
    ];
    echo json_encode($response);
}
?>