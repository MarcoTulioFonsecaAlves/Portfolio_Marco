const usuarios = [];
const cadastro = [];

function salvarUsuario(){
  const nome = document.getElementById("nome").value;
  const descricao = document.getElementById("descricao").value;
  const tipo = document.getElementById("tipo").value;
  const categoria = document.getElementById("categoria").value;
  
  let id = usuarios.length;

  const usuario = {id: id++,
     nome, descricao, tipo, categoria};
  usuarios.push(usuario);
 
  
  Swal.fire({
    
    icon: 'success',
    title: 'Produto cadastrado com sucesso!!!',
    showConfirmButton: false,
    timer: 1500
  });
  listarUsuarios();

}

var Nome = localStorage.getItem("nome");
function logar(){
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const nome = document.getElementById("nome").value;

  let usuariosGravados = JSON.parse(window.localStorage.getItem("usuarios"));
  let usuarioIndex = usuariosGravados.findIndex(usuario => usuario.email == email);
  if (usuarioIndex == -1){
    Swal.fire({
    
      icon: 'warning',
      title: 'EMAIL não cadastrado!',
      showConfirmButton: false,
      timer: 1500
    });
  }else{
    if(usuariosGravados[usuarioIndex].senha !== senha){
      Swal.fire({
    
        icon: 'warning',
        title: 'Senha incorreta!',
        showConfirmButton: false,
        timer: 1500
      });

    }else if (usuariosGravados[usuarioIndex].nome !== nome) {
      Swal.fire({
    
        icon: 'warning',
        title: 'Nome incorreto!',
        showConfirmButton: false,
        timer: 1500
      });

    } else {

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        timer: 1500,
        title: `Bem Vindo ${usuariosGravados[usuarioIndex].nome}`
      })
      window.location.href="menu.html";
    }
      

    
  }
 }



function limpar(){
  let inputs = document.getElementsByTagName("input");
  for(let i=0; i < inputs.length; i++){
    inputs[i].value = "";
  }
}

function editarUsuario(){
  
}

function apagarUsuario(id){
  Swal.fire({
    title: 'Confirmar a exclusão do Usuário?',
    
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim'
  }).then((result) => {
    if (result.value) {
      let usuarioIndex = usuarios.findIndex(usuario => usuario.id == id);
      if(usuarioIndex >= 0){
        usuarios.splice(usuarioIndex,1);
        if(usuarios.length > 0){
          listarUsuarios();
        }else{
          row = document.getElementById("tbody");
          row.innerHTML = "";
        }
      }
      Swal.fire(
        'Usuário excluído!',
        '',
        'success'
      )
    }
  });
}


function listarUsuarios(){
  let linha = "";
  usuarios.forEach(usuario => {
    row = document.getElementById("tbody");
     linha += "<tr>"+
              "<td id='tdid'>"+usuario.id +"</td>"+
              "<td id='tdnome'>"+usuario.nome +"</td>"+
              "<td id='tddescricao'>"+usuario.descricao+"</td>"+
              "<td id='tdtipo'>"+usuario.tipo+"</td>"+
              "<td id='tdcategoria'>"+usuario.categoria+"</td>"+
              "<td id='tdacoes'><button class='btn btn-outline-success' style='margin-top: 0px' onclick='editarUsuario("+usuario.id+")'><i class='fa fa-edit'></i></button>"+
              "<button class='btn btn-outline-danger'onclick='apagarUsuario("+usuario.id+")'><i class='fa fa-trash'></i></button></td>"
            +"</tr>";
    row.innerHTML = linha;        

  
  
  });
 }

 function salvarlancamentos(){
  const conta = document.getElementById("conta").value;
  const descricao = document.getElementById("descricao").value;
  const valor = document.getElementById("valor").value;
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;
  const cadastrar = {id: Date.now(), conta, descricao, valor, hora, data};

  //criar projeto no localstorage
  let cadastro = JSON.parse(window.localStorage.getItem("cadastro"));
  if(cadastro == null){ //esta vazio na memoria
    window.localStorage.setItem('cadastro', JSON.stringify([]));//criar
    cadastro = JSON.parse(window.localStorage.getItem("cadastro"));//recuperar o objeto atual
    cadastro.push(cadastrar);
    window.localStorage.setItem('cadastro', JSON.stringify(cadastro));//grava na memoria o array novo
  }else{
    usuarios.push(cadastrar);
    window.localStorage.setItem('cadastro', JSON.stringify(cadastro));
  }




 
  
  Swal.fire({
    
    icon: 'success',
    title: 'Usuário cadastrado com sucesso!!!',
    showConfirmButton: false,
    timer: 1500
  });
  listartabela();
 }

 function listartabela(){
  let cadastro = JSON.parse(window.localStorage.getItem('cadastro'));
    linhalancamento = "";
    if(contasGravadas == "[]"){
        linhalancamento = ""
        row = document.getElementById('tbody');
        row.innerHTML = linhalancamento;
    }
    else{
        lancamentosGravadas.forEach(cadastrar => {
            row = document.getElementById('tbody');
            linhalancamento += "<tr style='width: 100%'>"+
                     "<td style='color: black;' id='tdid'>"+cadastrar.id +"</td>"+
                     "<td style='color: black;' id='tdconta'>"+cadastrar.conta +"</td>"+
                     "<td style='color: black;' id='tddescricao'>"+cadastrar.descricao +"</td>"+
                     "<td style='color: black;' id='tdvalor'>"+cadastrar.valor +"</td>"+
                     "<td style='color: black;' id='tdhora'>"+cadastrar.hora +"</td>"+
                     "<td style='color: black;' id='tddata'>"+cadastrar.data +"</td>"+
                     "<td id='tdacoes'><button style='margin-right:2px;margin-top:0px' class='btn btn-outline-success' onclick='editarlancamento("+cadastrar.id+")'><i class='fa fa-edit'></i></button>"+
                     "<button class='btn btn-outline-danger'onclick='apagarlancamento("+cadastrar.id+")'><i class='fa fa-trash'></i></button></td>"
                     +"</tr>";
                    row.innerHTML = linhalancamento;
        })
    }
 }

 function cadConta(){
  const id = document.getElementById('id').value;
  const descricao = document.getElementById('descricao').value;
  const tipo = document.getElementById('tipo').value;
  const categoria = document.getElementById('categorias').value;

  if(descricao == "" || tipo == ""){
      Swal.fire({
          icon: 'error',
          title: 'Preencha todos os campos!',
          text: '',
          footer: ''
      })
  }
  else{
      const conta = {id: Date.now(), descricao, tipo, categoria};

      let contasGravadas = JSON.parse(window.localStorage.getItem('contas'));
      if(contasGravadas == null){
          window.localStorage.setItem('contas',JSON.stringify([]));
          contasGravadas = JSON.parse(window.localStorage.getItem('contas'));
          contasGravadas.push(conta);
          window.localStorage.setItem('contas',JSON.stringify(contasGravadas));
      }
      else{
          contasGravadas.push(conta);
          window.localStorage.setItem('contas',JSON.stringify(contasGravadas));
      }

      Limpar();
      Swal.fire({
          title: 'Cadastrado com sucesso!',
          icon: 'success',
          showCancelButton: false,
          ConfirmButtonText: 'OK'
      });
      listarContas();
  }
}

