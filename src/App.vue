<template>
  <div id="app">
    <div id="terminal">
      <div v-if="introAnimDone">
        <TLine v-for="(line,index) in history"
          :key="line+index"
          :line="line"></TLine>
      </div>
      <TInput v-if="isIntroAnimDone"></TInput>
    </div>
  </div>
</template>

<script>
import TInput from './components/TInput'
import TLine from './components/TLine'
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      welcome: 'Welcome to xVan\'s Blog.\nDefault user is guest:guest.\nAnd You might want a little bit of `help`!'
    }
  },
  components: { TInput, TLine },
  computed: {
    ...mapState(['history', 'isIntroAnimDone', 'system', 'loaded'])
  },
  methods: {
    ...mapActions(['onKeyDown']),
    ...mapMutations(['introAnimDone', 'pushLine'])
  },
  watch: {
    async loaded (newVal) {
      if (newVal) {
        await new Promise(resolve => setTimeout(resolve, 500))
        if (!this.system.user) {
          const splited = this.welcome.split('\n')
          for (const line of splited) {
            await new Promise(resolve => setTimeout(resolve, 200))
            this.pushLine(line)
            this.pushLine(' ')
          }
        }
        this.introAnimDone()
        window.addEventListener('keydown', this.onKeyDown)
      }
    }
  },
  mounted () {

  },
  beforeMount () {
    window.removeEventListener('keydown', this.onKeyDown)
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
}
#terminal {
  color: #839496;
  background-color: #002B36;
  height: calc(100% - 16px);
  padding: 8px;
}

</style>
