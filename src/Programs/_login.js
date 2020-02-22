export default function (state, prependChar) {
  if (state.system.login === '') {
    state.system.login = state.editing.input.join('')
    state.history.push(prependChar + state.editing.input.join(''))
  } else {
    state.history.push(prependChar)
    if (state.system.login !== 'guest' || state.system.login !== 'guest') {
      state.system.login = ''
      state.history.push('Incorrect user name or password')
    } else {
      // logged in
      state.system.user = state.system.login
      state.system.login = ''
      state.system.cwd = '/'
      global.$cookies.set('terminal-user', state.system.user)
    }
  }
}
