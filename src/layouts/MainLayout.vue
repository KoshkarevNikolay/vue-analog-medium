<template>
  <div>
    <Header />
    <main>
      <router-view />
    </main>
  </div>
</template>
<script>
import Header from '../components/app/Header'
export default {
  name: 'main-layout',
  components: {
    Header,
  },
}
</script>
<style lang="scss">
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1em;
}
</style>
