import { expect } from 'chai'
import { describe, test, expect as vex } from 'vitest'
import { GameOfLife } from '../app/GameOfLife'

/**
 *  Any live cell with fewer than two live neighbors dies, as if by underpopulation.
    Any live cell with two or three live neighbors lives on to the next generation.
    Any live cell with more than three live neighbors dies, as if by overpopulation.
    Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
 */

describe('Main game logic', () => {
  test('A class contains method that loops over the board and checks the logic', () => {
    const game = new GameOfLife(3, 3)
    vex(game.checkCells).toBeDefined()
  })

  test('Board remains the same in case all of the cells are dead', () => {
    const game = new GameOfLife(2, 2)
    game.checkCells()
    expect(game.toString()).to.equalShape(`
      bb
      bb
    `)
  })

  test('Single alive cell dies, if all other are dead', () => {
    const input = 'bb$ob!'
    const game = new GameOfLife(2, 2, input)
    expect(game.toString()).to.equalShape(`
      bb
      ob
    `)

    game.checkCells()

    expect(game.toString()).to.equalShape(`
      bb
      bb
    `)
  })

  test('Cells die if their neighbor count is 1', () => {
    const input = 'bo$ob!'
    const game = new GameOfLife(2, 2, input)
    expect(game.toString()).to.equalShape(`
      bo
      ob
    `)

    game.checkCells()

    expect(game.toString()).to.equalShape(`
      bb
      bb
    `)
  })

  test.skip('Cell remains alive if their neighbor count is 2', () => {
    const input = '2bo$bob$o!'
    const game = new GameOfLife(3, 3, input)
    expect(game.toString()).to.equalShape(`
      bbo
      bob
      obb
    `)

    game.checkCells()

    expect(game.toString()).to.equalShape(`
      bbb
      bob
      bbb
    `)
  })
})
