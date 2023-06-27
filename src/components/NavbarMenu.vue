<template>
  <header class="bg-black-shade sticky top-0">
    <nav class="menu mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
    
      <div class="flex flex-1">
        <router-link to="/" class="text-base lg:text-lg text-white hover:text-blue-400 font-semibold leading-6 text-gray-900">
          {{ $t('navbar.payrolls') }}
        </router-link>
      </div>

      <div class="flex mr-2 lg:mr-0">
        <router-link to="/" class="-m-1.5 p-1.5">
          <span class="sr-only">{{ $t('navbar.payrolls') }}</span>
          <div class="image">
            <img class="h-12 w-auto" src="../assets/nomina.png" alt="payrolls">
          </div>
        </router-link>
      </div>

      <div class="flex flex-1 justify-end">

        <template v-if="isUserLoggedIn">
          <div class="hidden lg:flex text-sm lg:text-lg text-white hover:text-blue-400 mt-1 md:mt-1.5 mr-10 font-semibold leading-6 text-gray-900">
            {{ $t('navbar.hello') }}, {{ user.displayName || user.email  }}
          </div>

          <div class="cursor-pointer hidden lg:flex text-sm lg:text-lg text-white hover:text-red-400 mt-1 md:mt-1.5 font-semibold leading-6 text-gray-900" @click="logOut">
            {{ $t('navbar.logout') }} <span class="pl-1" aria-hidden="true">&rarr;</span>
          </div>

            
          <div class="border border-1 border-red-300 rounded px-3 -py-1 lg:hidden">
            <div class="cursor-pointer flex text-sm lg:text-lg text-white hover:text-red-400 -mr-1 sm:-mr-1 mt-3.5 sm:mt-3 h-15 font-semibold leading-6 text-gray-900" @click="logOut">
              <i class="fas fa-sign-out-alt fa-lg" />
            </div>
          </div>
        </template>

        <select @click.prevent="changeLocale"
          class="fa appearance-none text-sm sm:text-base w-12 sm:w-12 lg:h-full bg-gray-200 border border-gray-200 text-gray-700 
            py-3 sm:py-2 px-3.5 ml-7 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 font-bold tracking-normal lg:tracking-widest" 
        >
          <option hidden selected value="#" aria-hidden="true">&#xf57d;</option>
          <option disabled>{{ $t('navbar.select_language') }}</option>
          <option value="en">{{ $t('language.en') }}</option>
          <option value="pt">{{ $t('language.pt') }}</option>
          <option value="es">{{ $t('language.es') }}</option>
          <option value="ja">{{ $t('language.ja') }}</option>
          <option value="zh">{{ $t('language.zh') }}</option>
        </select>

      </div>

    </nav>
  </header>
</template>

<script setup>
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { setLocale } from '@vee-validate/i18n'
  import { useAuthStore } from '@/modules/auth/store/authStore'
  import { auth } from '@/utils/firebase'
  
  const { locale } = useI18n({ useScope: 'global' })

  const authStore = useAuthStore()

  const user = computed(() => authStore.user)
  const isUserLoggedIn = computed(() => authStore.isUserLoggedIn)

  const logOut = async () => await authStore.signOut()

  const changeLocale = (event) => {
    if (event.target.value === 'pt') {
      locale.value = 'pt'
      setLocale('pt_BR')
    } else if (event.target.value === 'es') {
      locale.value = 'es'
      setLocale('es')
    } else if (event.target.value === 'ja') {
      locale.value = 'ja'
      setLocale('ja')
    } else if (event.target.value === 'zh') {
      locale.value = 'zh'
      setLocale('zh')
    } else {
      locale.value = 'en'
      setLocale('en')
    }
  }

</script>

<style scoped lang="scss">
  .menu {
    height: 4rem;
    
    .image {
      background-color: #16212b;
      position: relative;
      top: 15px;
      padding: 20px;
      margin: -20px;
      border-radius: 50%;

      &:hover {
        box-shadow: 0px 10px 10px -3px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: 0px 10px 10px -3px rgba(0, 0, 0, 0.3);
        -moz-box-shadow: 0px 10px 10px -3px rgba(0, 0, 0, 0.3);
      }
    }
  }
  
</style>