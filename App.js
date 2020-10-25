import React, { useRef, useState } from 'react';
import './App.css';
import './requests.js'

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import getRequests from './requests.js';
import './post.js';

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

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();
const db = firebase.database();


function App() {

  const [user] = useAuthState(auth);
  const [recs, setRecs] = useState([])

  return (
    <div className="App">
      <header>
        <h1>Feed</h1>
        <SignOut />
      </header>

      <section>
        {user ? <Feed /> : <SignIn />}
      </section>

      <section>
        <PostPage/>
      </section>

    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function Feed() {
  
  requests = getRequests(db, auth.getAuth())

  return (<>
    <div className={"feed"}>

      {requests.map(req => <Request key={Math.floor(Math.random() * 10000).toString()} 
      name={req["name"]} contact={req["contact"]} 
      type={req["type"]} text={req["text"]}/>)}

    </div>
    </>)
}


function Request(props) {
  const { name, contact, type, text} = props.message;

  return (<>
    <div className={"request"}>
      <p>{"Name" + name}</p>
      <p>{"Contact Information" + contact}</p>
      <p>{"Request Type" + type}</p>
      <p>{"Description" + text}</p>
    </div>
  </>)
}

function PostPage() {

  for (let r in recs) {
    let query = db.ref("users").orderByChild("name").equalTo(r).get().val()
    let match = query.values()[0]
    let name = match["name"]
    let contact = match["contact_info"]
    let postRecs = []
    postRecs.push(<PostRecs name={name} contact={contact}/>)
  }

  return (<>
    <div className={"postpage"}>
      <PostForm/>
      <h2>These people could help you with your request:</h2>
      {postRecs}
    </div>
  </>)
}

function PostForm() {

  return (<>
  <form onSubmit={setRecs(post())}>
    <label for="text">Description</label>
    <textarea id="text" name="text" placeholder="I need help with..." rows="3"></textarea>

    <label for="type">What type of request is this?</label>
    <select name="type" id="type">
      <option value="Food">Food</option>
      <option value="Medicine">Medicine</option>
      <option value="Social">Social</option>
      <option value="Misc">Misc</option>
    </select>

    <input type="submit" value="Post"/>
  </form>
  </>)
}

function PostRecs(props) {

  const {name, contact} = props.message;

  return (<>
    <div className={"Recs"}>
      <p>{"Name" + name}</p>
      <p>{"Contact" + contact}</p>
    </div>
  </>)
}

export default App;
