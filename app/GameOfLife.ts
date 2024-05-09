import fs from 'fs'

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
    let currentRLEStringIndex = 0
    for (const element of elements) {
      const maybeNumber = Number(element)
      if (Number.isNaN(maybeNumber)) {
        parsedRow += element.repeat(prevMultiplier || 1)
        prevMultiplier = undefined

        parsedRow += this.appendDeadCellsToTheEndOfTheRow(
          elements.length,
          currentRLEStringIndex,
          parsedRow.length - 1,
          element
        )
      } else {
        prevMultiplier = maybeNumber
      }
      currentRLEStringIndex++
    }

    return parsedRow.replace('!', '').split('')
  }

  appendDeadCellsToTheEndOfTheRow = (
    encodedLength: number,
    currentRLEStringIndex: number,
    currentParsedElementIndex: number,
    currentElement: string
  ) => {
    if (
      encodedLength - 1 === currentRLEStringIndex &&
      currentParsedElementIndex <= this.width - 1
    ) {
      let difference = this.width - 1 - currentParsedElementIndex

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

  checkCells = () => {
    const cellsToKill: CellLocation[] = []
    const cellsToBringToLife: CellLocation[] = []

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const currentCell = this.board[i][j]
        let numberOfAliveNeightbors = this.checkCellAliveNeighbors({ i, j })

        if (currentCell === 'o' && numberOfAliveNeightbors < 2) {
          cellsToKill.push({ i, j })
        }

        if (currentCell === 'b' && numberOfAliveNeightbors === 3) {
          cellsToBringToLife.push({ i, j })
        }

        if (currentCell === 'o' && numberOfAliveNeightbors > 3) {
          cellsToKill.push({ i, j })
        }
      }
    }

    cellsToKill.forEach((c) => {
      this.board[c.i][c.j] = 'b'
    })

    cellsToBringToLife.forEach((c) => {
      this.board[c.i][c.j] = 'o'
    })
  }

  checkCellAliveNeighbors = (cell: CellLocation) => {
    const { i, j } = cell
    let aliveCount = 0

    for (let ik = -1; ik <= 1; ik++) {
      for (let jk = -1; jk <= 1; jk++) {
        if (ik === 0 && jk === 0) {
          continue
        }
        if (
          this.board[i + ik] &&
          this.board[i + ik][j + jk] &&
          this.board[i + ik][j + jk] === 'o'
        ) {
          aliveCount++
        }
      }
    }
    return aliveCount
  }

  static readEncodingFile = (path: string) => {
    const file = fs.readFileSync(path, { encoding: 'utf-8' })
    return file
  }

  static parseFile = (fileContent: string) => {
    const rowsOfFile = fileContent.split('\n')
    let dementionsParsed = false
    let data: ParseFileData = {}
    let encodingString: string = ''
    rowsOfFile.forEach((r) => {
      if (dementionsParsed) {
        encodingString += r.replaceAll('\r', '')
      }

      if (r.startsWith('x =')) {
        const widthAndLegth = this.parseWidthAndLengthFromFileRow(r)
        data = { ...data, ...widthAndLegth }
        dementionsParsed = true
      }
    })
    return { ...data, encoding: encodingString }
  }

  static parseWidthAndLengthFromFileRow = (row: string) => {
    const rowData = row.split(', ')
    const unparsedX = rowData[0]
    const unparsedY = rowData[1]
    const [x, valueX] = unparsedX.split(' = ')
    const [y, valueY] = unparsedY.split(' = ')
    const intX = Number(valueX)
    const intY = Number(valueY)
    return { x: intX, y: intY }
  }

  toString() {
    const stringRows = this.board.map((row) => row.join(''))
    return stringRows.join('\n').concat('\n')
  }
}

type ParseFileData = { x?: number; y?: number; encoding?: string }

type CellLocation = {
  i: number
  j: number
}
