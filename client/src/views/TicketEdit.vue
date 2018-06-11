<template>
  <ticket-form :ticket="ticket"
               @submit="patchTicket" />
</template>

<script>
/**
 * Die Ticket Create Seite bindet das TicketForm ein
 * und schickt die Daten bei abschluss über den Store
 * an den Server um die das Ticket zu patchen
*/
import TicketForm from '@/components/TicketForm'
export default {
  name: 'TicketEdit',
  components: {
    TicketForm
  },
  computed: {
    ticket () {
      return this.$store.getters['ticket/getCopy']
    }
  },
  methods: {
    async patchTicket (ticket) {
      await this.$store.dispatch('ticket/patch', [ticket._id, ticket])
      this.$router.push({
        name: 'ticket-detail',
        params: { projectId: ticket.projectId }
      })
    }
  }
}
</script>

<style scoped>
</style>
