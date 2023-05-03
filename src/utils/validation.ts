import { Form as VeeForm, Field as VeeField, defineRule, ErrorMessage, configure } from 'vee-validate'
import { required, min, min_value, max, max_value, email, confirmed, alpha_spaces, not_one_of as excluded } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import pt_BR from '@vee-validate/i18n/dist/locale/pt_BR.json'
import es from '@vee-validate/i18n/dist/locale/es.json'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
import zh from '@vee-validate/i18n/dist/locale/zh_CN.json'

export default {
  // plug-ins are objects with a method called install
  // Vue wil call the install method when we register it
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    // name of the rule + function that will perform the validation 
    // this rules will be available to every validation form
    defineRule('required', required)
    defineRule('min', min) 
    defineRule('max', max)
    defineRule('min_value', min_value) // must be a numeric value
    defineRule('max_value', max_value) // must be a numeric value
    defineRule('email', email) // must have the same value as the confirmation field.
    defineRule('passwords_mismatch', confirmed)
    defineRule('alpha_spaces', alpha_spaces)
    defineRule('excluded', excluded)
    // copy of the same rule for override error message
    defineRule('language_excluded', excluded)
    defineRule('tos', required) // rule for generic message

    configure({
      generateMessage: localize({
        en: { 
          messages: {
            required: 'The {field} is required!',
            min: 'The {field} must be at least 0:{min} characters!',
            max: 'The field {field} must be less than 0:{max}!',
            alpha_spaces: 'The field {field} may only contain alphabetical characters and spaces!',
            email: 'The field {field} must be a valid email!',
            min_value: 'At least 0:{min_value} years old or above!',
            max_value: 'Must be less than 0:{max_value} years old!',
            excluded: 'You are not allowed to use this value for the field {field}.',
            language_excluded: 'Due to restrictions, we do not accept users from this location!',
            passwords_mismatch: 'The passwords don\'t match.',
            tos: 'You must accept the Terms of Service.'
          }
        },
        pt_BR: {
          messages: {
            required: 'O campo {field} é de obrigatório preenchimento.',
            min: 'O campo {field} deve ser pelo menos 0:{min} caracteres.',
            max: 'O campo {field} deve ser menor do que 0:{max}',
            alpha_spaces: 'O campo {field} deve apenas conter caracteres alfabéticos e espaços.',
            email: 'O campo {field} deve ser um válido email.',
            min_value: 'No mínimo 0:{min_value} anos ou mais.',
            max_value: 'A idade é muito alta, deve ser no máximo 0:{max_value} de idade.',
            excluded: 'Não é permitido usar esse valor para o campo {field}.',
            language_excluded: 'Devido a restrições, não aceitamos usuários deste local.',
            passwords_mismatch: 'As senhas não são iguais.',
            tos: 'Você deve aceitar os Termos de Serviço.'
          }
        },
        es,
        ja,
        zh,
      }),
      // validation triggers to change default behaviour: default values
      validateOnBlur: true,
      validateOnChange: true,  
      validateOnInput: false,
      validateOnModelUpdate: true, // validate when value changes internally through the v-model directive
    })
  },
}