<template>
  <div>
    <b-card class="mt-3">
      Projects
      <b-btn class="float-right" variant="primary" @click="addProject">Create Project</b-btn>
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
import moment from 'moment'
moment.locale('de')
export default {
  name: 'ProjectList',
  computed: {
    projects () {
      return this.$store.getters['project/list'].map(({name, createdAt, selectedAdmin}) => {
        return {
          name,
          createdAt: moment(createdAt).format('DD.MM.YYYY'),
          selectedAdmin
        }
      })
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
