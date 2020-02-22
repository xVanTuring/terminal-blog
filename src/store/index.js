import Vue from 'vue'
import Vuex from 'vuex'
import { SpecialKeys } from '../Utils'
// eslint-disable-next-line no-unused-vars
import programs from '../Programs'
Vue.use(Vuex)
let blinkTimeOut = null
export default new Vuex.Store({
  state: {
    editing: {
      input: [],
      cursorIndex: 0,
      shouldBlink: true
    },
    style: {
      fontFamily: 'JetBrains Mono',
      fontSize: 16
    },
    history: [],
    system: {
      user: '',
      cwd: '',
      login: ''
    },
    isIntroAnimDone: false
  },
  mutations: {
    appendChar (state, payload) {
      const { key } = payload
      state.editing.input.splice(state.editing.cursorIndex, 0, key)
      state.editing.cursorIndex += 1
    },
    BackspaceDelete (state) {
      if (state.editing.cursorIndex > 0 && state.editing.cursorIndex === state.editing.input.length) {
        state.editing.input.splice(state.editing.cursorIndex - 1, 1)
      } else {
        state.editing.input.splice(state.editing.cursorIndex, 1)
      }
      const index = state.editing.cursorIndex - 1
      if (index < 0) {
        state.editing.cursorIndex = 0
      } else {
        state.editing.cursorIndex = index
      }
    },
    Delete (state) {
      state.editing.input.splice(state.editing.cursorIndex, 1)
    },
    moveLeft (state) {
      state.editing.cursorIndex = state.editing.cursorIndex - 1 < 0 ? 0 : state.editing.cursorIndex - 1
    },
    moveRight (state) {
      state.editing.cursorIndex = state.editing.cursorIndex + 1 > state.editing.input.length
        ? state.editing.input.length
        : state.editing.cursorIndex + 1
    },
    setBlink (state, blink) {
      state.editing.shouldBlink = blink
    },
    Enter (state, prependChar) {
      if (state.system.user === '') {
        programs.__login(state, prependChar)
      } else {
        const commandArr = state.editing.input.join('').split(' ')
        if (commandArr.length === 0 || commandArr[0] === '') {
          programs.__empty(state, prependChar)
        } else {
          const command = commandArr[0]
          const exec = programs[command]

          const input = state.editing.input.join('') // pre
          state.history.push(prependChar + input)

          if (exec && !command.startsWith('__')) {
            exec(state, commandArr)
          } else {
            programs.__na(state, commandArr)
          }
        }
      }
      state.editing.input = [] // post
      state.editing.cursorIndex = 0
    },
    introAnimDone (state) {
      state.isIntroAnimDone = true
    },
    pushLine (state, line) {
      state.history.push(line)
    }
  },
  actions: {
    onKeyDown (context, event) {
      const printable = !event.altKey && !event.ctrlKey && !event.metaKey
      switch (event.keyCode) {
        case SpecialKeys.Tab:
          event.preventDefault()
          break
        case SpecialKeys.Backspace:
          context.commit('BackspaceDelete')
          break
        case SpecialKeys.Delete:
          context.commit('Delete')
          break
        case SpecialKeys.Left:
          context.commit('moveLeft')
          break
        case SpecialKeys.End:
          break
        case SpecialKeys.Home:
          break
        case SpecialKeys.Right:
          context.commit('moveRight')
          break
        case SpecialKeys.Shift:
        case SpecialKeys.Control:
          event.preventDefault()
          return
        case SpecialKeys.Enter:
          context.commit('Enter', context.getters.prependChar)
          break
        default:
          if (printable) {
            context.commit('appendChar', {
              key: event.key
            })
          }
          break
      }
      context.commit('setBlink', false)
      clearTimeout(blinkTimeOut)
      blinkTimeOut = setTimeout(() => {
        context.commit('setBlink', true)
      }, 1000)
    }
  },
  modules: {
  },
  getters: {
    charWidth: (state) => {
      if (window._measureCanvas == null) {
        window._measureCanvas = document.createElement('canvas')
      }
      const canvas = window._measureCanvas
      const ctx = canvas.getContext('2d')
      ctx.font = `${state.style.fontSize}px ${state.style.fontFamily}`
      const text = ctx.measureText('x')
      return text.width
    },
    isSuffix: (state) => {
      return state.editing.cursorIndex === state.editing.input.length
    },
    blockSpanStyle: (state, getter) => {
      return {
        fontSize: `${state.style.fontSize}px`,
        fontFamily: `${state.style.fontFamily}`,
        width: `${getter.charWidth}px`
      }
    },
    charStyle: (state) => {
      return {
        fontSize: `${state.style.fontSize}px`,
        fontFamily: `${state.style.fontFamily}`
      }
    },
    prependChar: (state) => {
      if (state.system.login !== '') {
        return 'Password: '
      }
      if (state.system.user === '') {
        return 'xVan-Blog Login: '
      }
      return `[${state.system.user}@xVan-Blog ${state.system.cwd}]$ `
    },
    isPassword: (state) => {
      return state.system.login !== '' && state.system.user === ''
    }
  }
})
