<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar?.url" :alt="column.title" class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <h4>{{column.title}}</h4>
        <p class="text-muted">{{column.description}}</p>
      </div>
    </div>
    <post-list :list="posts"></post-list>
    <button
      class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25 d-block"
      @click="loadMorePage" v-if="!isLastPage"
    >
      加载更多
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useColumnStore, ColumnProps } from '../store/column'
import { usePostStore, PostProps } from '../store/post'
import { useUserStore } from '../store/user'
import PostList from '../components/PostList.vue'
import { addColumnAvatar } from '../helper'
import useLoadMore from '../hooks/useLoadMore'

export default defineComponent({
  components: {
    PostList
  },
  setup () {
    const route = useRoute()
    const columnStore = useColumnStore()
    const userStore = useUserStore()
    const postStore = usePostStore()
    const currentId = ref(route.params.id as string)

    onMounted(() => {
      columnStore.fetchColumn(currentId.value)
      postStore.fetchPosts({ cid: currentId.value })
    })

    watch(() => route.params, (toParams: { id?: string }) => {
      const jumpId = toParams?.id
      const column = userStore.data?.column
      if (jumpId && column && (jumpId === column)) {
        columnStore.fetchColumn(jumpId)
        postStore.fetchPosts({ cid: jumpId })
        currentId.value = jumpId
      }
    })

    const column = computed<ColumnProps | undefined>(() => {
      const selectColumn = columnStore.getColumnById(currentId.value)
      if (selectColumn) {
        addColumnAvatar(selectColumn, 100, 100)
      }
      return selectColumn
    })

    const posts = computed<PostProps[]>(() => postStore.getPostsByCid(currentId.value))
    const total = computed(() => postStore.getPostsCountByCid(currentId.value))
    const currentPage = computed(() => postStore.getPostsCurrentPageByCid(currentId.value))

    const { loadMorePage, isLastPage } = useLoadMore('fetchPosts', total, {
      currentPage: currentPage.value,
      pageSize: 5,
      cid: currentId.value
    })

    return {
      column,
      posts,
      loadMorePage,
      isLastPage
    }
  }
})
</script>
