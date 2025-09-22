//=== FUNÇÕES DE LISTAGEM ===

// Função para listar livros
async function listarLivros() {
    try {
        const response = await fetch('http://localhost:8080/listarLivros.php');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const livros = await response.json();
        renderizarTabelaLivros(livros);
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
    }
}

// Função para renderizar tabela de livros
function renderizarTabelaLivros(livros) {
    const tableBody = document.getElementById('livrosTableBody');
    if (!tableBody) return; // Se não estiver na página de livros, não faz nada
    
    tableBody.innerHTML = ''; // Limpa conteúdo existente
    
    livros.forEach(livro => {
        const row = document.createElement('tr');
        row.id = `_${livro.id}`;
        
        // Célula Descrição
        const cellDescricao = document.createElement('td');
        const inputDescricao = document.createElement('input');
        inputDescricao.type = 'text';
        inputDescricao.className = 'valor-descricao';
        inputDescricao.value = livro.descricao;
        cellDescricao.appendChild(inputDescricao);
        row.appendChild(cellDescricao);
        
        // Célula Título
        const cellTitulo = document.createElement('td');
        const inputTitulo = document.createElement('input');
        inputTitulo.type = 'text';
        inputTitulo.className = 'valor-titulo';
        inputTitulo.value = livro.titulo;
        cellTitulo.appendChild(inputTitulo);
        row.appendChild(cellTitulo);
        
        // Célula Autor
        const cellAutor = document.createElement('td');
        const inputAutor = document.createElement('input');
        inputAutor.type = 'text';
        inputAutor.className = 'valor-autor';
        inputAutor.value = livro.autor;
        cellAutor.appendChild(inputAutor);
        row.appendChild(cellAutor);
        
        // Célula Ações
        const cellAcoes = document.createElement('td');
        
        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.onclick = () => removerLivro(`_${livro.id}`);
        
        const btnAtualizar = document.createElement('button');
        btnAtualizar.textContent = 'Atualizar';
        btnAtualizar.onclick = () => atualizarLivro(`_${livro.id}`);
        
        cellAcoes.appendChild(btnRemover);
        cellAcoes.appendChild(btnAtualizar);
        row.appendChild(cellAcoes);
        
        tableBody.appendChild(row);
    });
}

// Função para listar locais
async function listarLocais() {
    try {
        const response = await fetch('http://localhost:8080/listarLocais.php');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const locais = await response.json();
        renderizarTabelaLocais(locais);
    } catch (error) {
        console.error('Erro ao buscar locais:', error);
    }
}

// Função para renderizar tabela de locais
function renderizarTabelaLocais(locais) {
    const tableBody = document.getElementById('locaisTableBody');
    if (!tableBody) return; // Se não estiver na página de locais, não faz nada
    
    tableBody.innerHTML = ''; // Limpa conteúdo existente
    
    locais.forEach(local => {
        const row = document.createElement('tr');
        row.id = `_${local.id}`;
        
        // Célula Nome
        const cellNome = document.createElement('td');
        const inputNome = document.createElement('input');
        inputNome.type = 'text';
        inputNome.className = 'valor-nome';
        inputNome.value = local.nome;
        cellNome.appendChild(inputNome);
        row.appendChild(cellNome);
        
        // Célula CEP
        const cellCep = document.createElement('td');
        const inputCep = document.createElement('input');
        inputCep.type = 'text';
        inputCep.className = 'valor-cep';
        inputCep.value = local.cep;
        cellCep.appendChild(inputCep);
        row.appendChild(cellCep);
        
        // Célula Endereço
        const cellEndereco = document.createElement('td');
        const inputEndereco = document.createElement('input');
        inputEndereco.type = 'text';
        inputEndereco.className = 'valor-endereco';
        inputEndereco.value = local.endereco;
        cellEndereco.appendChild(inputEndereco);
        row.appendChild(cellEndereco);
        
        // Célula Ações
        const cellAcoes = document.createElement('td');
        
        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.onclick = () => removerLocal(`_${local.id}`);
        
        const btnAtualizar = document.createElement('button');
        btnAtualizar.textContent = 'Atualizar';
        btnAtualizar.onclick = () => atualizarLocal(`_${local.id}`);
        
        cellAcoes.appendChild(btnRemover);
        cellAcoes.appendChild(btnAtualizar);
        row.appendChild(cellAcoes);
        
        tableBody.appendChild(row);
    });
}

//=== FUNÇÕES EXISTENTES DE LIVRO ===
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
    var descricao = elementoAtualizar.querySelector(".valor-descricao");
    var titulo = elementoAtualizar.querySelector(".valor-titulo");
    var autor = elementoAtualizar.querySelector(".valor-autor");
    console.log(descricao.value, titulo.value, autor.value);
    await atualizarLivroBanco(elemento.substring(1,elemento.length), descricao.value, titulo.value, autor.value);
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
        // Recarrega a lista após salvar
        listarLivros();
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
        if (element.name && element.type !== 'submit') {
            if(element.value == null || element.value == undefined || element.value == '')
                camposInvalidos.push(element.name);
        }
    }
    return camposInvalidos;
}

// Event listener para formulário de livro
if (document.querySelector('#form-livro')) {
    const formElement = document.querySelector('#form-livro'); 
    formElement.addEventListener('submit', async function(event) {
        // Prevent the default form submission
        event.preventDefault();
        const formData = new FormData(event.target); // event.target refers to the form
        var erros = validarFormulario(event);    
        if(erros.length > 0){
            alert("Campos obrigatórios não preenchidos: " + erros.join(", "));
            return;
        } 
        
        const descricao = formData.get("descricao");
        const titulo = formData.get("titulo");
        const autor = formData.get("autor");
        
        console.log(descricao, titulo, autor);

        //segue para enviar para o back-end
        await salvarLivro(descricao, titulo, autor);
        
        // Limpa o formulário após salvar
        event.target.reset();
    });
}

// Event listener para formulário de local
if (document.querySelector('#form-local')) {
    const formElementt = document.querySelector('#form-local'); 
    formElementt.addEventListener('submit', async function(event) {
        // Prevent the default form submission
        event.preventDefault();
        const formData = new FormData(event.target); // event.target refers to the form
        var erros = validarFormulario(event);    
        if(erros.length > 0){
            alert("Campos obrigatórios não preenchidos: " + erros.join(", "));
            return;
        } 
        
        const nome = formData.get("nome");
        const cep = formData.get("cep");
        const endereco = formData.get("endereco");
        
        console.log(nome, cep, endereco);

        //segue para enviar para o back-end
        await salvarLocal(nome, cep, endereco);
        
        // Limpa o formulário após salvar
        event.target.reset();
    });
}

//=== FUNÇÕES EXISTENTES DO LOCAL ===
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

async function atualizarLocalBanco(id, nome, cep, endereco){
    await fetch('http://localhost:8080/localAtualizar.php', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            "id":id,
            "nome":nome,
            "cep":cep,
            "endereco":endereco,
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
            "cep":cep,
            "endereco":endereco,
        })
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response.json());
        // Recarrega a lista após salvar
        listarLocais();
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

//=== CARREGAMENTO INICIAL DAS PÁGINAS ===
// Carrega os dados quando a página é carregada
document.addEventListener('DOMContentLoaded', function() {
    // Se estiver na página de livros, carrega a lista de livros
    if (document.getElementById('livrosTableBody')) {
        listarLivros();
    }
    
    // Se estiver na página de locais, carrega a lista de locais
    if (document.getElementById('locaisTableBody')) {
        listarLocais();
    }
});