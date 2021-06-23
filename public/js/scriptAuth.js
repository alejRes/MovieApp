
let userList = [];

  function logOut(){
    fetch('http://localhost:3000/logout')
    .then(res => {
      console.log(res)
      window.location.href=res.url;
    })
  }

function addUser(user, password) {
  let newUser = {
    user: user,
    password: password
  };
  console.log(newUser); //solo para verificar que llega el objeto JSON a la consola
  userList.push(newUser); //metemos el nuevo usuario a la lista
  jsonObjsUsersList(userList);
}




/*function saveUser() {
  //función que salvará los datos de los users y los envía a addUser
  let user = document.querySelector("username").value;
  let password = document.querySelector("password").value;
  addUser(user, password);
}
console.log(saveUser())*/


