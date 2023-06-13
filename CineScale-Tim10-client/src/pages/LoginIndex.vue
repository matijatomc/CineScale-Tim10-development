<template>
  <div class="q-pa-lg row justify-center">
    <div class="col" style="max-width: 400px">
      <q-form @submit="onLogin">
        <q-card>
          <q-card-section>
            <div class="text-h6">
              Login
            </div>
          </q-card-section>
          <q-card-section>
            <div class="q-gutter-md">
              <q-input filled type="email" v-model="email" label="Your email " hint="Email to login" lazy-rules
                :rules="[val => emailPattern.test(val) || 'Please type valid email']" />
              <q-input filled type="password" v-model="password" label="Password" hint="Password to login" lazy-rules
                :rules="[val => val && val.length > 0 || 'Please type password']" />
            </div>
          </q-card-section>
          <q-card-actions align="between">
            <q-btn label="Register" type="button" color="secondary" @click="onRegister" />
            <q-btn label="Login" type="submit" color="primary" />
          </q-card-actions>
          <q-card-section>
            <div class="text-negative" v-if="errorMessage">{{ errorMessage }}</div>
          </q-card-section>
        </q-card>
      </q-form>
    </div>
  </div>
</template>
<script>
import { ref, inject } from 'vue'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginIndex',
  setup (_, { root }) {
    const auth = inject('$auth')

    const emailPattern = /^(?=[a-zA-Z0-9@.%+-]{6,254}$)[a-zA-Z0-9.%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}.){1,8}[a-zA-Z]{2,63}$/
    const email = ref(null)
    const password = ref(null)
    const errorMessage = ref(null)
    const router = useRouter()

    const onLogin = async (e) => {
      e.preventDefault()
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value)
        router.push('/')
      } catch (error) {
        console.log(error)
        errorMessage.value = 'Incorrect email or password. Please try again.'
      }
    }

    const onRegister = () => {
      router.push('/Register')
    }

    return {
      email,
      password,
      emailPattern,
      onLogin,
      errorMessage,
      onRegister
    }
  }
}
</script>
