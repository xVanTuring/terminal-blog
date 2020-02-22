export function defaultFS () {
  return {
    '/': {
      bin: {
        help: 'help',
        ls: 'ls',
        pwd: 'pwd',
        cd: 'cd'
      }
    }
  }
}
