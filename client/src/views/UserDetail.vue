<template>
  <b-card>
    <h2>Nutzer: {{ users._name }}</h2>
    <b-btn class="float-right" @click="editUser" >Nutzer Bearbeiten</b-btn>
  </b-card>
</template>

<script>

export default {
  name: 'UserDetail',
  computed: {
    users () {
      return this.$store.getters['users/current']
    }
  },
  methods: {
    editUser () {

    }
  }
}
</script>

<style scoped>

</style>
