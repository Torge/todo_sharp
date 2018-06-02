<template>
  <b-card title="Create new Ticket">
    <b-form @submit.prevent="createTicket">
      <b-form-group>
        <b-form-input id="name"
                      v-model="ticket.name"
                      required
                      placeholder="Ticketname"
        />
        <b-form-input id="desc"
                      v-model="ticket.desc"
                      required
                      placeholder="Description"
        />
        <b-form-radio-group id="status"
                            v-model="ticket.status"
                            required
                            :options="options"/>
      </b-form-group>
      <b-button type="submit" variant="primary">Create</b-button>
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
        { text: 'Todo', value: '1', },
        { text: 'Doing', value: '2' },
        { text: 'Done', value: '3'}
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
