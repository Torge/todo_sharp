<template>
  <section v-if="ticket">
    <b-card title="Ticket">
      <p>
        <b>Name:</b> {{ ticket.name }}
      </p>
      <p>
        <b>Description:</b> {{ ticket.desc }}
      </p>
      <p>
        <b>Author:</b>
        <span v-if="author"> {{ author.username }}</span>
      </p>
      <p>
        <b>Assignee:</b>
        <span v-if="assignee"> {{ assignee.username }}</span>
      </p>

      <b-btn class="float-left"
             variant="success"
             @click="assignMyself">
        Assign Myself
      </b-btn>
      <b-btn class="float-left"
             variant="primary"
             @click="editTicket">
        Edit Ticket
      </b-btn>
      <b-btn class="float-left"
             variant="primary"
             @click="$router.push({name: 'project-kanban', params: {projectId: project._id}})">
        Back
      </b-btn>
      <b-btn v-if="user._id === ticket.authorId || user._id === project.adminId"
             class="float-left"
             variant="danger"
             @click="deleteTicket">
        Delete Ticket
      </b-btn>
    </b-card>
    <b-card title="History">
      <b-list-group>
        <b-list-group-item v-for="(event, index) of ticket.history"
                           :key="index">{{ parseEvent(event) }}</b-list-group-item>
      </b-list-group>
    </b-card>
  </section>

</template>

<script>
/**
 * Die Ticket Detail Seite zeigt die Informationen zu den Ticket
 * und hier kann der Admin des Projekts oder der Author des Tickets
 * das Ticket löschen
 * Weitere Aktionen wie das Ticket bearbeiten oder sich selbst zu dem
 * Ticket assignen ist über die Buttons möglich
*/
import moment from 'moment'
export default {
  name: 'TicketDetail',
  computed: {
    ticket () {
      return this.$store.getters['ticket/getCopy']
    },
    user () {
      return this.$store.state.auth.user
    },
    project () {
      return this.$store.getters['project/get'](this.ticket.projectId)
    },
    author () {
      return this.$store.getters['user/get'](this.ticket.authorId)
    },
    assignee () {
      return this.$store.getters['user/get'](this.ticket.assigneeId)
    }
  },
  methods: {
    async deleteTicket () {
      const projectId = this.ticket.projectId
      await this.$store.dispatch('ticket/remove', this.ticket._id)
      await this.$router.push({
        name: 'project-kanban',
        params: { projectId }
      })
    },
    async assignMyself () {
      this.ticket.assigneeId = this.user._id
      this.ticket.history.push({
        type: 'assign',
        userId: this.user._id,
        assigneeId: this.user._id,
        timestamp: new Date()
      })
      await this.$store.dispatch('ticket/patch', [this.ticket._id, this.ticket])
    },
    editTicket () {
      this.$router.push({
        name: 'ticket-edit',
        params: { ticketId: this.ticket._id }
      })
    },
    parseEvent (event) {
      let user = this.$store.getters['user/get'](event.userId)
      let timestamp = moment(event.timestamp).format('DD.MM.YYYY HH:mm')
      let statusMap = ['Todo', 'Doing', 'Done']
      switch (event.type) {
        case 'created':
          return `${timestamp}: Created by ${user.username} with status "${
            statusMap[event.status]
          }"`
        case 'move':
          return `${timestamp}: Moved by ${user.username} from "${
            statusMap[event.fromStatus]
          }" to "${statusMap[event.toStatus]}"`
        case 'assign':
          let assignee = this.$store.getters['user/get'](event.assigneeId)
          return `${timestamp}: ${user.username} assigned ${
            assignee.username
          } to this Ticket`
      }
    }
  }
}
</script>

<style scoped>
</style>
