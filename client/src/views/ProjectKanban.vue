<template>
  <div>
    <b-card v-if="project">
      <div class="float-left">
        <p>Project: {{ project.name }}</p>
        <b-btn variant="primary"
               @click="addTicket">Create Ticket</b-btn>
        <b-btn variant="primary"
               @click="showInsights">Project Insights</b-btn>
      </div>
      <div class="float-right">
        <p>Admin: {{ admin.username }}</p>
        <b-btn v-if="project.adminId === user._id"
               class="float-right"
               variant="danger"
               @click="deleteProject">Delete Project</b-btn>
      </div>
    </b-card>
    <b-card>
      <div id="board">
        <board/>
      </div>
    </b-card>
  </div>
</template>

<script>
import Board from '@/components/Board'
/**
 * Die Projekt Kanban Seite zeigt die Informationen zu dem Projekt an
 * und bindet das Board zu dem Projekt ein
*/
export default {
  name: 'KanbanBoard',
  components: {
    Board
  },
  computed: {
    project () {
      return this.$store.getters['project/current']
    },
    admin () {
      return this.$store.getters['user/get'](this.project.adminId)
    },
    user () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    addTicket () {
      return this.$router.push({
        name: 'ticket-create',
        params: { projectId: this.project._id }
      })
    },
    showInsights () {
      return this.$router.push({
        name: 'project-insights',
        params: { projectId: this.project._id }
      })
    },
    async deleteProject () {
      await this.$store.dispatch('project/remove', this.project._id)
      await this.$router.push({ name: 'project-list' })
    }
  }
}
</script>

<style>
.todoCard {
  background-color: #b21f2d;
}
.doingCard {
  background-color: #ffc107;
}
.doneCard {
  background-color: #34ce57;
}
#board {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
