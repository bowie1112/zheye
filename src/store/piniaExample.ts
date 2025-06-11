import { defineStore } from 'pinia'

// 定义 state 类型
interface UserState {
  count: number;
  user: {
    name: string;
    isLogin: boolean;
  };
}

// 创建 store
export const useUserStore = defineStore('user', {
  // 状态
  state: (): UserState => ({
    count: 0,
    user: {
      name: '',
      isLogin: false
    }
  }),

  // 计算属性
  getters: {
    doubleCount: (state) => state.count * 2,
    isLoggedIn: (state) => state.user.isLogin
  },

  // 方法（包含同步和异步）
  actions: {
    increment() {
      this.count++
    },
    setUser(user: { name: string; isLogin: boolean }) {
      this.user = user
    },
    async login(credentials: { email: string; password: string }) {
      try {
        // 模拟 API 调用
        const response = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify(credentials)
        })
        const user = await response.json()
        this.setUser(user)
      } catch (error) {
        console.error('Login failed:', error)
      }
    }
  }
})
