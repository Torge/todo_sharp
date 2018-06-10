<template>
  <b-card title="Create new Ticket">
    <b-form @submit.prevent="createTicket">
      <b-form-group>
        <b-form-input id="name"
                      v-model="ticket.name"
                      required
                      placeholder="Ticketname"
        />
        <b-form-textarea id="desc"
                         v-model="ticket.desc"
                         required
                         rows="4"
                         placeholder="Description"
        />
        <b-form-select
          id="status"
          v-model="ticket.status"
          :options="options"
          required
        />
        <b-button type="submit" variant="primary">Create</b-button>
      </b-form-group>
    </b-form>
  </b-card>
</template>

<script>
export default {
  name: 'TicketCreate',
  data () {
    return {
      ticket: {
        name: '',
        desc: '',
        status: ''
      },
      options: [
        { text: 'Todo', value: 'todo' },
        { text: 'Doing', value: 'doing' },
        { text: 'Done', value: 'done' }
      ]
    }
  },
  methods: {
    async createTicket () {
      const projectId = this.$store.getters['project/current']._id
      await this.$store.dispatch('ticket/create', {
        ...this.ticket,
        projectId: projectId,
        status: '0'
      })
      await this.$router.push({name: 'project-kanban', params: {projectId}})
    }
  }
}
</script>

<style scoped>

</style>
