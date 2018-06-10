<template>
  <div>
    <b-card>
      <div>
        <b-progress :value="counter" :max="max" show-progress animated/>
        <b-progress :max= "tickets.length"
                    class="mt-1"
                    show-value>
          <b-progress-bar :value= "todoTickets.length" variant="success"/>
          <b-progress-bar :value= "doingTickets.length" variant="warning"/>
          <b-progress-bar :value= "doneTickets.length" variant="danger"/>
        </b-progress>
        <b-btn class="mt-4" @click="clicked">Click me</b-btn>
      </div>
    </b-card>
  </div>

</template>

<script>
export default {
  data () {
    return {
      counter: 45,
      max: 100
    }
  },
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
  },
  methods: {
    clicked () {
      this.counter = Math.random() * this.max
      console.log('Change progress to ' +
        Math.round(this.counter * 100) / 100)
    }
  }
}
</script>

<!-- progress-1.vue -->
