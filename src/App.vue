<template>
  <div id="app">
    <b-row>
      <lane title="Todo" :tickets="todoTickets" @moveTicket="moveTicket($event, '0')"/>
      <lane title="Doing" :tickets="doingTickets" @moveTicket="moveTicket($event, '1')"/>
      <lane title="Done" :tickets="doneTickets" @moveTicket="moveTicket($event, '2')"/>
    </b-row>
  </div>
</template>

<script>
import Lane from '@/components/Lane'

export default {
  name: 'app',
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
  methods: {
    moveTicket (event, status) {
      const id = event.dataTransfer.getData('id')
      let ticket = this.tickets.find(ticket => ticket.id === id)
      ticket.status = status
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
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
