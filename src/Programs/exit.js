export default function (state) {
  global.$cookies.remove('terminal-user')
  state.system.user = ''
  state.history.push('exit')
}
