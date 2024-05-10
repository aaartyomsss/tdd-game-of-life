import fs from 'fs'
import { writeFile } from 'fs/promises'
import { afterAll, beforeAll, describe, test, expect as vex, vi } from 'vitest'
import { GameOfLife } from '../app/GameOfLife'
import { initializeGame } from '../app/initializeGame'

const dir = './tests/tmp'
const smallGliderPath = dir + '/glider.rle'

beforeAll(async () => {
  const gliderString = '#C This is a glider.\nx = 3, y = 3\nbo$2bo$3o!'
  fs.mkdirSync(dir, { recursive: true })
  await writeFile(smallGliderPath, gliderString)
})

afterAll(() => {
  fs.rmSync('./tests', { recursive: true })
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
})
