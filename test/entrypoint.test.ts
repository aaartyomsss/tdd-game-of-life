import { expect } from 'chai'
import fs from 'fs'
import { writeFile } from 'fs/promises'
import { afterAll, beforeAll, describe, test, expect as vex, vi } from 'vitest'
import { GameOfLife } from '../app/GameOfLife'
import { initializeGame } from '../app/initializeGame'

const dir = './testable/tmp'
const smallGliderPath = dir + '/glider.rle'
const gliderString = '#C This is a glider.\nx = 3, y = 3\nbo$2bo$3o!'

beforeAll(async () => {
  fs.mkdirSync(dir, { recursive: true })
  await writeFile(smallGliderPath, gliderString)
})

afterAll(() => {
  fs.rmSync('./testable', { recursive: true })
})

describe('Tests function which sets up the game ', () => {
  test('Accepts the path of the file where RLE is located', () => {
    const viFunction = vi.fn(initializeGame)

    viFunction(smallGliderPath)

    vex(viFunction).toHaveBeenCalledOnce()
  })

  test('Calls file retreival function', () => {
    const spy = vi.spyOn(GameOfLife, 'readEncodingFile')

    initializeGame(smallGliderPath)
    vex(spy).toHaveBeenCalledWith(smallGliderPath)
  })

  test('Parses file to get default state ', () => {
    const spy = vi.spyOn(GameOfLife, 'parseFile')

    initializeGame(smallGliderPath)
    vex(spy).toHaveBeenCalledWith(gliderString)
  })

  test('Returns game instance', () => {
    const game = initializeGame(smallGliderPath)
    vex(game.width).toEqual(3)
    vex(game.height).toEqual(3)
    expect(game.toString()).to.equalShape(`
      bob
      bbo
      ooo
    `)
  })
})
