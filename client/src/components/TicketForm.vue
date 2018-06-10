<template>
  <b-form @submit.prevent="$emit('submit', ticket)">
    <b-form-group label="Name">
      <b-form-input id="name"
                    v-model="ticket.name"
                    required
                    placeholder="Ticketname" />
    </b-form-group>
    <b-form-group label="Description">
      <b-form-textarea id="desc"
                       v-model="ticket.desc"
                       required
                       rows="4"
                       placeholder="Description" />
    </b-form-group>
    <b-form-group label="Status">
      <b-form-select id="status"
                     v-model="ticket.status"
                     :options="options"
                     required />
    </b-form-group>
    <b-form-group label="Assignee">
      <b-form-select id="asignee"
                     v-model="ticket.assigneeId"
                     :options="assigneeOptions" />
    </b-form-group>
    <b-button type="submit"
              variant="primary">
      <span v-if="!ticket._id">Create</span>
      <span v-else>Save</span>
    </b-button>
  </b-form>
</template>

<script>
export default {
  name: 'TicketForm',
  props: {
    ticket: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      options: [
        { text: 'Todo', value: '0' },
        { text: 'Doing', value: '1' },
        { text: 'Done', value: '2' }
      ]
    }
  },
  computed: {
    assigneeOptions () {
      return this.$store.getters['user/list'].map(user => ({
        text: user.username,
        value: user._id
      }))
    }
  }
}
</script>
