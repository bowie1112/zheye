import { createStore } from 'vuex'

// 定义 state 类型
interface State {
  count: number;
  user: {
    name: string;
    isLogin: boolean;
  };
}

// 创建 store
const store = createStore<State>({
  state: {
    count: 0,
    user: {
      name: '',
      isLogin: false
    }
  },
  // 同步修改状态
  mutations: {
    increment(state) {
      state.count++
    },
    setUser(state, user) {
      state.user = user
    }
  },
  // 异步操作
  actions: {
    async login({ commit }, credentials) {
      try {
        // 模拟 API 调用
        const response = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify(credentials)
        })
        const user = await response.json()
        commit('setUser', user)
      } catch (error) {
        console.error('Login failed:', error)
      }
    }
  },
  // 计算属性
  getters: {
    doubleCount: (state) => state.count * 2,
    isLoggedIn: (state) => state.user.isLogin
  }
})

export default store
