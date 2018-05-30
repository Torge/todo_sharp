<template>
  <b-card v-if="ticket">
    <h2 class="float-left">Ticket: {{ ticket }}</h2>

    <b-btn class="float-left" @click="deleteTicket" >Delete Ticket</b-btn>
  </b-card>
</template>

<script>
export default {
  name: 'TicketDetail',
  computed: {
    ticket () {
      return this.$store.getters['ticket/current']
    }
  },
  methods: {
    async deleteTicket () {
      await
      this.$store.dispatch('ticket/remove', this.ticket.id)
      await this.$router.push({name: 'project-kanban', params: {projectId: this.$store.project.currentId}})
    }
  }
}
</script>

<style scoped>

</style>
