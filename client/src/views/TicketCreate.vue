<template>
  <b-card title="Ticket anlegen">
    <b-form @submit.prevent="createTicket">
      <b-form-group>
        <b-form-input id="name"
                      v-model="ticket.name"
                      required
                      placeholder="Name des Tickets"
        />
      </b-form-group>
      <b-button type="submit" variant="primary">Erstellen</b-button>
    </b-form>
  </b-card>
</template>

<script>
export default {
  name: 'TicketCreate',
  data () {
    return {
      ticket: {
        name: ''
      }
    }
  },
  methods: {
    async createTicket () {
      const projectId = this.$store.getters['project/current']._id
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
