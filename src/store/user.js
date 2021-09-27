import ApiAxios from '../api/Axios'

export default {
  state: {
    user: null,
  },

  mutations: {
    setUser: (state, user) => {
      state.user = user
    },
  },
  getters: {
    user: (s) => s.user,
    isWriter: (s) => s.user && s.user.role === 'writer',
    isReader: (s) => s.user && s.user.role === 'reader',
  },
  actions: {
    async login({ commit }, { email, password }) {
      const { data } = await ApiAxios.get('/users', {
        params: {
          email,
          password,
        },
      })
      if (!data.length) {
        throw new Error('Пользователь не найден!')
      }
      document.cookie = `user=${data[0].email}`
      commit('setUser', data[0])
    },
    logout({ commit }) {
      commit('setUser', null)
      document.cookie = "user=''"
    },
  },
}
