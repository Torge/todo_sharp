<template>
  <p>Landing</p>
</template>

<script>
export default {
  name: 'Landing',
  created () {
    this.$store.dispatch('project/find').then(console.log)
  }
}
</script>

<style scoped>

</style>
