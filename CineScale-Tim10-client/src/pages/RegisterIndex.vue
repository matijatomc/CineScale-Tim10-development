<template>
    <div class="q-pa-lg row justify-center">
      <div class="col" style="max-width: 400px">
        <q-form @submit="onRegister">
          <q-card>
            <q-card-section>
              <div class="text-h6">
                Register
              </div>
            </q-card-section>
            <q-card-section>
              <div class="q-gutter-md">
                <q-input filled type="email" v-model="email" label="Your email " hint="Email to register" lazy-rules
                  :rules="[val => emailPattern.test(val) || 'Please type valid email']" />
                <q-input filled type="password" v-model="password" label="Password" hint="Password to register" lazy-rules
                  :rules="[val => val && val.length > 0 || 'Please type password']" />
                <q-input filled type="password" v-model="confirmPassword" label="Confirm Password" hint="Re-enter password to confirm" lazy-rules
                  :rules="[val => val && val.length > 0 || 'Please type password']" />
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn label="Register" type="submit" color="primary" />
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
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

export default {
  name: 'RegisterIndex',
  setup (_, { root }) {
    const auth = inject('$auth')

    const emailPattern = /^(?=[a-zA-Z0-9@.%+-]{6,254}$)[a-zA-Z0-9.%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}.){1,8}[a-zA-Z]{2,63}$/
    const email = ref(null)
    const password = ref(null)
    const confirmPassword = ref(null) // New ref for the confirm password
    const errorMessage = ref(null)
    const router = useRouter()

    const onRegister = async (e) => {
      e.preventDefault()
      if (password.value !== confirmPassword.value) { // Compare the two passwords
        errorMessage.value = 'Passwords do not match.'
        return
      }
      try {
        await createUserWithEmailAndPassword(auth, email.value, password.value)
        router.push('/')
      } catch (error) {
        console.log(error)
        errorMessage.value = 'Could not register. Please try again.'
      }
    }

    return {
      email,
      password,
      confirmPassword, // Return the new ref so it's available in the template
      emailPattern,
      onRegister,
      errorMessage
    }
  }
}
</script>
