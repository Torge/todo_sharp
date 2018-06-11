<template>
  <div>
    <b-card class="mt-3">
      Nutzer
    </b-card>
    <b-table
      :items="users"
      :fields="['email', 'username']"
      striped
      outlined
      responsive
      hover
      @row-clicked="navigate"
    />
  </div>
</template>

<script>
/**
 * Die User List Seite zeigt die Nuter und hierrüber kann man
 * zu der User Detail Seite navigieren
*/
export default {
  name: 'UserList',
  computed: {
    users () {
      return this.$store.getters['user/list']
    }
  },
  methods: {
    navigate (users) {
      this.$router.push({name: 'user-detail', params: {userId: users._id}})
    }
  }
}
</script>

<style scoped>

</style>
