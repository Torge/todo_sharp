<template>
    <b-card draggable @dragstart="$event.dataTransfer.setData('id', ticket.id)" :title="ticket.title">
        {{ ticket }}
    </b-card>
</template>

<script>
  export default {
    name: "ticket",
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