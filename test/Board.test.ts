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
      ['b', 'b'],
      ['b', 'b'],
    ])
  })

  test('Class can print out the board, i.e. has toString()', () => {
    const game = new GameOfLife(5, 5)

    expect(game.toString()).to.equalShape(
      `bbbbb
       bbbbb
       bbbbb
       bbbbb
       bbbbb`
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

  test('Single input of alive cell is read correctly', () => {
    const input = 'o!'
    const game = new GameOfLife(1, 1, input)
    expect(game.toString()).to.equalShape(`
      o
    `)
  })

  test('3 by 3 exact encoding provided gives correct result', () => {
    const input = 'bob$bbo$ooo!'
    const game = new GameOfLife(3, 3, input)
    expect(game.toString()).to.equalShape(`
      bob
      bbo
      ooo
    `)
  })

  test('3 by 3 encoding provided gives correct result', () => {
    const input = 'bob$2bo$3o!'
    const game = new GameOfLife(3, 3, input)
    expect(game.toString()).to.equalShape(`
      bob
      bbo
      ooo
    `)
  })

  test('3 by 3 encoding should automatically append dead cells to the end', () => {
    const input = 'bo$2bo$o!'
    const game = new GameOfLife(3, 3, input)
    expect(game.toString()).to.equalShape(`
      bob
      bbo
      obb
    `)
  })

  test('5 by 5 encoding still append dead cells to the end', () => {
    const input = 'bo$2bo$o!'
    const game = new GameOfLife(5, 5, input)

    expect(game.toString()).to.equalShape(`
      bobbb
      bbobb
      obbbb
      bbbbb
      bbbbb
    `)
  })
})
