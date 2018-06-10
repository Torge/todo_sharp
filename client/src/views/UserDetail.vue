<template>
  <b-card>
    <p>
      <b>Username:</b> {{ user.username }}
    </p>
    <p>
      <b>Email:</b> {{ user.email }}
    </p>
    <b-btn :to="{name: 'user-edit', params: {userId: user._id}}"
           class="float-right">
      Nutzer Bearbeiten
    </b-btn>
  </b-card>
</template>

<script>
export default {
  name: 'UserDetail',
  computed: {
    user () {
      return this.$store.getters['user/current']
    }
  },
  methods: {
    editUser () {}
  }
}
</script>

<style scoped>
</style>
