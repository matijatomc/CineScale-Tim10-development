import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
const firebaseConfig = {
  apiKey: 'AIzaSyA2bqBv8rVH-eq5BNqsYkTPDnThLyQH2W0',
  authDomain: 'cinescale-cfad0.firebaseapp.com',
  projectId: 'cinescale-cfad0',
  storageBucket: 'cinescale-cfad0.appspot.com',
  messagingSenderId: '1092038402037',
  appId: '1:1092038402037:web:54de49d0821ce628ae0abc',
  measurementId: 'G-ZHXZX4GNC2'
}
firebase.initializeApp(firebaseConfig)
export default ({ Vue }) => {
  Vue.prototype.$auth = firebase.auth()
  Vue.prototype.$db = firebase.firestore()
  Vue.prototype.$storage = firebase.storage()
}
