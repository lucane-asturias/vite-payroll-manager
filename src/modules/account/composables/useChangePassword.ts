import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/modules/auth/store/authStore'

export const useChangePassword = () => {
  const authStore = useAuthStore()
  const { locale } = useI18n({ useScope: 'global' })

  const change_password_alert_color = ref<string>('bg-blue-500')
  const change_password_alert_msg = ref<string>('Please wait! Your password is being updated.')
  const change_password_in_submission = ref(false)
  const change_password_loading = ref(false)
  const change_password_show_alert = ref(false) 

  const onChangePassword = async (values: object) => {
    change_password_alert_color.value = 'bg-blue-500'
    change_password_in_submission.value = true
    change_password_loading.value = true
    change_password_alert_msg.value = 'Please wait! Your password is being updated.'
    change_password_show_alert.value = true

    if (locale.value === 'pt') {
      change_password_alert_msg.value = 'Espere, por favor! Sua senha está sendo alterada.'
    } else if (locale.value === 'es') {
      change_password_alert_msg.value = 'Por favor, espere. Su contraseña está siendo alterada.'
    } else if (locale.value === 'zh') {
      change_password_alert_msg.value = '请等待! 您的密码正在更改中。'
    } else if (locale.value === 'ja') {
      change_password_alert_msg.value = 'お待ちください！パスワードは変更されています。'
    } else {
      change_password_alert_msg.value = 'Please wait! Your password is being updated.'
    }

    try {
      const { password, newPassword } = values
      authStore.updatePassword(password, newPassword)
    } catch (error) {
      change_password_alert_color.value = 'bg-red-500'
      change_password_in_submission.value = false
      change_password_loading.value = false

      if (locale.value === 'pt') {
        change_password_alert_msg.value = 'Foi gerado um erro inesperado. Tente novamente.'
      } else if (locale.value === 'es') { 
        change_password_alert_msg.value = 'Se ha producido un error inesperado. Vuelva a intentarlo más tarde.'
      } else if (locale.value === 'zh') {
        change_password_alert_msg.value = '一个意料之外的问题发生了。 请稍后再试。'
      } else if (locale.value === 'ja') {
        change_password_alert_msg.value = '予期せぬエラーが発生しました。後でもう一度お試しください。'
      } else {
        change_password_alert_msg.value = error.message || 'An unexpected error ocurred. Please try again later.'
      }

      return
    }

    change_password_alert_color.value = 'bg-green-500'
    change_password_loading.value = false
    change_password_alert_msg.value = 'Success! Your password has been updated.'

    setTimeout(() => {
      change_password_in_submission.value = false
      change_password_show_alert.value = false
    }, 7000)
  }

  return {
    change_password_alert_color,
    change_password_alert_msg,
    change_password_in_submission,
    change_password_loading,
    change_password_show_alert,

    onChangePassword
  }
}