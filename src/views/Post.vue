<template>
  <b-loading :active.sync="isLoading" v-if="isLoading"></b-loading>
  <div v-else>
    <PostCard :post="post" @remove-post="removePost" @like-post="onLikePost" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import PostCard from '../components/app/PostCard'

export default {
  data: () => ({
    post: '',
    isLoading: true,
  }),
  async mounted() {
    try {
      const id = this.$route.params.id
      this.post = await this.$store.dispatch('fetchPost', id)
      if (!this.post) this.$router.push('/*')
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
  computed: {
    ...mapGetters(['isWriter', 'isReader']),
  },
  components: {
    PostCard,
  },
}
</script>
<style lang="scss">
.card {
  max-width: 600px;
  margin: 20px 0;
  .card-footer-like {
    padding: 10px;
  }
  .card-header-title {
    padding: 0 0 1em 0;
  }
  .card-content-date-left {
    align-self: flex-end;
    flex: 1;
    margin-bottom: 0.5rem;
  }
}
</style>