function listarContas(){
  let contasGravadas = JSON.parse(window.localStorage.getItem('contas'));
  linhaconta = "";
  if(contasGravadas == "[]"){
      linhaconta = ""
      row = document.getElementById('tbody');
      row.innerHTML = linhaconta;
  }
  else{
      contasGravadas.forEach(element => {
          row = document.getElementById('tbody');
          linhaconta += "<tr style='width: 100%'>"+
                   "<td style='color: black;' id='tdid'>"+element.id +"</td>"+
                   "<td style='color: black;' id='tddescricao'>"+element.descricao +"</td>"+
                   "<td style='color: black;' id='tdtipo'>"+element.tipo +"</td>"+
                   "<td style='color: black;' id='tdcategoria'>"+element.categoria +"</td>"+
                   "<td id='tdacoes'><button style='margin-right:2px;margin-top:0px' class='btn btn-outline-success' onclick='editarContas("+element.id+")'><i class='fa fa-edit'></i></button>"+
                   "<button class='btn btn-outline-danger'onclick='apagarContas("+element.id+")'><i class='fa fa-trash'></i></button></td>"
                   +"</tr>";
                  row.innerHTML = linhaconta;
      })
  }
}

function apagarContas(id){
  Swal.fire({
      title: 'Confirmar a exclusão da conta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim'
  }).then((result) => {
      if(result.value){
          let contasGravadas = JSON.parse(window.localStorage.getItem('contas'));
          let posicao = contasGravadas.findIndex(conta => conta.id == id);
          contasGravadas.splice(posicao,1);
          localStorage.setItem('contas', JSON.stringify(contasGravadas));
          listarContas();
          if(window.localStorage.getItem('contas') == "[]"){
              window.location.reload('cadconta.html');
          }
      }
  })
}

function ListarCatContas(){
  let Categorias = JSON.parse(localStorage.getItem('categorias'))
  let linhacad = "";
  Categorias.forEach(element => {
    let row = document.getElementById("categorias");
      linhacad += "<option value="+element.nome+">"+element.nome+"</option>"
      row.innerHTML = linhacad;
  });
}

function editarContas(id){
  let contasGravadas = JSON.parse(window.localStorage.getItem("contas"));
  for(i = 0; i < contasGravadas.length; i++){
      if(contasGravadas[i].id == id){

        document.getElementById("id").value = contasGravadas[i].id;
        document.getElementById("descricao").value = contasGravadas[i].descricao;
        document.getElementById("tipo").value = contasGravadas[i].tipo;
        document.getElementById("categorias").value = contasGravadas[i].categoria;

      }
 }
}

