<template>
  <div>
    <b-card>
      <div>
        <b-progress-bar :value= "tickets.length" :max= "tickets.length" class="mt-1" show-value animated/>
        <b-progress :max= "tickets.length"
                    class="mt-1"
                    show-value>
          <b-progress-bar :value= "todoTickets.length" variant="success"/>
          <b-progress-bar :value= "doingTickets.length" variant="warning"/>
          <b-progress-bar :value= "doneTickets.length" variant="danger"/>
        </b-progress>
      </div>
    </b-card>
  </div>

</template>

<script>
export default {
  computed: {
    project () {
      return this.$store.getters['project/current']
    },
    tickets () {
      return this.$store.getters['ticket/list'].filter(ticket => ticket.projectId === this.project._id)
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
  }
}

</script>
