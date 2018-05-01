<template>
  <section>
    <h1>Landing</h1>
    <h2>Projects: </h2>
    <p v-for="project of projects" :key="project._id">{{ project }}</p>
  </section>
</template>

<script>
export default {
  name: 'Landing',
  computed: {
    projects () {
      return this.$store.getters['project/list']
    }
  }
}
</script>

<style scoped>

</style>
