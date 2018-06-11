<template>
  <b-card title="Create new Ticket">
    <ticket-form :ticket="ticket"
                 @submit="createTicket" />
  </b-card>
</template>

<script>
/**
 * Die Ticket Create Seite bindet das TicketForm ein
 * und schickt die Daten bei abschluss über den Store
 * an den Server um das Ticket zu erstellen
*/
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