function atualizar(){
  const id = document.getElementById('id').value;
  const descricao = document.getElementById('descricao').value;
  const tipo = document.getElementById('tipo').value;
  const categoria = document.getElementById('categorias').value;

  contasGravadas = JSON.parse(window.localStorage.getItem('contas'));
  let contaIndex = contasGravadas.findIndex(conta => conta.id == id);
  if(contaIndex >= 0){
      contasGravadas[contaIndex] = {id,descricao,tipo,categoria};
      window.localStorage.setItem('contas',JSON.stringify(contasGravadas));
  }
  Swal.fire({
    
    icon: 'success',
    title: 'Conta atualizada com sucesso!',
    showConfirmButton: false,
    timer: 1500
  });
  listarContas();
  Limpar()
}

function Limpar(){
  let inputs = document.getElementsByTagName('input');
  for(let i = 0; i < inputs.length; i++){
      inputs[i].value = "";
  }
}

ListarCatContas();
listarContas();

function cadCategoria(){
  const id = document.getElementById('id').value;
  const nome = document.getElementById('nome').value;
  
  if (nome == ""){
      Swal.fire({
          icon: 'error',
          title: 'Informe o nome da categoria!',
          text: '',
          footer: ''
      })
  }
  else{
      const categoria = {id: Date.now(), nome};

      let categoriasGravadas = JSON.parse(window.localStorage.getItem("categorias"));
      if(categoriasGravadas == null){
          window.localStorage.setItem('categorias',JSON.stringify([]));
          categoriasGravadas = JSON.parse(window.localStorage.getItem('categorias'));
          categoriasGravadas.push(categoria);
          window.localStorage.setItem('categorias',JSON.stringify(categoriasGravadas));
      }
      else{
          categoriasGravadas.push(categoria);
          window.localStorage.setItem('categorias',JSON.stringify(categoriasGravadas));
      }

      limpar();
      Swal.fire({
          title: 'Cadastrado com sucesso!',
          icon: 'success',
          showCancelButton: false,
          ConfirmButtonText: 'OK'
      });
      listarCategorias();
  }
}

function listarCategorias(){
  let categoriasGravadas = JSON.parse(window.localStorage.getItem('categorias'));
  linhacategoria = "";
  if(categoriasGravadas == "[]"){
      linhacategoria = ""
      row = document.getElementById('tbody');
      row.innerHTML = linhacategoria;
  }
  else{
      categoriasGravadas.forEach(element => {
          row = document.getElementById('tbody');
          linhacategoria += "<tr style='width: 100%'>"+
                   "<td style='color: black;' id='tdid'>"+element.id +"</td>"+
                   "<td style='color: black;' id='tdnome'>"+element.nome +"</td>"+
                   "<td id='tdacoes'><button style='margin-right:2px;margin-top:0px' class='btn btn-outline-success' onclick='editarCategoria("+element.id+")'><i class='fa fa-edit'></i></button>"+
                   "<button class='btn btn-outline-danger'onclick='apagarCategoria("+element.id+")'><i class='fa fa-trash'></i></button></td>"
                   +"</tr>";
                  row.innerHTML = linhacategoria;
      })
  }
}

function apagarCategoria(id){
  Swal.fire({
      title: 'Confirmar a exclusão da categoria?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim'
  }).then((result) => {
      if(result.value){
          let categoriasGravadas = JSON.parse(window.localStorage.getItem('categorias'));
          let posicao = categoriasGravadas.findIndex(categoria => categoria.id == id);
          categoriasGravadas.splice(posicao,1);
          localStorage.setItem('categorias', JSON.stringify(categoriasGravadas));
          listarCategorias();
          if(window.localStorage.getItem('categorias') == "[]"){
              window.location.reload('cadcategoria.html');
          }
      }
  })
}

function editarCategoria(id){
  let categoriasGravadas = JSON.parse(window.localStorage.getItem("categorias"));
  for(i = 0; i < categoriasGravadas.length; i++){
      if(categoriasGravadas[i].id == id){

        document.getElementById("id").value = categoriasGravadas[i].id;
        document.getElementById("nome").value = categoriasGravadas[i].nome;
      }
 }
}

function atualizar(){
  const id = document.getElementById('id').value;
  const nome = document.getElementById('nome').value;

  categoriasGravadas = JSON.parse(window.localStorage.getItem('categorias'));
  let categoriaIndex = categoriasGravadas.findIndex(categoria => categoria.id == id);
  if(categoriaIndex >= 0){
      categoriasGravadas[categoriaIndex] = {id,nome};
      window.localStorage.setItem('categorias',JSON.stringify(categoriasGravadas));
  }
  Swal.fire({
    
    icon: 'success',
    title: 'Categoria atualizada com sucesso!',
    showConfirmButton: false,
    timer: 1500
  });
  listarCategorias();
  Limpar()
}



function Limpar(){
  let inputs = document.getElementsByTagName('input');
  for(let i = 0; i < inputs.length; i++){
      inputs[i].value = "";
  }
}

listarCategorias();
