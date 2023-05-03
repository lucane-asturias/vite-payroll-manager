import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { auth, usersCollection } from '@/utils/firebase'
import { reauthenticate } from '@/utils/firebaseFunctions'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: undefined,
    isUserLoggedIn: false,
    changeForm: false,
  }),
  actions: {
    toggleUser() {
      this.isUserLoggedIn = !this.isUserLoggedIn
    },
    toggleAuth() {
      this.changeForm = !this.changeForm
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
        language: payload.language
      })

      await userCred.user.updateProfile({ 
        // update user's profile data
        displayName: payload.name
      })

      setTimeout(() => {
        this.toggleAuth()
      }, 3000)
    },
    async loginUser(payload) {
      // send request to firebase with the payload data
      const userCred = await auth.signInWithEmailAndPassword(payload.email, payload.password)

      this.setUser(userCred.user)
      this.toggleUser()
    },
    initLogin() {
      const user = auth.currentUser // get the curent user connected 
      if (user) { 
        this.setUser(user)
        this.toggleUser()
      }
    },
    async updateName(newName) {
      await auth.currentUser.updateProfile({ displayName: newName })
      this.reloadUserName() // reflect auth changes in the state
    },
    async updateEmail(email, password) {
      await reauthenticate(password)
      await auth.currentUser.updateEmail(email)
      await this.signOut()
    },
    async updatePassword(password, newPassword) {
      await reauthenticate(password)
      await auth.currentUser.updatePassword(newPassword)
      await this.signOut()
    },
    reloadUserName() {
      auth.onAuthStateChanged((user) => {
        const { displayName } = user
        this.setUser({ ...this.user, displayName })
      })
    },
    async signOut() {
      await auth.signOut() // signing user out from firebase

      this.toggleUser()
    }
  }
})