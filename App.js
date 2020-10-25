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
import './new_user.js';
import new_user from './new_user.js';

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
        <PostPage recs={recs} setRecs={setRecs}/>
      </section>

    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);

  }

  const UserForm = () => {
    let username = auth.currentUser.displayName;

    let newUserForm = (<></>)
    if (db.ref("users").orderByChild("name").equalTo(username).get().val() === null) {
      newUserForm = (<>
        <form onSubmit={new_user(username)}>
          <label for="type">What is your favorite category of deed to do?</label>
          <select name="type" id="type">
            <option value="Food">Food</option>
            <option value="Medicine">Medicine</option>
            <option value="Social">Social</option>
            <option value="Misc">Misc</option>
          </select>
          <p><strong>This is used to pair you with users you can help the most</strong></p>

          <label for="loc">What is your ZIP Code?</label>
          <input placeholder="ZIP Code" name="loc" id="loc"/>
          <p><strong>This is used to find users near you, who you can easily meet and help</strong></p>

          <label for="contact">How can others contact you?</label>
          <input placeholder="Contact Information" name="contact" id="contact"/>

        </form>
      </>)
    }

    return newUserForm;
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Please engage in civil discussion on the forum</p>

      {UserForm()}
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function Feed() {
  
  let requests = getRequests(db, auth.currentUser.displayName)

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

function PostPage(props) {

  const {recs, setRecs} = props.message;

  for (let r in recs) {
    let query = db.ref("users").orderByChild("name").equalTo(r).get().val()
    let match = query.values()[0]
    let name = match["name"]
    let contact = match["contact_info"]
    let postRecs = []
    postRecs.push(<Post Recs name={name} contact={contact}/>)
  }

  return (<>
    <div className={"postpage"}>
      <PostForm setRecs={setRecs}/>
      <h2>These people could help you with your request:</h2>
      {postRecs}
    </div>
  </>)
}

function PostForm() {

  const setRecs = props.message;

  return (<>
  <form onSubmit={setRecs(post(auth.currentUser.displayName))}>
    <label for="text">Description</label>
    <textarea id="text" name="text" placeholder="I need help with..." rows="3"></textarea>

    <label for="post_type">What type of request is this?</label>
    <select name="post_type" id="post_type">
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
