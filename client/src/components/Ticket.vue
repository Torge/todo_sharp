<template>
  <b-card
    :title="ticket.title"
    draggable
    @dragstart="$event.dataTransfer.setData('id', ticket.id)"
  />
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
