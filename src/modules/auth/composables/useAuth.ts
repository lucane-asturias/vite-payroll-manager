import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../store/authStore'

export const useAuth = () => {
  const authStore = useAuthStore()
  const { changeForm } = storeToRefs(authStore)
  
  return {
    // state
    changeForm: computed(() => changeForm),

    // action
    toggleAuth: () => authStore.toggleAuth(),

  }
}