export class GameOfLife {
  width: number
  height: number
  board: string[][]

  initializeBoardBasedOnWidthAndHeight(width: number, height: number) {
    for (let i = 0; i < height; i++) {
      const row = []
      for (let j = 0; j < width; j++) {
        row.push('.')
      }
      this.board.push(row)
    }
  }

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.board = []
    this.initializeBoardBasedOnWidthAndHeight(width, height)
  }

  toString() {
    const stringRows = this.board.map((row) => row.join(''))
    return stringRows.join('\n').concat('\n')
  }
}
