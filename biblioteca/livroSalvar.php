<?php
header('Content-Type: application/json');

function Salvar($descricao, $titulo, $autor){
            $connection = require("dbfactory.php");                        
            if ($connection -> 
                query(@"INSERT INTO livro (descricao, titulo, autor) VALUES ('$descricao', '$titulo', '$autor');")) {                 
            }
            $connection -> close();
        }

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $putData = json_decode(file_get_contents('php://input',true));
            $descricao = htmlspecialchars($_POST['descricao']); 
            $titulo = htmlspecialchars($_POST['titulo']); 
            $autor = htmlspecialchars($_POST['autor']);

            if(!empty($descricao && $titulo && $autor)){
                Salvar($descricao, $titulo, $autor);
            }        
        }
else {
    $response['body'] = json_encode([
            'error' => 'Invalid input'
        ]);
    echo $response;
}
?>