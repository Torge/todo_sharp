<template>
  <div>
    <b-navbar toggleable="md"
              type="dark"
              variant="primary">

      <b-navbar-toggle target="nav_collapse" />

      <b-navbar-brand href="#">ToDo#</b-navbar-brand>

      <b-collapse id="nav_collapse"
                  is-nav>

        <b-navbar-nav>
          <b-nav-item :to="{name: 'project-list'}">Projects</b-nav-item>
          <b-nav-item :to="{name: 'user-list'}">Users</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>{{ user.username }}</em>
            </template>
            <b-dropdown-item :to="{name: 'user-detail', params: {userId: user._id}}">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container class="mt-3">
      <router-view/>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault',
  computed: {
    user () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    logout () {
      this.$store.commit('auth/logout')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped>
</style>
