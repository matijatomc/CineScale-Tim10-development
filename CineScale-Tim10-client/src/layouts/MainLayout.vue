<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <q-btn v-if="!user" @click="login" label="Login" color="primary" />

        <q-btn v-else @click="logout" label="Logout" color="secondary" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router' // import useRouter from 'vue-router'
import { signOut } from 'firebase/auth'

export default defineComponent({
  name: 'MainLayout',
  setup () {
    const leftDrawerOpen = ref(false)
    const user = ref(null)
    const auth = inject('$auth')
    const router = useRouter() // get router instance

    onMounted(() => {
      auth.onAuthStateChanged((firebaseUser) => {
        console.log(firebaseUser)
        user.value = firebaseUser
      })
    })

    function login () {
      router.push('/Login') // navigate to login page
    }

    function logout () {
      if (auth.currentUser) {
        signOut(auth).then(() => {
          user.value = null
          console.log('User signed out.')
        }).catch((error) => {
          console.error('Sign Out Error: ', error)
        })
      } else {
        console.log('No user is signed in.')
      }
    }

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      user,
      login,
      logout
    }
  }
})
</script>
