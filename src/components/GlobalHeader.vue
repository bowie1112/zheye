<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link class="navbar-brand" to="/">者也专栏</router-link>
    <ul v-if="!isLogin" class="list-inline mb-0">
      <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">登陆</router-link></li>
      <li class="list-inline-item"><router-link to="/signup" class="btn btn-outline-light my-2">注册</router-link></li>
    </ul>
    <ul v-else-if="isLogin&&data" class="list-inline mb-0">
      <li class="list-inline-item">
        <dropdown :title="`你好${data.nickName}`">
          <dropdown-item><router-link to="/create" class="dropdown-item">新建文章</router-link></dropdown-item>
          <dropdown-item><router-link :to="`/column/${data.column}`" class="dropdown-item">我的专栏</router-link></dropdown-item>
          <dropdown-item ><router-link to="/edit" class="dropdown-item">编辑资料</router-link></dropdown-item>
          <dropdown-item><a href="#" class="dropdown-item" @click.prevent="handleLogout">退出登录</a></dropdown-item>
        </dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
import { UserDataProps, useUserStore } from '@/store/user'
import createMessage from './createMessage'
export default defineComponent({
  name: 'GlobalHeader',
  components: { Dropdown, DropdownItem },
  props: {
    data: {
      type: Object as PropType<UserDataProps | null>,
      required: true
    },
    isLogin: {
      type: Boolean,
      required: true
    }
  },
  setup () {
    const router = useRouter()
    const userStore = useUserStore()
    const handleLogout = () => {
      userStore.logout()
      createMessage('退出登录成功，2秒后跳转到首页', 'success', 2000)
      setTimeout(() => {
        router.push('/') // 退出后跳转到登录页面
      }, 2000)
    }
    return {
      handleLogout
    }
  }
})
</script>
