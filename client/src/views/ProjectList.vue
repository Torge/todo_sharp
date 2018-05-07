<template>
  <div>
    <b-card class="mt-3">
      Projekte
      <b-btn class="float-right" variant="primary" @click="addProject">Projekt hinzufügen</b-btn>
    </b-card>
    <b-table
      :items="projects"
      striped
      outlined
      responsive
      hover
      @row-clicked="navigate"
    />
  </div>
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
    },
    addProject () {
      this.$router.push({name: 'project-create'})
    }
  }
}
</script>

<style scoped>

</style>
