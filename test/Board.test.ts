import { expect } from 'chai'
import { describe, test, expect as vex } from 'vitest'
import { GameOfLife } from '../app/GameOfLife'

describe('The board for the Game of Life can be defined', () => {
  test('Class can be initialized with witdh and height', () => {
    const game = new GameOfLife(3, 2)
    expect(game.width).equal(3)
    expect(game.height).equal(2)
  })

  test('Class has a matrix respresenting board upon instantiating', () => {
    const game = new GameOfLife(2, 2)
    vex(game.board).toStrictEqual([
      ['.', '.'],
      ['.', '.'],
    ])
  })

  test('Class can print out the board, i.e. has toString()', () => {
    const game = new GameOfLife(5, 5)

    expect(game.toString()).to.equalShape(
      `.....
       .....
       .....
       .....
       .....`
    )
  })
})

describe('Board can accept and read RLE without parsing x/y', () => {
  test('Single input of a dead cell is read correctly', () => {
    const input = 'b!'
    const game = new GameOfLife(1, 1, input)
    expect(game.toString()).to.equalShape(`
      b
    `)
  })
})
