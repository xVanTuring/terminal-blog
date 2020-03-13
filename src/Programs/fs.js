import pwd from './pwd'
import clear from './clear'
import help from './help'
import ls from './ls'
import path from 'path'
export const DIR = Symbol('DIR')
export function defaultFS () {
  return {
    '/': DIR,
    '/bin': DIR,
    '/bin/help': help,
    '/bin/ls': ls,
    '/bin/pwd': pwd,
    '/bin/clear': clear,
    '/Eden': DIR,
    '/Eden/apple': 'The Apple'
  }
}
export function find (fs, name) {
  console.log(`searching ${name}`)
  return fs[path.resolve(name)]
}
