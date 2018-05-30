<template>
  <b-row>
    <lane
      :tickets="todoTickets"
      title="Todo"
      @moveTicket="moveTicket($event, '0')"/>
    <lane
      :tickets="doingTickets"
      title="Doing"
      @moveTicket="moveTicket($event, '1')"/>
    <lane
      :tickets="doneTickets"
      title="Done"
      @moveTicket="moveTicket($event, '2')"/>
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
    tickets () {
      return this.$store.getters['ticket/list'].filter(ticket => ticket.project._id === this.project._id)
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
      await this.$store.dispatch('ticket/patch', [id, {status}])
    }
  }
}
</script>

<style scoped>

</style>
