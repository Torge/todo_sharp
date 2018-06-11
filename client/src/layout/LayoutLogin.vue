<template>
  <b-container>
    <b-row>
      <b-col sm="6" md="4" offset-md="4">
        <router-view/>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
/**
 * Das Login Layout beinhaltet ausgang für den router für die Login Seite
*/
export default {
  name: 'LayoutLogin'
}
</script>

<style scoped>

</style>
