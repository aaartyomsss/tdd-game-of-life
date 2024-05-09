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

  test('Cell remains alive if their neighbor count is 2', () => {
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

  test('New cell is born if it has 3 neighbors', () => {
    const input = 'oo$bo!'
    const game = new GameOfLife(2, 2, input)
    expect(game.toString()).to.equalShape(`
      oo
      bo
    `)

    game.checkCells()

    expect(game.toString()).to.equalShape(`
      oo
      oo
    `)
  })

  test('Test simple oscillator', () => {
    const input = '3b$3o$3b!'
    const game = new GameOfLife(3, 3, input)
    expect(game.toString()).to.equalShape(`
      bbb
      ooo
      bbb
    `)

    game.checkCells()

    expect(game.toString()).to.equalShape(`
      bob
      bob
      bob
    `)

    game.checkCells()

    expect(game.toString()).to.equalShape(`
      bbb
      ooo
      bbb
    `)
  })
})

describe('Counting logic for alive cell', () => {
  test('Alive count for alive cell in center should be 0', () => {
    const input = '3b$bo$b!'
    const game = new GameOfLife(3, 3, input)
    expect(game.toString()).to.equalShape(`
      bbb
      bob
      bbb
    `)

    const count = game.checkCellAliveNeighbors({ i: 1, j: 1 })

    expect(count).to.equal(0)
  })

  test('Alive count for alive cell in center should be 1', () => {
    const input = '2bo$bo$b!'
    const game = new GameOfLife(3, 3, input)
    expect(game.toString()).to.equalShape(`
      bbo
      bob
      bbb
    `)

    const count = game.checkCellAliveNeighbors({ i: 1, j: 1 })

    expect(count).to.equal(1)
  })

  test('Alive count for alive cell in courner should be 1', () => {
    const input = '2bo$bo$b!'
    const game = new GameOfLife(3, 3, input)
    expect(game.toString()).to.equalShape(`
      bbo
      bob
      bbb
    `)

    const count = game.checkCellAliveNeighbors({ i: 0, j: 2 })

    expect(count).to.equal(1)
  })

  test('Alive count for alive cell in courner should be 3', () => {
    const input = '3o$3o$3o!'
    const game = new GameOfLife(3, 3, input)
    expect(game.toString()).to.equalShape(`
      ooo
      ooo
      ooo
    `)

    const count = game.checkCellAliveNeighbors({ i: 0, j: 2 })

    expect(count).to.equal(3)
  })
})
