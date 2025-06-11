<template>
  <div>
    <h2>Vuex 示例</h2>
    <p>Count: {{ vuexCount }}</p>
    <p>Double Count: {{ vuexDoubleCount }}</p>
    <button @click="vuexIncrement">Increment (Vuex)</button>
    <button @click="vuexLogin">Login (Vuex)</button>

    <h2>Pinia 示例</h2>
    <p>Count: {{ piniaCount }}</p>
    <p>Double Count: {{ piniaDoubleCount }}</p>
    <button @click="piniaIncrement">Increment (Pinia)</button>
    <button @click="piniaLogin">Login (Pinia)</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useUserStore } from '@/store/piniaExample'

export default defineComponent({
  name: 'StoreExample',
  setup() {
    // Vuex 使用
    const store = useStore()
    const vuexCount = computed(() => store.state.count)
    const vuexDoubleCount = computed(() => store.getters.doubleCount)

    const vuexIncrement = () => {
      store.commit('increment')
    }

    const vuexLogin = () => {
      store.dispatch('login', { email: 'test@example.com', password: '123456' })
    }

    // Pinia 使用
    const userStore = useUserStore()
    const piniaCount = computed(() => userStore.count)
    const piniaDoubleCount = computed(() => userStore.doubleCount)

    const piniaIncrement = () => {
      userStore.increment()
    }

    const piniaLogin = () => {
      userStore.login({ email: 'test@example.com', password: '123456' })
    }

    return {
      // Vuex
      vuexCount,
      vuexDoubleCount,
      vuexIncrement,
      vuexLogin,
      // Pinia
      piniaCount,
      piniaDoubleCount,
      piniaIncrement,
      piniaLogin
    }
  }
})
</script>
