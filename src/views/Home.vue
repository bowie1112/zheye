<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50"/>
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a href="#" class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
    <div class="text-center">
      <button
        class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25"
        @click="loadMorePage" v-if="!isLastPage"
      >
        加载更多
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
import { useColumnStore } from '../store/column'
import useLoadMore from '../hooks/useLoadMore2'
import ColumnList from '../components/ColumnList.vue'

export default defineComponent({
  name: 'Home',
  components: {
    ColumnList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const columnStore = useColumnStore()
    const total = computed(() => columnStore.total)
    const currentPage = computed(() => columnStore.currentPage)
    onMounted(() => {
      columnStore.fetchColumns({ pageSize: 3 })
    })
    const list = computed(() => columnStore.getColumns)
    const { loadMorePage, isLastPage } = useLoadMore(columnStore, 'fetchColumns', {
      currentPage,
      total,
      pageSize: 3
    })
    return {
      list,
      loadMorePage,
      isLastPage
    }
  }
})
</script>
