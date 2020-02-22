export default function (state, prependChar) {
  state.history.push(prependChar)
  state.editing.cursorIndex = 0
}
