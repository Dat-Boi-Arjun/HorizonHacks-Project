import firebase from 'firebase/app';

firebase.initializeApp({
    apiKey: "AIzaSyCvi2swwP019a9pmwztVjWnXs1pLpjYGf8",
    authDomain: "horizon-bff5f.firebaseapp.com",
    databaseURL: "https://horizon-bff5f.firebaseio.com",
    projectId: "horizon-bff5f",
    storageBucket: "horizon-bff5f.appspot.com",
    messagingSenderId: "253288550368",
    appId: "1:253288550368:web:9d6389487c3c4dd5b1a585",
    measurementId: "G-D9NMD37CRG"
})

const db = firebase.database()


let post = () => {

    let req_type = document.getElementById("type")
    let req_name = document.getElementById("name")
    let req_text = document.getElementById("text")

    let query = db.ref("users").orderByChild("name").equalTo(req_name).get().val()
    let match = query.values()[0]
    let name = match["name"]
    let contact = match["contact_info"]
    let req_loc = match["location"]

    let req = {
        name: name,
        contact: contact,
        type: req_type,
        text: req_text
    };


    db.ref("requests").push(req)

    return post_recs(req_loc, req_type)

}

let post_recs = (loc, type) => {


    let xhttp = new XMLHttpRequest();

    xhttp.open("POST", "localhost:8080/rec", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("loc=" + loc + "&type=" + type);

    let response = JSON.parse(xhttp.responseText);

    return response["people"]

}
