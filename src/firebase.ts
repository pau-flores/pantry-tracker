import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0VsW4YYbnitkSDcDkdsugL29Rr1HPGaI",
  authDomain: "headstarterpantrytracker.firebaseapp.com",
  projectId: "headstarterpantrytracker",
  storageBucket: "headstarterpantrytracker.appspot.com",
  messagingSenderId: "926466327283",
  appId: "1:926466327283:web:f6c229c11094e717f0ed86",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
