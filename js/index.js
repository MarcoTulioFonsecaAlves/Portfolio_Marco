const usuarios = [];

function salvarUsuario(){
  const nome = document.getElementById("nome").value;
  const descricao = document.getElementById("descricao").value;
  const quantidade = document.getElementById("quantidade").value;
  const preco = document.getElementById("preco").value;
  
  let id = usuarios.length;

  const usuario = {id: id++,nome, descricao, quantidade, preco};
  window.localStorage.setItem('usuarios', JSON.stringify([]));
  let usuarios = JSON.parse(window.localStorage.getItem("usuarios"));
  usuarios.push(usuario);
  window.localStorage.setItem('usuarios', JSON.stringify(usuarios));

  Swal.fire({
    
    icon: 'success',
    title: 'Usuário cadastrado com sucesso!',
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
      title: 'Email não cadastrado!',
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
              "<td id='tdquantidade'>"+usuario.quantidade+"</td>"+
              "<td id='tdpreco'>"+usuario.preco+"</td>"+
              "<td id='tdacoes'><button class='btn btn-outline-success' onclick='editarUsuario("+usuario.id+")'><i class='fa fa-edit'></i></button>"+
              "<button class='btn btn-outline-danger'onclick='apagarUsuario("+usuario.id+")'><i class='fa fa-trash'></i></button></td>"
            +"</tr>";
    row.innerHTML = linha;        

  
  
  });
 }
