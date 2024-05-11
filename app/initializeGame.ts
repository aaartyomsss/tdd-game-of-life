import { GameOfLife } from './GameOfLife'

export const initializeGame = (path: string) => {
  const file = GameOfLife.readEncodingFile(path)
  const { x, y, encoding } = GameOfLife.parseFile(file)
  const game = new GameOfLife(x, y, encoding)
  return game
}
