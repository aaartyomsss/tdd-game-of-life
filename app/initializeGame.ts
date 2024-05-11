import { GameOfLife } from './GameOfLife'

export const initializeGame = (path: string) => {
  const file = GameOfLife.readEncodingFile(path)
  const {} = GameOfLife.parseFile(file)
}
