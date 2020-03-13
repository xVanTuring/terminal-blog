export default function (state, prependChar) {
  if (state.system.login === '') {
    state.system.login = state.editing.input.join('')
    state.history.push(prependChar + state.editing.input.join(''))
  } else {
    state.history.push(prependChar)
    if (state.system.login !== 'guest' || state.editing.input.join('') !== 'guest') {
      state.system.login = ''
      state.history.push('Incorrect user name or password')
    } else {
      state.system.user = state.system.login
      state.system.login = ''
      state.system.cwd = '/'
      global.$cookies.set('terminal-user', state.system.user)
    }
  }
  state.editing.input = []
  state.editing.cursorIndex = 0
}
