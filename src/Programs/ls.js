import path from 'path'
/**
 *
 * @param {Object} state
 * @param {string[]} commandArr
 */
export default function (state, commandArr) {
  const list = Object.keys(state.system.fs)
  const filted = list.filter(name => {
    if (!name.startsWith(name)) {
      return false
    }
    return path.dirname(name) === state.system.cwd
  }).map((name) => path.basename(name)).filter((name) => name !== '')
  state.history.push(filted.join('    '))
}
