<template>
  <div>
    <b-loading :active.sync="isLoading" v-if="isLoading"></b-loading>
    <div v-else>
      <PostCard
        v-for="post of items"
        :key="post.id"
        :post="post"
        @remove-post="removePost"
        @like-post="onLikePost"
      />

      <b-pagination
        :total="pageCount"
        :current.sync="page"
        :per-page="pageSize"
        aria-next-label="Следующая страница"
        aria-previous-label="Предыдущая страница"
        aria-page-label="Страница"
        aria-current-label="Текущая страница"
        @change="pageChangeHandler"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import PostCard from '../components/app/PostCard'
import pagination from '../mixins/pagination'
export default {
  name: 'Home',
  mixins: [pagination],
  data: () => ({
    isLoading: true,
  }),
  components: {
    PostCard,
  },
  async mounted() {
    try {
      this.allItems = await this.$store.dispatch('fetchPosts')
      this.setupPagination(this.allItems)
      this.count = this.pageCount
      this.isLoading = false
    } catch (error) {
      throw error
    }
  },
  methods: {
    async removePost(id) {
      try {
        this.isLoading = true
        await this.$store.dispatch('removePost', id)
        this.allItems = await this.$store.dispatch('fetchPosts')
        this.setupPagination(this.allItems)
        this.isLoading = false
      } catch (error) {
        throw error
      }
    },
    async onLikePost(id, claps) {
      try {
        const data = { id, claps: ++claps }
        await this.$store.dispatch('likePost', data)
        this.allItems = await this.$store.dispatch('fetchPosts')
        this.setupPagination(this.allItems)
      } catch (error) {
        throw error
      }
    },
  },
}
</script>
