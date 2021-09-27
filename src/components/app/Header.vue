<template>
  <div class="b-navbar">
    <b-navbar type="is-info">
      <template #start>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          Главная
        </b-navbar-item>
      </template>
      <template #end>
        <b-navbar-item
          tag="router-link"
          :to="{ path: '/posts/new' }"
          v-if="isWriter"
        >
          Создать пост
        </b-navbar-item>
        <b-navbar-item tag="a" @click.prevent="logout" v-if="user">
          Выйти
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/login' }" v-if="!user">
          Логин
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('logout')
        this.$router.push('/login')
      } catch (error) {
        throw error
      }
    },
  },
  computed: {
    ...mapGetters(['user', 'isWriter']),
  },
}
</script>
<style lang="scss">
.b-navbar {
  margin-bottom: 30px;
}
</style>
