import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDORyJqYP1Pze-fHwkVzPReYsOrsX4R9As',
  authDomain: 'payroll-manager-9e484.firebaseapp.com',
  projectId: 'payroll-manager-9e484',
  storageBucket: 'payroll-manager-9e484.appspot.com',
  messagingSenderId: '938147174315',
  appId: '1:938147174315:web:5ffd5e93114edd215da4ee'
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const storage = firebase.storage()
const db = firebase.firestore()

// Collection references
// const payrollsCollection = db.collection('payroll')

// Exports
export { auth, storage, db }
