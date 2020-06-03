const usuarios = []; // array para receber os objetos do tipo usuario



function salvarUsuario(){
  const nome = document.getElementById("nome").value;
  const senha = document.getElementById("senha").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const endereco = document.getElementById("endereco").value;
  const status = document.getElementById("status").value;
  const usuario = {id: Date.now(), nome, senha, telefone, email, endereco, status};

  //criar projeto no localstorage
  let usuarios = JSON.parse(window.localStorage.getItem("usuarios"));
  if(usuarios == null){ //esta vazio na memoria
    window.localStorage.setItem('usuarios', JSON.stringify([]));//criar
    usuarios = JSON.parse(window.localStorage.getItem("usuarios"));//recuperar o objeto atual
    usuarios.push(usuario);
    window.localStorage.setItem('usuarios', JSON.stringify(usuarios));//grava na memoria o array novo
  }else{
    usuarios.push(usuario);
    window.localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }




 
  
  Swal.fire({
    
    icon: 'success',
    title: 'Usuário cadastrado com sucesso!!!',
    showConfirmButton: false,
    timer: 1500
  });
  window.location.href="logar.html";
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
      const usuarioIndex = usuarios.findIndex(usuario => usuario.id == id);
      usuarios.splice(usuarioIndex,1);
      if(usuarios.length > 0){
       listarUsuarios();
      }else{
       row = document.getElementById("tbody");
       row.innerHTML = "";
      } 
      Swal.fire(
        'Usuário excluído com sucesso',
        '',
        'success'
      )
    }
  });
      
 }

 