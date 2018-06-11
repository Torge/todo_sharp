<template>
  <div>
    <b-card title="Project Insights">
      <p>Project: {{ project.name }}</p>
    </b-card>
    <b-card>
      <div v-for="bar in bars" :key="bar.label" class="row mb-1">
        <div class="col-sm-2">{{ bar.label }}</div>
        <div class="col-sm-10 pt-1">
          <b-progress :value="bar.value"
                      :variant="bar.variant"
                      :max="tickets.length"
                      show-value
          />
        </div>
      </div>
    </b-card>
  </div>

</template>

<script>
/**
 * Die Projekt Insights geben einen Überblick über den Status des
 * Projektes mithilfe von Progressbars die zeigen wieviele Tickets
 * sich in welchem Status befinden
*/
export default {
  computed: {
    project () {
      return this.$store.getters['project/current']
    },
    tickets () {
      return this.$store.getters['ticket/list'].filter(ticket => ticket.projectId === this.project._id)
    },
    todoTickets () {
      return this.tickets.filter(ticket => ticket.status === '0')
    },
    doingTickets () {
      return this.tickets.filter(ticket => ticket.status === '1')
    },
    doneTickets () {
      return this.tickets.filter(ticket => ticket.status === '2')
    },
    bars () {
      return [
        {
          label: 'Tickets:',
          value: this.tickets.length,
          variant: 'primary'
        },
        {
          label: 'Todo:',
          value: this.todoTickets.length,
          variant: 'danger'
        },
        {
          label: 'Doing:',
          value: this.doingTickets.length,
          variant: 'warning'
        },
        {
          label: 'Done:',
          value: this.doneTickets.length,
          variant: 'success'
        }
      ]
    }

  }
}

</script>
