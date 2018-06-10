<template>
  <b-card>
    <p>
      <b>Username:</b> {{ user.username }}
    </p>
    <p>
      <b>Email:</b> {{ user.email }}
    </p>
  </b-card>
</template>

<script>
export default {
  name: 'UserDetail',
  computed: {
    user () {
      return this.$store.getters['user/current']
    }
  }
}
</script>

<style scoped>
</style>
