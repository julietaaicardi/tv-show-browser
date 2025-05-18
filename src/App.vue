<template>
  <Header @select="handleSelect"/>
  <router-view/>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import { useRouter } from 'vue-router'
import { useShowsStore } from './stores/shows'

const router = useRouter()
const store = useShowsStore()

function handleSelect(show: Show) {
  store.setCurrentShow(show)
  router.push({ name: 'show-detail', params: { id: show.id } })
}

</script>
