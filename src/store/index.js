import Vue from 'vue'
import Vuex from 'vuex'
import { SpecialKeys } from '../Utils'
// eslint-disable-next-line no-unused-vars
import programs from '../Programs'
import { defaultFS, find } from '../Programs/fs'
import path from 'path'
Vue.use(Vuex)
let blinkTimeOut = null
export default new Vuex.Store({
  state: {
    loaded: false,
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
      login: '',
      path: '/bin',
      fs: defaultFS()
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
        const input = state.editing.input.join('') // pre
        state.history.push(prependChar + input)
        state.editing.input = [] // post
        state.editing.cursorIndex = 0
        if (commandArr.length !== 0 && commandArr[0] !== '') {
          const command = commandArr[0]
          let isWithPath = false
          if (command.startsWith('./') || command.startsWith('../') || command.startsWith('/')) {
            isWithPath = true
          }
          let exec = null
          if (!isWithPath) {
            // search in system path
            const pathArr = state.system.path.split(':')
            for (const _path of pathArr) { // move code to find
              const result = find(state.system.fs, path.join(_path, command))
              if (result) {
                exec = result
              }
              break
            }
          } else {
            exec = find(state.system.fs, path.resolve(state.system.cwd, command))
          }
          if (exec == null) {
            programs.__na(state, commandArr, isWithPath)
          } else {
            if (typeof exec === 'function') {
              exec(state, commandArr)
            } else if (typeof exec === 'string' && exec === '__DIR__') {
              state.history.push(`${command}: Is a directory`)
            }
          }
        }
      }
    },
    introAnimDone (state) {
      state.isIntroAnimDone = true
    },
    pushLine (state, line) {
      state.history.push(line)
    },
    logInWith (state, userName) {
      state.system.user = userName
      state.system.cwd = '/'
    },
    loaded (state) {
      state.loaded = true
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
