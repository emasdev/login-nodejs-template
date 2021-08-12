window.addEventListener("DOMContentLoaded", () => {

  var firebaseConfig = {
    apiKey: "AIzaSyBJZqmtx-FMOIWSdtI05ow7NQguZeqNIZs",
    authDomain: "idm-test-52fb0.firebaseapp.com",
    projectId: "idm-test-52fb0",
    storageBucket: "idm-test-52fb0.appspot.com",
    messagingSenderId: "262349506895",
    appId: "1:262349506895:web:04d9625c78ddc02d141d3a",
    measurementId: "G-RZ8X652RVK"
  };

  firebase.initializeApp(firebaseConfig);



  document
    .getElementById("login")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const login = event.target.login.value;
      const password = event.target.password.value;

      firebase
        .auth()
        .signInWithEmailAndPassword(login, password)
        .then(({ user }) => {
          return user.getIdToken().then((idToken) => {
            return fetch("/sessionLogin", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "CSRF-Token": Cookies.get("XSRF-TOKEN"),
              },
              body: JSON.stringify({ idToken }),
            });
          });
        })
        .then(() => {
          return firebase.auth().signOut();
        })
        .then(() => {
          window.location.assign("/profile");
        });
      return false;
    });
});