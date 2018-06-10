<template>
  <ticket-form :ticket="ticket"
               @submit="patchTicket" />
</template>

<script>
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
