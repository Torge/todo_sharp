<template>
  <b-row>
    <lane :tickets="todoTickets"
          title="Todo"
          @moveTicket="moveTicket($event, '0')" />
    <lane :tickets="doingTickets"
          title="Doing"
          @moveTicket="moveTicket($event, '1')" />
    <lane :tickets="doneTickets"
          title="Done"
          @moveTicket="moveTicket($event, '2')" />
  </b-row>
</template>

<script>
import Lane from '@/components/Lane'
export default {
  name: 'Board',
  components: {
    Lane
  },
  computed: {
    project () {
      return this.$store.getters['project/current']
    },
    user () {
      return this.$store.state.auth.user
    },
    tickets () {
      return this.$store.getters['ticket/list'].filter(
        ticket => ticket.projectId === this.project._id
      )
    },
    todoTickets () {
      return this.tickets.filter(ticket => ticket.status === '0')
    },
    doingTickets () {
      return this.tickets.filter(ticket => ticket.status === '1')
    },
    doneTickets () {
      return this.tickets.filter(ticket => ticket.status === '2')
    }
  },
  methods: {
    async moveTicket (event, status) {
      const id = event.dataTransfer.getData('id')
      const ticket = this.$store.getters['ticket/get'](id)
      ticket.history.push({
        type: 'move',
        userId: this.user._id,
        fromStatus: ticket.status,
        toStatus: status,
        timestamp: new Date()
      })
      ticket.status = status
      await this.$store.dispatch('ticket/patch', [id, ticket])
    }
  }
}
</script>

<style scoped>
</style>
