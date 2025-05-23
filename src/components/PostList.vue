<template>
  <div class="post-list">
    <article v-for="post in posts" :key="post._id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4><router-link :to="`/post/${post._id}/`">{{post.title}}</router-link></h4>
        <div class="row my-3 align-items-center">
          <div v-if="isImageObject(post.image)" class="col-4">
            <img :src="post.image.fitUrl" :alt="post.title" class="rounded-lg w-100" />
          </div>
          <p :class="{'col-8': post.image}" class="text-muted">{{post.excerpt}}</p>
        </div>
        <span class="text-muted">{{post.createdAt}}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { PostProps } from '../store/post'
import { ImageProps } from '../store/utils'
import { generateFitUrl } from '../helper'
export default defineComponent({
  props: {
    list: {
      required: true,
      type: Array as PropType<PostProps[]>
    }
  },
  setup (props) {
    const posts = computed(() => {
      return props.list.map(post => {
        if (typeof post.image === 'object' && post.image) {
          generateFitUrl(post.image as ImageProps, 200, 110, ['m_fill'])
        }
        return post
      })
    })
    const isImageObject = (image: unknown): image is ImageProps => {
      return typeof image === 'object' && image !== null && 'fitUrl' in image
    }
    return {
      posts,
      isImageObject
    }
  }
})
</script>

<style scoped>
.post-list h4 a {
  text-decoration: none;
  color:#1a1a1a;
}
.post-list h4 a:hover {
  color:#0d6efd;
}
</style>
