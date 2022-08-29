
import {getApp,getApps,initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyC_b6xAw9n2sNUN3yNKPic41re54Wr2YXw",

  authDomain: "restaurantfooddeliveryapp.firebaseapp.com",

  databaseURL: "https://restaurantfooddeliveryapp-default-rtdb.firebaseio.com",

  projectId: "restaurantfooddeliveryapp",

  storageBucket: "restaurantfooddeliveryapp.appspot.com",

  messagingSenderId: "936762214076",

  appId: "1:936762214076:web:adb82677620b5622d3b2b9",
};

const app=getApps.length>0?getApp():initializeApp(firebaseConfig);
const firestore=getFirestore(app);
const storage=getStorage(app);

export {app,firestore,storage}