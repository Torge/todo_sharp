<template>
  <div>
    <b-card class="mt-3">
      Projects
      <b-btn class="float-right"
             variant="primary"
             @click="addProject">Create Project</b-btn>
    </b-card>
    <b-table :items="projects"
             :fields="['name', 'createdAt']"
             striped
             outlined
             responsive
             hover
             @row-clicked="navigate" />
  </div>
</template>

<script>
/**
 * Die Projekt List Seite listet dem Nutzer alle aktuellen Projekte
 * auf und mit Klick auf ein Projekt navigiert man zu dessen Kanban
 * Board
*/
import moment from 'moment'
moment.locale('de')
export default {
  name: 'ProjectList',
  computed: {
    projects () {
      return this.$store.getters['project/list'].map(project => {
        return {
          ...project,
          createdAt: moment(project.createdAt).format('DD.MM.YYYY')
        }
      })
    }
  },
  methods: {
    navigate (project) {
      this.$router.push({
        name: 'project-kanban',
        params: { projectId: project._id }
      })
    },
    addProject () {
      this.$router.push({ name: 'project-create' })
    }
  }
}
</script>

<style scoped>
</style>
