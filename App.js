import React, { useRef, useState } from 'react';
import './App.css';
import './requests.js'

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import getRequests from './requests.js';

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

  return (
    <div className="App">
      <header>
        <h1>Feed</h1>
        <SignOut />
      </header>

      <section>
        {user ? <Feed /> : <SignIn />}
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
    <div className="feed">

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
      <p>{name}</p>
      <p>{contact}</p>
      <p>{type}</p>
      <p>{text}</p>
    </div>
  </>)
}


export default App;
