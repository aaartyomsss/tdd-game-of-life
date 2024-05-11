import { GameOfLife } from './GameOfLife'

export const initializeGame = (path: string) => {
  try {
    const file = GameOfLife.readEncodingFile(path)
    const input = GameOfLife.parseFile(file)
    const { x, y, encoding } = handleErrors(input)
    const game = new GameOfLife(x, y, encoding)
    return game
  } catch (error) {
    throw error
  }
}

type GameInput = {
  x?: number | undefined
  y?: number | undefined
  encoding: string
}

const handleErrors = (input: GameInput) => {
  const { x, y, encoding } = input
  if (!x) throw new Error('x not found in file')
  if (!y) throw new Error('y not found in file')
  if (!encoding) throw new Error('encoding not found')

  return { x, y, encoding }
}
