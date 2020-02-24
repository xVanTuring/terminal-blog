export default function (state, commandArr, isWithPath = false) {
  if (isWithPath) {
    state.history.push(`${commandArr[0]}: No such file or directory`)
  } else { state.history.push(`${commandArr[0]}: command not found`) }
}
