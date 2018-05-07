<template>
  <b-card title="Projekt anlegen">
    <b-form @submit.prevent="createProject">
      <b-form-group>
        <b-form-input id="name"
                      v-model="project.name"
                      required
                      placeholder="Name des Projekts"
        />
      </b-form-group>
      <b-button type="submit" variant="primary">Erstellen</b-button>
    </b-form>
  </b-card>
</template>

<script>
export default {
  name: 'ProjectCreate',
  data () {
    return {
      project: {
        name: ''
      }
    }
  },
  methods: {
    async createProject () {
      let project = await this.$store.dispatch('project/create', this.project)
      console.log(this.project, project)
      this.$router.push({name: 'project-kanban', params: {projectId: project._id}})
    }
  }
}
</script>

<style scoped>

</style>
