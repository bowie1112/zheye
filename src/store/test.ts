import { defineStore } from 'pinia'
import { ColumnProps, ResponseType } from '../store'
import axios from 'axios'
interface TestProps {
  data: ColumnProps[]
  total: number
}
// 最好是用 use 开头

export const useTestStore = defineStore('test', {
  state: (): TestProps => {
    return {
      data: [],
      total: 0
    }
  },
  getters: {
    doubleTotal: (state) => {
      return state.total * 2
    },
    doublePlus (): number {
      return this.doubleTotal + 1
    },
    getDataById: (state) => {
      return (id: string) => state.data.find(column => column._id === id)
    }
  },
  actions: {
    increaseTotal () {
      this.total++
    },
    async fetchColumns (params: any = {}) {
      const { currentPage = 1, pageSize = 3 } = params
      const { data } = await axios.get<ResponseType<{ count: number; list: ColumnProps[] }>>(`/columns?currentPage=${currentPage}&pageSize=${pageSize}`)
      const { count, list } = data.data
      this.$patch({ data: list, total: count })
      return list
    }
  }
})
