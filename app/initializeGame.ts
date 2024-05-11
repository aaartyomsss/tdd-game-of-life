import { GameOfLife } from './GameOfLife'

export const initializeGame = (path: string) => {
  try {
    const file = GameOfLife.readEncodingFile(path)
    const { x, y, encoding } = GameOfLife.parseFile(file)
    if (!x) throw new Error('x not found in file')
    if (!y) throw new Error('y not found in file')
    if (!encoding) throw new Error('encoding not found')
    const game = new GameOfLife(x, y, encoding)
    return game
  } catch (error) {
    throw error
  }
}
