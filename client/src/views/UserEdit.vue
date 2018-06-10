<template>
  <b-card>
    <b-form @submit.prevent="saveUser">
      <b-form-group id="username-group"
                    label="Username"
                    label-for="username">
        <b-form-input id="username"
                      v-model="user.username"
                      required
                      placeholder="Enter username" />
      </b-form-group>
      <b-form-group id="email-group"
                    label="Email"
                    label-for="email">
        <b-form-input id="email"
                      v-model="user.email"
                      type="email"
                      required
                      placeholder="Enter email" />
      </b-form-group>
      <b-button type="submit"
                variant="primary">Save</b-button>

    </b-form>
  </b-card>
</template>

<script>
export default {
  name: 'UserEdit',
  computed: {
    user () {
      return this.$store.getters['user/getCopy']
    }
  },
  methods: {
    async saveUser () {
      await this.$store.dispatch('user/patch', [this.user._id, this.user])
      await this.$router.push({
        name: 'user-detail',
        params: { userId: this.user._id }
      })
    }
  }
}
</script>

<style scoped>
</style>
