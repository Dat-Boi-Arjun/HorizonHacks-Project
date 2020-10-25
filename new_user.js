import firebase from 'firebase/app'

//Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCvi2swwP019a9pmwztVjWnXs1pLpjYGf8",
    authDomain: "horizon-bff5f.firebaseapp.com",
    databaseURL: "https://horizon-bff5f.firebaseio.com",
    projectId: "horizon-bff5f",
    storageBucket: "horizon-bff5f.appspot.com",
    messagingSenderId: "253288550368",
    appId: "1:253288550368:web:9d6389487c3c4dd5b1a585",
    measurementId: "G-D9NMD37CRG"
};

// Initialize Firebase  

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

preferences = {"Food": 1, "Medicine": 2, "Social": 3, "Misc": 4}


var new_user = () => {
    let name = document.getElementById("u_name").value
    let psw = document.getElementById("psw").value
    let loc = document.getElementById("loc").value.slice(0, 3)
    let pref = preferences[document.getElementById("pref").value]
    let contact_info = document.getElementById("contact")

    let entry = {
        name: name,
        password: psw,
        contact_info: contact,
        location: loc,
        preference: pref
    }
    
    database.ref("users").push(entry)
}