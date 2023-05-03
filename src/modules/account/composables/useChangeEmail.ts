import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/modules/auth/store/authStore'

export const useChangeEmail = () => {
  const authStore = useAuthStore()
  const { locale } = useI18n({ useScope: 'global' })

  const change_email_alert_color = ref<string>('bg-blue-500')
  const change_email_alert_msg = ref<string>('Please wait! Your email is being updated.')
  const change_email_in_submission = ref(false)
  const change_email_loading = ref(false)
  const change_email_show_alert = ref(false) 

  const onChangeEmail = async (values: object) => {
    change_email_alert_color.value = 'bg-blue-500'
    change_email_in_submission.value = true
    change_email_loading.value = true
    change_email_alert_msg.value = 'Please wait! Your email is being updated.'
    change_email_show_alert.value = true

    if (locale.value === 'pt') {
      change_email_alert_msg.value = 'Espere, por favor! Seu email está sendo atualizado.'
    } else if (locale.value === 'es') {
      change_email_alert_msg.value = 'Por favor, espere. Su nombre se está actualizando'
    } else if (locale.value === 'zh') {
      change_email_alert_msg.value = '请等待! 您的电子邮件正在更新中。'
    } else if (locale.value === 'ja') {
      change_email_alert_msg.value = 'お待ちください。 お客様のメールは更新されています。'
    } else {
      change_email_alert_msg.value = 'Please wait! Your email is being updated.'
    }

    try {
      const { email, password } = values
      await authStore.updateEmail(email, password)
    } catch (error) {
      change_email_alert_color.value = 'bg-red-500'
      change_email_in_submission.value = false
      change_email_loading.value = false
      console.log(error)

      if (locale.value === 'pt') {
        change_password_msg.value = 'Foi gerado um erro inesperado. Tente novamente.'
      } else if (locale.value === 'es') { 
        change_email_alert_msg.value = 'Se ha producido un error inesperado. Vuelva a intentarlo más tarde.'
      } else if (locale.value === 'zh') {
        change_email_alert_msg.value = '一个意料之外的问题发生了。 请稍后再试。'
      } else if (locale.value === 'ja') {
        change_email_alert_msg.value = '予期せぬエラーが発生しました。後でもう一度お試しください。'
      } else {
        change_email_alert_msg.value = error.message || 'An unexpected error ocurred. Please try again later.'
      }

      return
    }

    change_email_alert_color.value = 'bg-green-500'
    change_email_loading.value = false
    change_email_alert_msg.value = 'Success! Your email has been updated.'

    setTimeout(() => {
      change_email_in_submission.value = false
      change_email_show_alert.value = false
    }, 7000)
  }

  return {
    change_email_alert_color,
    change_email_alert_msg,
    change_email_in_submission,
    change_email_loading,
    change_email_show_alert,

    onChangeEmail
  }
}