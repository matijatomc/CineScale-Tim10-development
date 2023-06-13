<template>
  <q-layout view="lHh Lpr lFf">
      <q-header elevated>
          <q-toolbar>
              <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
              <q-toolbar-title>
                  CineScale
              </q-toolbar-title>
              <q-btn v-if="!user" @click="login" label="Login" color="primary" />
              <q-btn v-else @click="logout" label="Logout" color="secondary" />
          </q-toolbar>
      </q-header>
      <q-drawer v-model="leftDrawerOpen" show-if-above>
          <q-list>
              <q-item clickable v-ripple @click="goTo('')">
                  <q-item-section>Movies</q-item-section>
              </q-item>
              <q-item clickable v-ripple @click="goTo('TVSeries')">
                  <q-item-section>TV Series</q-item-section>
              </q-item>
              <q-item clickable v-ripple @click="goTo('User')">
                  <q-item-section>My Reviews</q-item-section>
              </q-item>
          </q-list>
      </q-drawer>
      <q-page-container>
          <router-view />
      </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { signOut } from 'firebase/auth'

export default defineComponent({
  name: 'MainLayout',
  setup () {
    const leftDrawerOpen = ref(false)
    const user = ref(null)
    const auth = inject('$auth')
    const router = useRouter()
    onMounted(() => {
      auth.onAuthStateChanged((firebaseUser) => {
        console.log(firebaseUser)
        user.value = firebaseUser
      })
    })
    function login () {
      router.push('/Login')
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
    function goTo (page) {
      router.push('/' + page)
      leftDrawerOpen.value = false
    }
    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      user,
      login,
      logout,
      goTo
    }
  }
})
</script>
