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
})
