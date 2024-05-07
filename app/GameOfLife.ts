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

  parseEncoding = (encoding: string) => {
    const _rows = encoding.split('$')
    const parsedEncodingRows = _rows.map(this.parseEncodedRow)
    const rowsWithAppendedDeadCellsAtTheEnd =
      this.appendFillerRows(parsedEncodingRows)
    this.board = rowsWithAppendedDeadCellsAtTheEnd
  }

  appendFillerRows = (rows: string[][]) => {
    if (rows.length < this.height) {
      const difference = this.height - rows.length
      const additionalRows = Array.from({ length: difference }).map((_) =>
        'b'.repeat(this.width).split('')
      )
      return [...rows, ...additionalRows]
    }
    return rows
  }

  parseEncodedRow = (row: string) => {
    let prevMultiplier: number | undefined = undefined
    const elements = row.split('')
    let parsedRow = ''
    let currentParsedElement = 0
    for (const element of elements) {
      const maybeNumber = Number(element)
      if (Number.isNaN(maybeNumber)) {
        console.log('------------')
        console.log('Current element ', element, 'Multiplier? ', prevMultiplier)
        parsedRow += element.repeat(prevMultiplier || 1)
        prevMultiplier = undefined

        console.log(parsedRow, '< - - - - -- \n')

        parsedRow += this.appendDeadCellsToTheEndOfTheRow(
          elements.length,
          currentParsedElement,
          parsedRow.length - 1,
          element
        )
        console.log('------------')
      } else {
        prevMultiplier = maybeNumber
      }
      currentParsedElement++
    }

    return parsedRow.replace('!', '').split('')
  }

  appendDeadCellsToTheEndOfTheRow = (
    encodedLength: number,
    currentParsedElement: number,
    currentIndex: number,
    currentElement: string
  ) => {
    if (
      encodedLength - 1 === currentParsedElement &&
      currentIndex <= this.width - 1
    ) {
      let difference = this.width - 1 - currentIndex
      console.log(
        'Appending currently to the end: ',
        difference,
        ' Current index? ',
        currentIndex,
        'Andf current element ? ',
        currentElement
      )
      console.log(encodedLength, ' ? ? ?')

      if (currentElement === '!') {
        difference += 1
      }

      return 'b'.repeat(difference)
    }
    return ''
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
