let userList = [];


function validateUser() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if (username == null || username == "") {
      return false;
    }
    if (password == null || password == "") {
        password;
      return false;
    }
  }
  



function addUser(user, password) {
  let newUser = {
    user: user,
    password: password,
  };
  console.log(newUser); //solo para verificar que llega el objeto JSON a la consola
  userList.push(newUser); //metemos el nuevo usuario a la lista
  jsonObjsUsersList(userList);
}

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
});


/*function saveUser() {
  //función que salvará los datos de los users y los envía a addUser
  let user = document.querySelector("username").value;
  let password = document.querySelector("password").value;
  addUser(user, password);
}
console.log(saveUser())*/


