<template>
  <a :href="authLink">
    <b-btn>Login</b-btn>
  </a>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      authLink: process.env.VUE_APP_API_URL + '/connect/google/'
    }
  },
  created () {
    const accessToken = this.$route.query.access_token || this.$route.query.code
    if (accessToken) {
      this.$store.dispatch('auth/authenticate', accessToken).then(() => this.$router.push({name: 'landing'}))
    }
  },
  methods: {
    test: console.log
  }
}
</script>

<style scoped>

</style>
