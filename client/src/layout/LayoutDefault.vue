<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="primary">

      <b-navbar-toggle target="nav_collapse"/>

      <b-navbar-brand href="#">ToDo#</b-navbar-brand>

      <b-collapse id="nav_collapse" is-nav>

        <b-navbar-nav>
          <b-nav-item :to="{name: 'project-list'}" >Projekte</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault'
}
</script>

<style scoped>

</style>
