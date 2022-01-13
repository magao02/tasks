//import firebase from "firebase";
//import "firebase/storage"
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyCRBGwvlQlgQVFTNt5WE3gxrWe4EOQmzC8",
    authDomain: "tasks-6d77f.firebaseapp.com",
    projectId: "tasks-6d77f",
    storageBucket: "tasks-6d77f.appspot.com",
    messagingSenderId: "138908967972",
    appId: "1:138908967972:web:dad30b9ae6d61146e224b1"
  };
  //initialize
  //firebase.initializeApp(firebaseConfig);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)
  async function getTasks(db) {
    const citiesCol = collection(db, 'Tasks');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    //console.log("aqui citylist ",cityList);
    //console.log(cityList[0].status)
  }
  getTasks(db)
  export default db;