<template>
  <b-card draggable
          @dragstart="$event.dataTransfer.setData('id', ticket._id)">
    <h3>{{ ticket.name }}
      <router-link :to="{name: 'ticket-detail', params: {ticketId: ticket._id}}">🔍</router-link>
    </h3>
    {{ ticket.desc }}
  </b-card>
</template>

<script>
export default {
  name: 'Ticket',
  props: {
    ticket: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
