<template>
  <div>
    <b-card>
      <div>
        <b-progress :value="counter" :max="max" show-progress animated/>
        <b-progress :max="max"
                    class="mt-1"
                    show-value>
          <b-progress-bar :value="counter*(6/10)" variant="success"/>
          <b-progress-bar :value="counter*(2.5/10)" variant="warning"/>
          <b-progress-bar :value="counter*(1.5/10)" variant="danger"/>
        </b-progress>
        <b-btn class="mt-4" @click="clicked">Click me</b-btn>
      </div>
    </b-card>
  </div>

</template>

<script>
export default {
  data () {
    return {
      counter: 45,
      max: 100
    }
  },
  methods: {
    clicked () {
      this.counter = Math.random() * this.max
      console.log('Change progress to ' +
        Math.round(this.counter * 100) / 100)
    }
  }
}
</script>

<!-- progress-1.vue -->
