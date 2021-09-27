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
  name: 'login',
  components: {
    Header,
  },
}
</script>
