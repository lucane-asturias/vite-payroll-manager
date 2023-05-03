import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/modules/auth/store/authStore'

export const useChangeName = () => {
  const authStore = useAuthStore()
  const { locale } = useI18n({ useScope: 'global' })

  const change_name_alert_color = ref<string>('bg-blue-500')
  const change_name_alert_msg = ref<string>('Please wait! Your name is being updated.')
  const change_name_in_submission = ref(false)
  const change_name_loading = ref(false)
  const change_name_show_alert = ref(false)

  const onChangeName = async (values: object) => {
    change_name_alert_color.value = 'bg-blue-500'
    change_name_in_submission.value = true
    change_name_loading.value = true
    change_name_show_alert.value = true

    if (locale.value === 'pt') {
      change_name_alert_msg.value = 'Espere, por favor! Seu nome está sendo atualizado.'
    } else if (locale.value === 'es') {
      change_name_alert_msg.value = 'Por favor, espere. Su nombre se está actualizando'
    } else if (locale.value === 'zh') {
      change_name_alert_msg.value = '请等待! 你的名字正在更新中。'
    } else if (locale.value === 'ja') {
      change_name_alert_msg.value = 'お待ちください！お名前は更新中です。'
    } else {
      change_name_alert_msg.value = 'Please wait! Your name is being updated.'
    }

    try {
      await authStore.updateName(values.name)
    } catch (error) {
      change_name_in_submission.value = false
      change_name_loading.value = false
      change_name_alert_color.value = 'bg-red-500'

      if (locale.value === 'pt') {
        change_name_alert_msg.value = 'Foi gerado um erro inesperado. Tente novamente.'
      } else if (locale.value === 'es') { 
        change_name_alert_msg.value = 'Se ha producido un error inesperado. Vuelva a intentarlo más tarde.'
      } else if (locale.value === 'zh') {
        change_name_alert_msg.value = '一个意料之外的问题发生了。 请稍后再试。'
      } else if (locale.value === 'ja') {
        change_name_alert_msg.value = '予期せぬエラーが発生しました。後でもう一度お試しください。'
      } else {
        change_name_alert_msg.value = error.message || 'An unexpected error ocurred. Please try again later.'
      }

      return
    }

    change_name_alert_color.value = 'bg-green-500'
    change_name_loading.value = false
    // to do: translations
    change_name_alert_msg.value = 'Success! Your name has been updated.'

    setTimeout(() => {
      change_name_in_submission.value = false
      change_name_show_alert.value = false
    }, 7000)
  }

  return {
    change_name_alert_color,
    change_name_alert_msg,
    change_name_in_submission,
    change_name_loading,
    change_name_show_alert,

    onChangeName
  }
}