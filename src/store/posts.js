import ApiAxios from '../api/Axios'

export default {
  state: {
    posts: [],
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts
    },
  },
  actions: {
    async fetchPosts({ commit }) {
      try {
        const { data } = await ApiAxios.get('/posts')
        return data
      } catch (error) {
        throw error
      }
    },
    async fetchPost({ dispatch }, id) {
      const { data } = await ApiAxios.get('/posts', {
        params: {
          id,
        },
      })
      return data[0]
    },
    async createPost({ commit }, { title, description, userId }) {
      try {
        const { data: data_posts } = await ApiAxios.get('/posts')
        const id = Math.max(...data_posts.map((o) => o.id), 0) + 1
        const claps = 0
        const createdAt = new Date().toString()
        const updateAt = null

        let { data } = await ApiAxios.post('/posts', {
          id,
          title,
          description,
          userId,
          claps,
          createdAt,
          updateAt,
        })
        commit('setPosts', data)
      } catch (error) {
        throw error
      }
    },
    async updatePost({ commit }, { title, description, id }) {
      const updateAt = new Date().toString()
      await ApiAxios.patch(`/posts/${id}`, {
        title,
        description,
        updateAt,
      })
    },
    async fetchPostById({ commit }, id) {
      const { data } = await ApiAxios.get('/posts', {
        params: {
          id,
        },
      })
      return data
    },
    async removePost({ dispatch }, id) {
      await ApiAxios.delete(`/posts/${id}`)
    },
    async likePost({ dispatch }, { id, claps }) {
      await ApiAxios.patch(`/posts/${id}`, {
        claps,
      })
    },
  },
  getters: {
    posts: (s) => s.posts,
  },
}
