<template>
  <b-col
    sm="4"
    @dragover.prevent
    @drop="$emit('moveTicket', $event)">
    <h1>{{ title }}</h1>
    <ticket
      v-for="ticket of tickets"
      :key="ticket.id"
      :ticket="ticket"/>
  </b-col>
</template>

<script>
/**
 * Die Lane KOmponente hält die Tickets und gibt das drop event an das Board weiter
*/
import Ticket from '@/components/Ticket'
export default {
  name: 'Lane',
  components: {
    Ticket
  },
  props: {
    title: {
      type: String,
      required: true
    },
    tickets: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>

</style>
