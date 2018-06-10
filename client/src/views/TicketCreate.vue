<template>
  <b-card title="Create new Ticket">
    <ticket-form :ticket="ticket"
                 @submit="createTicket" />
  </b-card>
</template>

<script>
import TicketForm from '@/components/TicketForm'
export default {
  name: 'TicketCreate',
  components: {
    TicketForm
  },
  data () {
    return {
      ticket: {
        name: '',
        desc: '',
        status: '0'
      }
    }
  },
  methods: {
    async createTicket (ticket) {
      const projectId = this.$route.params.projectId
      const authorId = this.$store.state.auth.user._id
      ticket.history = [
        {
          type: 'created',
          userId: authorId,
          status: ticket.status,
          timestamp: new Date()
        }
      ]
      await this.$store.dispatch('ticket/create', {
        ...ticket,
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
