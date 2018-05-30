<template>
  <b-card title="Create new Ticket">
    <b-form @submit.prevent="createTicket">
      <b-form-group>
        <b-form-input id="name"
                      v-model="ticket.name"
                      required
                      placeholder="Name des Tickets"
        />
        <b-form-input id="info"
                      v-model="ticket.info"
                      required
                      placeholder="Beschreibung"
        />
        <select id="status"
                v-model="ticket.status"
                required
                placeholder="Status">
          <option value="" disabled selected>Select Ticket Status</option>
          <option value="todo">ToDo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </b-form-group>
      <b-button type="submit" variant="primary">Create</b-button>
    </b-form>
  </b-card>
</template>

<script>
export default {
  name: 'TicketCreate',
  data () {
    return {
      ticket: {
        name: '',
        info: '',
        status: ''
      }
    }
  },
  methods: {
    async createTicket () {
      const projectId = this.$store.getters['project/current']._id;
      await this.$store.dispatch('ticket/create', {
        ...this.ticket,
        project: projectId,
        status: '0'
      })
      await this.$router.push({name: 'project-kanban', params: {projectId}})
    }
  }
}
</script>

<style scoped>

</style>
