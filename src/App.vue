<template>
  <div class="container">
    <global-header :data="currentUser" :is-login="isLogin"></global-header>
    <loader v-if="isLoading"></loader>

    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2025 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader.vue'
import Loader from './components/Loader.vue'
import createMessage from './components/createMessage'
import { useGlobalStore } from './store/global'
import { useUserStore } from './store/user'
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loader
  },
  setup () {
    const globalStore = useGlobalStore()
    const currentUser = computed(() => userStore.data)
    const isLogin = computed(() => userStore.isLogin)
    const userStore = useUserStore()
    const isLoading = computed(() => globalStore.loading)
    const error = computed(() => globalStore.error)
    watch(() => error.value.status, () => {
      const { status, message } = error.value
      if (status && message) {
        createMessage(message, 'error', 2000)
      }
    })
    return {
      currentUser,
      isLoading,
      error,
      isLogin
    }
  }
})
</script>

<style>

</style>
