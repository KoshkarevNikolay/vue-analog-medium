<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>
<script>
import LoginLayout from '@/layouts/LoginLayout'
import MainLayout from '@/layouts/MainLayout'
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || 'main') + '-layout'
    },
  },
  components: {
    LoginLayout,
    MainLayout,
  },
}
</script>
<style lang="scss">
@import 'assets/index.css';
</style>
