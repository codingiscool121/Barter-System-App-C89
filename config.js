import firebase from 'firebase';
// require("@firebase/firestore")


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAqgjLl96L64pn9hFCYj04C0z6lNiY5FyA",
    authDomain: "easybarter-a6025.firebaseapp.com",
    databaseURL: "https://easybarter-a6025.firebaseio.com",
    projectId: "easybarter-a6025",
    storageBucket: "easybarter-a6025.appspot.com",
    messagingSenderId: "394523662224",
    appId: "1:394523662224:web:394f042b38ae2de9768515",
    measurementId: "G-DB7S5XTGFV"
  };




  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default  firebase.firestore()                                  