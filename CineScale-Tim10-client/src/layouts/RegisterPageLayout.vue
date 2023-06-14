<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          CineScale
        </q-toolbar-title>
        <q-btn
          flat
          dense
          @click="openWelcomePage"
          icon="home"
        />
          <q-space />
        </q-toolbar>
      </q-header>
      <q-page-container>
      <router-view />
      </q-page-container>
    </q-layout>
  </template>
<script>
import { useRouter } from 'vue-router'
export default {
  name: 'RegisterPageLayout',
  setup () {
    const router = useRouter()

    function openWelcomePage () {
      router.push('/')
    }

    return {
      openWelcomePage
    }
  }
}
</script>
