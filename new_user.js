//Firebase configuration
var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

// Initialize Firebase  

firebase.initializeApp(firebaseConfig);
let database = firebase.database();

preferences = {"Food": 1, "Medicine": 2, "Social": 3, "Misc": 4}


var new_user = () => {
    let nam = document.getElementById("name").value
    let psw = document.getElementById("psw").value
    let loc = document.getElementById("loc").value.slice(0, 3)
    let pref = preferences[document.getElementById("pref").value]

    let entry = {
        name: name,
        password: psw,
        location: loc,
        preference: pref,
    }
    
    database.ref("users").push(entry)
}