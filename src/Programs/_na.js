export default function (state, commandArr) {
  state.history.push(`${commandArr[0]}: command not found`)
}
