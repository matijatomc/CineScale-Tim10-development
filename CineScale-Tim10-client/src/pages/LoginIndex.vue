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
              <q-input filled type="email" v-model="email" label="Your email *" hint="Email to login" lazy-rules
                :rules="[val => emailPattern.test(val) || 'Please type valid email']" />
              <q-input filled type="password" v-model="password" label="Password *" hint="Password to login" lazy-rules
                :rules="[val => val && val.length > 0 || 'Please type password']" />
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn label="Login" type="submit" color="primary" />
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
  </div>
</template>
<script>
import { ref, inject } from 'vue'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Notify } from 'quasar'

export default {
  name: 'LoginIndex',
  setup () {
    const auth = inject('$auth')

    const emailPattern = /^(?=[a-zA-Z0-9@.%+-]{6,254}$)[a-zA-Z0-9.%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}.){1,8}[a-zA-Z]{2,63}$/
    const email = ref(null)
    const password = ref(null)

    return {
      auth,
      email,
      password,
      emailPattern
    }
  },
  methods: {
    async onLogin (e) {
      e.preventDefault()
      try {
        await signInWithEmailAndPassword(this.auth, this.email, this.password)
        this.$router.push('/')
      } catch (error) {
        console.log(error)
        Notify.create({ // Use Notify directly
          type: 'negative',
          message: error.message // display the error message from Firebase
        })
      }
    }
  }
}
</script>
