<template>
  <p>Landing</p>
</template>

<script>
export default {
  name: 'Landing',
  created () {
    this.$store.dispatch('project/find')
  }
}
</script>

<style scoped>

</style>
