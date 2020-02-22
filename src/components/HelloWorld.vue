<template>
  <div class="hello">
    <div v-for="(line,index) in lines" :key="line+index">{{line}}</div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      lines: []
    }
  },
  methods: {
    ...mapMutations(['introAnimDone'])
  },
  async mounted () {
    const splited = this.msg.split('\n')
    for (const line of splited) {
      await new Promise(resolve => setTimeout(resolve, 500))
      this.lines.push(line)
    }
    await new Promise(resolve => setTimeout(resolve, 500))
    this.introAnimDone()
  }
}
</script>

<style scoped>
.hello {
  font-family: "JetBrains Mono";
  font-size: 16px;
  line-height: 1.65;
  margin-bottom: 24px;
}
</style>
