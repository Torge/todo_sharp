<template>
  <b-card>
    <h2>Projekt: {{ project.name }}</h2>
    <b-btn class="float-right" @click="addTicket" >Ticket anlegen</b-btn>
    <div id="board">
      <board/>
    </div>
  </b-card>
</template>

<script>
import Board from '@/components/Board'

export default {
  name: 'App',
  components: {
    Board
  },
  computed: {
    project () {
      return this.$store.getters['project/current']
    }
  },
  methods: {
    addTicket () {
      return this.$router.push({name: 'ticket-create'})
    }
  }
}
</script>

<style>
    #board {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
