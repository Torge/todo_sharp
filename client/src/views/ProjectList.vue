<template>
  <b-table
    :items="projects"
    class="mt-3"
    striped
    outlined
    responsive
    hover
    @row-clicked="navigate"
  />
</template>

<script>
export default {
  name: 'ProjectList',
  computed: {
    projects () {
      return this.$store.getters['project/list']
    }
  },
  methods: {
    navigate (project) {
      this.$router.push({name: 'project-kanban', params: {projectId: project._id}})
    }
  }
}
</script>

<style scoped>

</style>
