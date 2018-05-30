<template>
  <div>
    <b-card class="mt-3">
      Nutzer
    </b-card>
    <b-table
      :items="users"
      striped
      outlined
      responsive
      hover
      @row-clicked="navigate"
    />
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data () {
    return {
      user: {
        id: '',
        name: '',
        email: ''
      }
    }
  },
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
