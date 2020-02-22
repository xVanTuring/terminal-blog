<template>
  <div>
    <pre class="terminal-char" :style="{fontFamily:fontFamily,fontSize:fontSize}">{{prependChar}}</pre>
    <span v-if="!isPassword">
      <span
        v-for="(char,index) in input"
        :key="index+char"
        class="terminal-char"
        :class="{'active':!isSuffix && index === cursorIndex,'blinking':!isSuffix && index === cursorIndex&&shouldBlink}"
        :style="blockSpanStyle"
      >{{char}}</span>
    </span>
    <span
      v-if="isSuffix"
      class="terminal-char active"
      :class="{blinking:shouldBlink}"
      :style="blockSpanStyle"
    ></span>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {}
  },
  methods: {},
  computed: {
    ...mapState({
      cursorIndex: state => state.editing.cursorIndex,
      input: state => state.editing.input,
      shouldBlink: state => state.editing.shouldBlink,
      fontFamily: state => state.style.fontFamily,
      fontSize: state => state.style.fontSize
    }),
    ...mapGetters(['isSuffix', 'blockSpanStyle', 'prependChar', 'isPassword'])
  },
  mounted () {}
}
</script>

<style scoped>
.terminal-char {
  vertical-align: top;
  display: inline-block;
}

@keyframes blink-cursor {
  50% {
    box-shadow: 1px 0 0 #cccccc inset;
  }
  from,
  to {
    box-shadow: 1px 0 0 transparent inset;
  }
}
.blinking {
  animation: blink-cursor 1.5s step-end infinite;
}
.terminal-char.active {
  box-shadow: 1px 0 0 #cccccc inset;
  height: 20px;
}
pre {
  margin: 0;
}
</style>
