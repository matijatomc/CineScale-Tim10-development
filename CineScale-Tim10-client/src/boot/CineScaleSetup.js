import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyA2bqBv8rVH-eq5BNqsYkTPDnThLyQH2W0',
  authDomain: 'cinescale-cfad0.firebaseapp.com',
  projectId: 'cinescale-cfad0',
  storageBucket: 'cinescale-cfad0.appspot.com',
  messagingSenderId: '1092038402037',
  appId: '1:1092038402037:web:54de49d0821ce628ae0abc',
  measurementId: 'G-ZHXZX4GNC2'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export default ({ app: vueApp }) => {
  vueApp.provide('$auth', auth)
  vueApp.provide('$db', db)
  vueApp.provide('$storage', storage)
}
