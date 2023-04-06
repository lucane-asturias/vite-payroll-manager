import { defineStore } from 'pinia'
import { auth, usersCollection } from '@/includes/firebase'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: undefined,
    changeAuth: false
  }),
  actions: {
    toggleAuth() {
      this.changeAuth = !this.changeAuth
    },
    setUser(user) {
      this.user = user
    },
    // register user in both the authentication and firestore services
    async registerUser(payload) {
      // both values are store in the payload parameter provided by the submit event
      const userCred = await auth.createUserWithEmailAndPassword(payload.email, payload.password)
      // connect user's data in the database to their authenticated account assigning an id
      await usersCollection.doc(userCred.user.uid).set({
        name: payload.name,
        email: payload.email,
        age: payload.age,
        country: payload.country
      })

      await userCred.user.updateProfile({ 
        // update user's profile data
        displayName: payload.name
      })

      this.toggleAuth()
    },
    async loginUser(payload) {
      // send request to firebase with the payload data
      await auth.signInWithEmailAndPassword(payload.email, payload.password);
      
      this.toggleAuth()
    },
    initLogin() {
      const user = auth.currentUser; // get the curent user connected 
      if (user) this.toggleAuth()
    },
    async signOut() {
      // signing user out from firebase
      await auth.signOut()

      this.toggleAuth()
    }
  }
})