import path from 'path'
/**
 *
 * @param {Object} state
 * @param {string[]} commandArr
 */
export default function (state, commandArr) {
  console.log(state.system.fs)
  console.log(state.system.cwd)
  const list = Object.keys(state.system.fs)
  const filted = list.filter(name => {
    if (!name.startsWith(name)) {
      return false
    }
    return path.dirname(name) === state.system.cwd
  })
  state.history.push(filted.join('    '))
}
