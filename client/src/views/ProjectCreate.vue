<template>
  <b-card title="Create new Project">
    <b-form @submit.prevent="createProject">
      <b-form-group>
        <b-form-input id="name"
                      v-model="project.name"
                      required
                      placeholder="Project Name"
        />
        <select v-model="project.adminId">
          <option value="" disabled selected>Select Project Admin</option>
          <option v-for="user of users" :key="user.id" :value="user._id">{{ user.username }}</option>
        </select>
      </b-form-group>
      <b-button type="submit" variant="primary">Create</b-button>
    </b-form>
  </b-card>
</template>

<script>
/**
 * Die Projekt Erstellen Seite nimmt die Nutzerdaten entgegen
 * und schickt diese über den Store an den Server
*/
export default {
  name: 'ProjectCreate',
  data () {
    return {
      project: {
        name: '',
        adminId: ''
      }
    }
  },
  computed: {
    users () {
      return this.$store.getters['user/list']
    }
  },
  methods: {
    async createProject () {
      let project = await this.$store.dispatch('project/create', this.project)
      this.$router.push({name: 'project-kanban', params: {projectId: project._id}})
    }
  }
}
</script>

<style scoped>

</style>
