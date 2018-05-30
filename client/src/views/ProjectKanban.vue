<template>
  <b-card v-if="project">
    <p></p>
    <h2  class="float-left">Project: {{ project.name }}</h2>
    <h2 class="float-right">Admin: {{project.selectedAdmin}}</h2>

    <b-btn class="float-left deleteBtn" @click="deleteProject" >Delete Project</b-btn>
    <b-btn class="float-right createBtn" @click="addTicket" >Create Ticket</b-btn>
    <div id="board">
      <board/>
    </div>
  </b-card>
</template>

<script>
  import Board from '@/components/Board'

  export default {
    name: 'KanbanBoard',
    components: {
      Board
    },
    computed: {
      project () {
        return this.$store.getters['project/current']
      }
    },
    methods: {
      addTicket () {
        return this.$router.push({name: 'ticket-create'})
      },
      async deleteProject(){
        await
          this.$store.dispatch('project/remove', this.project._id);
        await this.$router.push({name: 'project-list'})
      }
    }
  }
</script>

<style>
  .createBtn {
    background-color: #007bff;
  }
  .deleteBtn {
    background-color: #b21f2d;
  }
  .todoCard {
    background-color: #b21f2d;
  }
  .doingCard{
    background-color: #ffc107;
  }
  .doneCard{
    background-color: #34ce57;
  }
  #board {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
