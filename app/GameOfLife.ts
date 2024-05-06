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

  parseEncoding(encoding: string) {
    const _rows = encoding.split('$')
    const rows = _rows.map((r) => r.replace('!', '').split(''))
    this.board = rows
  }

  constructor(width: number, height: number, encoding?: string) {
    this.width = width
    this.height = height
    this.board = []
    this.initializeBoardBasedOnWidthAndHeight(width, height)
    encoding && this.parseEncoding(encoding)
  }

  toString() {
    const stringRows = this.board.map((row) => row.join(''))
    return stringRows.join('\n').concat('\n')
  }
}
