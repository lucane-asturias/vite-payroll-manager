import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../store/authStore'

export const useLogin = () => {
  const authStore = useAuthStore()
  const { locale } = useI18n({ useScope: 'global' })

  const login_alert_color = ref<string>('bg-blue-500') // indicate the form submission is in progress
  const login_alert_msg = ref<string>('Please wait! We are logging you in.') // message of alert box
  const login_in_submission = ref(false) // keep track if login form is in submisson (prevent excessive request)
  const login_loading = ref(false) // keep track if submission is loading
  const login_show_alert = ref(false) // toggle visiblity of alert box

  const onLogin = async (values: object) => {
    login_alert_color.value = 'bg-blue-500'
    login_in_submission.value = true // disable form button
    login_loading.value = true // loading on
    login_show_alert.value = true // active alert visibility

    if (locale.value === 'pt') {
      login_alert_msg.value = 'Espere, por favor. Estamos lhe conectando.'
    } else if (locale.value === 'es') {
      login_alert_msg.value = 'Aguarde, por favor. Te estamos conectando.'
    } else if (locale.value === 'zh') {
      login_alert_msg.value = '请稍候! 我们正在为您登录。'
    } else if (locale.value === 'ja') {
      login_alert_msg.value = 'お待ちください。 ログインしています。'
    } else {
      login_alert_msg.value = 'Please wait! We are logging you in.'
    }

    try {
      await authStore.loginUser(values)
    } catch (error) {
      console.log(error)
      login_alert_color.value = 'bg-red-500'
      login_in_submission.value = false
      login_loading.value = false

      if (locale.value === 'pt') {
        login_alert_msg.value = 'Dados de login inválidos.'
      } else if (locale.value === 'es') {
        login_alert_msg.value = 'Datos de acceso inválidos.'
      } else if (locale.value === 'zh') {
        login_alert_msg.value = '无效的登录信息。'
      } else if (locale.value === 'ja') {
        login_alert_msg.value = 'ログイン情報が無効です。'
      } else {
        login_alert_msg.value = 'Invalid login details.'
      }

      return // prevent to run further
    }

    login_alert_color.value = 'bg-green-500'
    login_loading.value = false

    if (locale.value === 'pt') {
      login_alert_msg.value = 'Sucesso! Você está logado agora.'
    } else if (locale.value === 'es') {
      login_alert_msg.value = '¡Éxito! Ha iniciado sesión.'
    } else if (locale.value === 'zh') {
      login_alert_msg.value = '成功！ 你现在已经登录了。'
    } else if (locale.value === 'ja') {
      login_alert_msg.value = '成功！ あなたはログインしています。'
    } else {
      login_alert_msg.value = 'Success! You are now logged in.'
    }
    
    // window.location.reload()
    authStore.toggleBg()

    setTimeout(() => {
      login_in_submission.value = false
      login_show_alert.value = false
    }, 7000)
  }

  return {
    login_alert_color,
    login_alert_msg,
    login_in_submission,
    login_loading,
    login_show_alert,

    onLogin
  }
}