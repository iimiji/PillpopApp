// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyCo491HJ9h-z95iW93YaibZWm_b8V-PzqU",
  authDomain: "pillpopappdemo.firebaseapp.com",
  projectId: "pillpopappdemo",
  storageBucket: "pillpopappdemo.appspot.com",
  messagingSenderId: "452394592278",
  appId: "1:452394592278:web:e1dd5056410954b9ce6d37",
  measurementId: "G-V905HN727H",
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firebase 모듈들 가져오기
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
