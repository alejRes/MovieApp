


//<script src="https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js"></script>


//LIBRERÍA DE AUTHENTICATION DE FIREBASE
//<script src="https://www.gstatic.com/firebasejs/8.6.2/firebase-auth.js"></script>

/* const firebaseConfig = {
    apiKey: "AIzaSyB18s9gyTraea33ugCWbhXiIBPQHWpB7CQ",
    authDomain: "movieapp-7a7d5.firebaseapp.com",
    projectId: "movieapp-7a7d5",
    storageBucket: "movieapp-7a7d5.appspot.com",
    messagingSenderId: "483728030374",
    appId: "1:483728030374:web:0f26c5842e4111bd9d1267"
  }; */

  const firebaseConfig = {
      apiKey: "AIzaSyB18s9gyTraea33ugCWbhXiIBPQHWpB7CQ",
      authDomain: "movieapp-7a7d5.firebaseapp.com",
      projectId: "movieapp-7a7d5",
      storageBucket: "movieapp-7a7d5.appspot.com",
      messagingSenderId: "483728030374",
      appId: "1:483728030374:web:0f26c5842e4111bd9d1267"
    }

    //Initialize Firebase
    firebase.initializeApp(firebaseConfig);

document.getElementById('login').addEventListener('click',GoogleLogin);
document.getElementById('logout').addEventListener('click',LogOutUser);

let provider = new firebase.auth.GoogleAuthProvider()

function GoogleLogin(){
  console.log('Login Btn')
  firebase.auth().signInWithPopup(provider).then(res => {
      console.log(res.user)
      document.getElementById('loginScreen').style.display="none";
      document.getElementById('dashboard').style.display="block";

  }).catch(e => {
      console.log(e)
  })
}

function showUserDateils(user){
  document.getElementById('userDetails').innerHTML = `
  <img src="${user.photoURL}" style="width:10%">
  <p>Name: ${user.displayName}</p>
  <p>Email: ${user.email}</p>`
}

function checkAuthState(){
  firebase.auth().onAuthStateChanged(user => {
      if(user){
          document.getElementById('loginScreen').style.display="none";
          document.getElementById('dashboard').style.display="block";
          showUserDateils(user)
      }else{


      }
  })

}

function LogOutUser(){
  console.log('Logout Btn')
  firebase.auth().signOut().then(() => {
      document.getElementById('loginScreen').style.display="none";
      document.getElementById('dashboard').style.display="block";
  }).catch(e => {
      console.log(e)
  })

}
checkAuthState()





























/* import firebase from "firebase/app";
import "firebase/auth";




function signUpWithEmailPassword() {
    let email = "antonioaparicioh@gmail.com";
    let password = "mypassword";
    // [START auth_signup_password]
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        let user = userCredential.user;
        // ...
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        // ..
      });

      function signInWithEmailPassword() {
        var email = "test@example.com";
        var password = "hunter2";
        // [START auth_signin_password]
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Signed in
            let user = userCredential.user;
            // ...
          })
          .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
          });
        }

        function signOut () {
            firebase.auth().signOut().then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    
    }}

    module.exports = {
        signUpWithEmailPassword,
        signInWithEmailAndPassword,
        signOut
    } */