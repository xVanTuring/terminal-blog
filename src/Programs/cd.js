import path from 'path'
import { find, DIR } from './fs'
/**
 *
 * @param {*} state
 * @param {string[]} commandArr
 */
export default function (state, commandArr) {
  if (commandArr.length > 2) {
    state.history.push('cd: too many arguments')
  }
  if (commandArr.length === 1) {
    return
  }
  const targetPath = path.resolve(path.join(state.system.cwd, commandArr[1]))
  if (find(state.system.fs, targetPath) === DIR) {
    state.system.cwd = targetPath
  }
}
