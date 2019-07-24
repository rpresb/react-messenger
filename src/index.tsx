import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'semantic-ui-css/semantic.min.css'
import './index.css';

const firebaseConfig = {
  apiKey: "AIzaSyBVeg8QxmxuD0c7vnFZMgBskxw6w5EqeKs",
  authDomain: "react-messenger-10340.firebaseapp.com",
  databaseURL: "https://react-messenger-10340.firebaseio.com",
  projectId: "react-messenger-10340",
  storageBucket: "",
  messagingSenderId: "820635069222",
  appId: "1:820635069222:web:e61bf864e4cf6988"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));
