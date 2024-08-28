import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjupo61uFkjIQo4RID6cq-t1Pi5HmJ7Gs",
  authDomain: "custom-feedback-form-bui-2477c.firebaseapp.com",
  projectId: "custom-feedback-form-bui-2477c",
  storageBucket: "custom-feedback-form-bui-2477c.appspot.com",
  messagingSenderId: "982757440547",
  appId: "1:982757440547:web:3cfb247e18bf56bd374596",
  measurementId: "G-E9Q5J1PWX7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };