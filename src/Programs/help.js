const linux = [
  '         _nnnn_                      ',
  '        dGGGGMMb     ,"""""""""""""".',
  '       @p~qp~~qMb    | Linux Rules! |',
  '       M|@||@) M|   _;..............\'',
  '       @,----.JM| -\'',
  '      JS^\\__/  qKL',
  '     dZP        qKRb'
]
export default function (state) {
  state.history.push('xVan Blog, version 0.1.0 (web)')
  for (const line of linux) {
    state.history.push(line)
  }
  state.history.push('You may find a lot of useful tools in `/bin`.')
  state.history.push('Commands like `cd`, `ls` and `pwd` are defined.')
  state.history.push('Use `view` to view a document, if you want.')
  state.history.push('And you don\'t want to eat that apple.')
  state.history.push('Enjoy yourself.')
  state.history.push('')
}
