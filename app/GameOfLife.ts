export class GameOfLife {
  width: number
  height: number
  board: string[][]

  initializeBoardBasedOnWidthAndHeight(width: number, height: number) {
    for (let i = 0; i < height; i++) {
      const row = []
      for (let j = 0; j < width; j++) {
        row.push('b')
      }
      this.board.push(row)
    }
  }

  parseEncoding(encoding: string) {
    const _rows = encoding.split('$')
    const rows = _rows.map(this.parseEncodedRow)
    this.board = rows
  }

  parseEncodedRow(row: string) {
    let prevMultiplier: number | undefined = undefined
    const elements = row.split('')
    let parsedRow = ''
    for (const index in elements) {
      const element = elements[index]
      const maybeNumber = Number(element)
      if (Number.isNaN(maybeNumber)) {
        parsedRow += elements[index].repeat(prevMultiplier || 1)
        prevMultiplier = undefined
      } else {
        prevMultiplier = maybeNumber
      }
    }

    return parsedRow.replace('!', '').split('')
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
