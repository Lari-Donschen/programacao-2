

//Funções de Livro
async function removerLivro (elemento){    
    var elementoRemover = document.querySelector("#"+elemento);
    elementoRemover.remove();    
    await removerLivroBanco(elemento.substring(1,elemento.length));    
    console.log(elemento);
}

async function removerLivroBanco(idElemento){
    await fetch('http://localhost:8080/livroDeletar.php?id='+idElemento, {
        method: 'DELETE'})
    .then((response) => {
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response.text);
    })
    .then((data) => {
        console.log('Data fetched:', data);
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    });    
}

async function atualizarLivro(elemento){
    var elementoAtualizar = document.querySelector("#"+elemento);
    var nome = elementoAtualizar.querySelector(".valor-nome");
    var cep = elementoAtualizar.querySelector(".valor-cep");
    var endereco = elementoAtualizar.querySelector(".valor-endereco");
    console.log(nome.value,cep.value,endereco.value);
    await atualizarLivroBanco(elemento.substring(1,elemento.length),nome.value,cep.value,endereco.value);
}

async function atualizarLivroBanco(id, descricao, titulo, autor){
    await fetch('http://localhost:8080/livroAtualizar.php', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            "id":id,
            "descricao":descricao,
            "titulo":titulo,
            "autor":autor,
        })
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response.json());
    })
    .then((data) => {
        console.log('Data fetched:', data);
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    }); 

}

async function salvarLivro(descricao, titulo, autor){
    await fetch('http://localhost:8080/livroSalvar.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({            
            "descricao":descricao,
            "titulo":titulo,
            "autor":autor
        })
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response);
    })
    .then((data) => {
        console.log('Data fetched:', data);
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    });
}

function validarFormulario(form){
    var camposInvalidos = [];
     for (let i = 0; i < form.target.elements.length; i++) {
        const element = form.target.elements[i];
        if (element.name && element.value) {
            if(element.value == null || element.value == undefined || element.value == null)
                camposInvalidos.push(element.name);
        }
    }
    return camposInvalidos;
}

const formElement = document.querySelector('#form-livro'); 
formElement.addEventListener('submit', async function(event) {
    // Prevent the default form submission
    event.preventDefault();
    const formData = new FormData(event.target); // event.target refers to the form
    var erros = validarFormulario(event);    
    if(erros.length > 0){
        alert(erros);
        //se o formulário não for válido, irá parar a operação por aqui e mostrar os 
        //campos pendentes de preenchimento
        return;
    } 
    console.log(formData.get("descricao", "titulo", "autor"));

    //segue para enviar para o back-end
    await salvarLivro(formData.get("descricao", "titulo", "autor"));
});

const formElementt = document.querySelector('#form-local'); 
formElementt.addEventListener('submit', async function(event) {
    // Prevent the default form submission
    event.preventDefault();
    const formData = new FormData(event.target); // event.target refers to the form
    var erros = validarFormulario(event);    
    if(erros.length > 0){
        alert(erros);
        //se o formulário não for válido, irá parar a operação por aqui e mostrar os 
        //campos pendentes de preenchimento
        return;
    } 
    console.log(formData.get("nome", "cep", "endereco"));

    //segue para enviar para o back-end
    await salvarLocal(formData.get("nome", "cep", "endereco"));
});


//Funções do Local
async function removerLocal (elemento){    
    var elementoRemover = document.querySelector("#"+elemento);
    elementoRemover.remove();    
    await removerLocalBanco(elemento.substring(1,elemento.length));    
    console.log(elemento);
}

async function removerLocalBanco(idElemento){
    await fetch('http://localhost:8080/localDeletar.php?id='+idElemento, {
        method: 'DELETE'})
    .then((response) => {
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response.text);
    })
    .then((data) => {
        console.log('Data fetched:', data);
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    });    
}

async function atualizarLocal(elemento){
    var elementoAtualizar = document.querySelector("#"+elemento);
    var nome = elementoAtualizar.querySelector(".valor-nome");
    var cep = elementoAtualizar.querySelector(".valor-cep");
    var endereco = elementoAtualizar.querySelector(".valor-endereco");
    console.log(nome.value,cep.value,endereco.value);
    await atualizarLocalBanco(elemento.substring(1,elemento.length),nome.value,cep.value,endereco.value);
}

async function atualizarLocalBanco(id, nome, endereco, cep){
    await fetch('http://localhost:8080/localAtualizar.php', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            "id":id,
            "nome":nome,
            "endereco":endereco,
            "cep":cep,
        })
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response.json());
    })
    .then((data) => {
        console.log('Data fetched:', data);
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    }); 

}

async function salvarLocal(nome, cep, endereco){
    await fetch('http://localhost:8080/localSalvar.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            "nome":nome,
            "endereco":endereco,
            "cep":cep,
        })
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response.json());
    })
    .then((data) => {
        console.log('Data fetched:', data);
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    }); 

}

async function salvarItem(localId, livroId, dataEntrada){
    await fetch('http://localhost:8080/itemSalvar.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            "localId":localId,
            "livroId":livroId,
            "dataEntrada":dataEntrada,
        })
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response.json());
    })
    .then((data) => {
        console.log('Data fetched:', data);
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    }); 

}
