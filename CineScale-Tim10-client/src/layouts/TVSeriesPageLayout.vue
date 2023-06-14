<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        class="q-mr-md text-primary bg-grey-4 q-pa-md"
        transition="jump-up"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        :color="hover ? 'primary' : 'primary'"
        :aria-label="Menu"
        @click="toggleLeftDrawer"
      >
        <q-tooltip v-if="hover">Menu</q-tooltip>
      </q-btn>

        <q-toolbar-title>
          CineScale
        </q-toolbar-title>

        <q-btn v-if="!user" @click="login" label="Login" color="primary" />
        <q-btn v-else @click="logout" label="Logout" color="secondary" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above>
      <q-list style="font-size: 18px;">
        <q-item clickable v-ripple @click="goTo('')" v-bind:class="{'item-active': activeItem === ''}">
          <q-item-section avatar>
            <q-icon name="movie" />
          </q-item-section>
          <q-item-section>Movies</q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="goTo('TVSeries')" v-bind:class="{'item-active': activeItem === 'TVSeries'}">
          <q-item-section avatar>
            <q-icon name="tv" />
          </q-item-section>
          <q-item-section>TV Series</q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="goTo('User')" v-bind:class="{'item-active': activeItem === 'User'}">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
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
  name: 'TVSeriesPageLayout',
  setup () {
    const hover = ref(false)
    const leftDrawerOpen = ref(false)
    const user = ref(null)
    const auth = inject('$auth')
    const router = useRouter()
    const activeItem = ref('TVSeries')

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
        location.reload()
      } else {
        console.log('No user is signed in.')
      }
    }

    function goTo (page) {
      router.push('/' + page)
      leftDrawerOpen.value = false
      activeItem.value = page
    }

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      user,
      activeItem,
      login,
      logout,
      hover,
      goTo
    }
  }
})
</script>
<style scoped>
.q-item {
  transition: background-color .3s ease-in-out;
}

.q-item:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.item-active {
  background-color: rgba(0, 0, 0, 0.1);
  font-weight: 600;
}
</style>
