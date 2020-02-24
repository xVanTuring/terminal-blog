import pwd from './pwd'
import clear from './clear'
import help from './help'
import ls from './ls'
export function defaultFS () {
  return {
    '/': '__DIR__',
    '/bin/': '__DIR__',
    '/bin/help': help,
    '/bin/ls': ls,
    '/bin/pwd': pwd,
    '/bin/clear': clear,
    '/Eden': '__DIR__',
    '/Eden/apple': 'The Apple'
  }
}
export function find (fs, name) {
  console.log(`searching ${name}`)
  return fs[name]
}
