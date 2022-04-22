<template>
  <div id="app">
    <guess></guess>
  </div>
</template>

<script>
import Guess from './components/Guess.vue';

export default {
  components: {
    'guess': Guess
  },
  
  
  name: 'app',
  data () {
    return {
      
    }
  }
}
</script>

<style>

</style>
