<template>
  <b-card title="Create new Ticket">
    <b-form @submit.prevent="createTicket">
      <b-form-group>
        <b-form-input id="name"
                      v-model="ticket.name"
                      required
                      placeholder="Ticketname" />
        <b-form-textarea id="desc"
                         v-model="ticket.desc"
                         required
                         rows="4"
                         placeholder="Description" />
        <b-form-select id="status"
                       v-model="ticket.status"
                       :options="options"
                       required />
        <b-button type="submit"
                  variant="primary">Create</b-button>
      </b-form-group>
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
        desc: '',
        status: ''
      },
      options: [
        { text: 'Todo', value: '0' },
        { text: 'Doing', value: '1' },
        { text: 'Done', value: '2' }
      ]
    }
  },
  methods: {
    async createTicket () {
      const projectId = this.$route.params.projectId
      const authorId = this.$store.state.auth.user._id
      this.ticket.history = [
        {
          type: 'created',
          userId: authorId,
          status: this.ticket.status,
          timestamp: new Date()
        }
      ]
      await this.$store.dispatch('ticket/create', {
        ...this.ticket,
        projectId: projectId,
        authorId
      })
      await this.$router.push({ name: 'project-kanban', params: { projectId } })
    }
  }
}
</script>

<style scoped>
</style>
