<template>
  <b-btn @click="$store.dispatch('login')">Login</b-btn>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    test: console.log
  }
}
</script>

<style scoped>

</style>
