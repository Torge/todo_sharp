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
  data () {
    return {
      tickets: [
        {
          id: '3',
          status: '2',
          title: 'Powerpoint erstellen'
        },
        {
          id: '1',
          status: '0',
          title: 'Bootstrap einbinden'
        },
        {
          id: '2',
          status: '1',
          title: 'Seite schick machen'
        }
      ]
    }
  },
  computed: {
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
    moveTicket (event, status) {
      const id = event.dataTransfer.getData('id')
      let ticket = this.tickets.find(ticket => ticket.id === id)
      ticket.status = status
    }
  }
}
</script>

<style scoped>

</style>
