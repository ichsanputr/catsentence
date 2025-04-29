<script setup>
import { useApp } from '~/store/app';

useHead({
  title: 'Login'
})

const { $firebaseAuth, $firebaseProvider, $firebaseSignInWithPopup, $twitterProvider } = useNuxtApp();
const { authGoogle, authX, login } = useOauth();
const { saveToken } = useAuth();

const loading = ref(false)
const formSubmit = ref(null)
const snackbar = reactive({
  text: '',
  state: false,
  color: ''
})
const form = reactive({
  email: null,
  password: null,
})

const loginGoogle = async () => {
  loading.value = true
  try {
    const result = await $firebaseSignInWithPopup($firebaseAuth, $firebaseProvider);
    const token = await authGoogle(result._tokenResponse)

    saveToken(token)
    setTimeout(() => {
      toastOpen()
    }, 1000)
    navigateTo('/profile')
  } catch (error) {
    console.error("Login failed:", error);
  }
  loading.value = false
};

const loginX = async () => {
  loading.value = true
  try {
    const result = await $firebaseSignInWithPopup($firebaseAuth, $twitterProvider);
    const token = await authX(result)

    saveToken(token)
    setTimeout(() => {
      toastOpen()
    }, 1000)
    navigateTo('/profile')
  } catch (error) {
    console.error("Login failed:", error);
  }
  loading.value = false
};

const loginBasic = async () => {
  const { valid } = await formSubmit.value.validate();
  if (!valid) return

  loading.value = true
  try {
    const token = await login(form)

    snackbar.state = true
    snackbar.text = 'Login successfull!'
    snackbar.color = 'green'

    saveToken(token)
    navigateTo('/profile')
  } catch (err) {
    snackbar.state = true
    snackbar.text = err.response.data.message
    snackbar.color = 'red'
  }
  loading.value = false
};


const toastOpen = () => {
  useApp().toast.message = "Successfully login..."
  useApp().toast.color = "success"
  useApp().toast.state = true
}

const rules = {
  required: (v) => !!v || 'Field is required',
  email: (v) => /.+@.+\..+/.test(v) || 'Enter a valid email address',
};
</script>
<template>
  <div class="my-10">
    <v-snackbar timeout="3000" :color="snackbar.color" v-model="snackbar.state" >
      {{ snackbar.text }}
    </v-snackbar>
    <div class="text-base mt-3 ci flex flex-col gap-4">
      <div class="text-center mb-2">
        <div class="text-lg pb-0">Welcome Back!</div>
        <h1 class=" text-[#00AA45] text-2xl font-medium">Login to your Account.</h1>
      </div>
      <div class="sm:cardku w-full sm:w-3/4 mx-auto sm:pa-6 rounded-xl">
        <v-form ref="formSubmit">
          <div class="font-medium mb-1">Email <span class="text-red">*</span></div>
          <v-text-field :rules="[rules.required, rules.email]" v-model="form.email" color="#00AA45" variant="outlined"
            density="compact" placeholder="Enter your email.." />
          <div class="font-medium mb-1">Password <span class="text-red">*</span></div>
          <v-text-field :rules="[rules.required]" v-model="form.password" color="#00AA45" variant="outlined"
            density="compact" :type="showPassword ? 'text' : 'password'" placeholder="Enter your password..">
            <template #append-inner>
              <div class="cursor-pointer">
                <Icon width="20" :icon="showPassword ? 'fluent:eye-32-filled' : 'mdi:eye-off-outline'"
                  @click="showPassword = !showPassword" />
              </div>
            </template>
          </v-text-field>
        </v-form>

        <div>
          <v-btn @click="loginBasic" :loading="loading" block flat color="#00AA45"
            class="rounded-lg mb-6 mt-2">Login</v-btn>
        </div>

        <div class="divider-container mb-3">
          <div class="line" />
          <span class="text">Or Login With</span>
          <div class="line" />
        </div>

        <div class="flex flex-col gap-3">
          <div v-ripple class="flex cursor-pointer justify-center jh gap-2 rounded-lg pa-2"
            style="border: 1px solid #E2E8F0;" @click="loginGoogle">
            <Icon width="20" icon="flat-color-icons:google" />
            <div>Continue with Google</div>
          </div>
          <div v-ripple class="flex cursor-pointer justify-center jh gap-2 rounded-lg pa-2"
            style="border: 1px solid #E2E8F0;" @click="loginX">
            <Icon width="20" icon="fa6-brands:x-twitter" />
            <div>Continue with X</div>
          </div>
        </div>
      </div>
      <div class="text-center nk text-sm mt-3">
        Don't have an account? <span class="underline text-[#00AA45] cursor-pointer"
          @click="navigateTo('/register')">Register
          it!</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showPassword: false
    }
  }
}
</script>
<style scoped>
.jh {
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
}

.cardku {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  border: 1px solid #E2E8F0;
}

.nk {
  color: rgb(100, 116, 139);
}

.divider-container {
  display: flex;
  align-items: center;
  width: 100%;
}

.line {
  flex: 1;
  border-bottom: 1px solid #00AA45;
}

.text {
  font-size: 14px;
  margin: 0 10px;
  white-space: nowrap;
  color: #333;
  /* Change this to match your theme */
}
</style>