<template>
  <div class="q-pa-lg row justify-center">
  <div
    class="col"
    style="max-width: 400px"
  >
  <q-form @submit="onLogin">
  <q-card>
  <q-card-section>
  <div class="text-h6">
    Login
  </div>
  </q-card-section>
  <q-card-section>
  <div class="q-gutter-md">
  <q-input
    filled
    type="email"
    v-model="email"
    label="Your email *"
    hint="Email to login"
    lazy-rules
    :rules="[ val => emailPattern.test(val) || 'Please type validemail']"
  />
  <q-input
    filled
    type="password"
    v-model="password"
    label="Password *"
    hint="Password to login"
    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Please typepassword']"
  />
  </div>
  </q-card-section>
  <q-card-actions align="right">
  <q-btn
    label="Login"
    type="submit"
    color="primary"
  />
  </q-card-actions>
  </q-card>
  </q-form>
  </div>
  </div>

</template>
<script>
export default {
  name: 'LoginIndex',
  data () {
    return {
      emailPattern: /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/,
      email: null,
      password: null
    }
  },
  mounted: function () {
    if (this.$auth.currentUser) {
      this.$router.push('/Administration')
    }
  },
  methods: {
    onLogin () {
      this.$auth.signInWithEmailAndPassword(this.email, this.password)
        .then(response => {
          this.$router.push('/Administration')
        })
        .catch(error => {
          console.log(error)
          this.$q.notify({
            type: 'negative',
            message: 'Login failed.'
          })
        })
    }
  }
}
</script>
