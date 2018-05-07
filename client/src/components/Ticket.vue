<template>
  <b-card
    :title="ticket.name"
    draggable
    @dragstart="$event.dataTransfer.setData('id', ticket._id)"
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
