<template>
  <div class="login text-center">
    <h2>Todo#</h2>
    <a :href="authLink">
      <b-btn block variant="primary">
        <span v-if="!loginPending">Login via Google</span>
        <span v-else>Logging in...</span>
      </b-btn>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      authLink: process.env.VUE_APP_API_URL + '/connect/google/',
      loginPending: false
    }
  },
  async created () {
    const accessToken = this.$route.query.access_token || this.$route.query.code
    if (accessToken) {
      this.loginPending = true
      await this.$store.dispatch('auth/authenticate', accessToken).then(() => this.$router.push({name: 'project-list'}))
      this.loginPending = false
    }
  },
  methods: {
    test: console.log
  }
}
</script>

<style scoped>
.login {
  width: 340px;
  margin: 50px auto;
  margin-bottom: 15px;
  background: #f7f7f7;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 30px;
}
</style>
