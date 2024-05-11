import { expect } from 'chai'
import fs from 'fs'
import { writeFile } from 'fs/promises'
import { afterAll, beforeAll, describe, test, expect as vex, vi } from 'vitest'
import { GameOfLife } from '../app/GameOfLife'
import { initializeGame } from '../app/initializeGame'

const dir = './testable/tmp'
const smallGliderPath = dir + '/glider.rle'
const gliderString = '#C This is a glider.\nx = 3, y = 3\nbo$2bo$3o!'

const corruptX = '#C This is a glider.\nb = 3, y = 3\nbo$2bo$3o!'
const corruptXPath = dir + '/x_corrupt_glider.rle'

const corruptY = '#C This is a glider.\nx = 3, v \nbo$2bo$3o!'
const corruptYPath = dir + '/y_corrupt_glider.rle'

const corruptEncoding = '#C This is a glider.\nx = 3, y = 3 \n'
const corruptEncodingPath = dir + '/encoding_corrupt_glider.rle'

beforeAll(async () => {
  fs.mkdirSync(dir, { recursive: true })
  await writeFile(smallGliderPath, gliderString)
  await writeFile(corruptXPath, corruptX)
  await writeFile(corruptYPath, corruptY)
  await writeFile(corruptEncodingPath, corruptEncoding)
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

  test('Expect to throw error in case of wrong file', () => {
    vex(() => initializeGame('./sasmhjbdkjashdjas')).toThrowError(/file/)
  })

  test('Expect to throw error in case x was not provided in file ', () => {
    vex(() => initializeGame(corruptXPath)).toThrowError(/x not found/)
  })

  test('Expect to throw error in case y was not provided in file ', () => {
    vex(() => initializeGame(corruptYPath)).toThrowError(/y not found/)
  })

  test('Expect to throw error in case encoding was not provided in file ', () => {
    vex(() => initializeGame(corruptEncodingPath)).toThrowError(
      /encoding not found/
    )
  })
})
