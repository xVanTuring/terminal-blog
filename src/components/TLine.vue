<template>
  <div>
    <pre
      class="terminal-char"
      :style="charStyle"
    >{{line}}</pre>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },
  props: {
    line: {
      default: '',
      type: String
    }
  },
  methods: {
  },
  computed: {
    ...mapGetters(['charStyle'])
  }
}
</script>

<style scoped>
.terminal-char {
  vertical-align: top;
  display: inline-block;
  height: 100%;
  font-size: 16px;
}
pre{
  margin: 0;
}
</style>
