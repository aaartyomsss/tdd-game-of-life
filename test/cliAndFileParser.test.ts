import { describe, test, expect as vex } from 'vitest'
import { GameOfLife } from '../app/GameOfLife'

describe('In cli a file should be selected and parsed', () => {
  test('File can be read from RLE directory', () => {
    const file = GameOfLife.readEncodingFile('./rle/1a_simple_glider.rle')
    vex(file).toBeDefined()
  })

  test('Parser can receive x and y values', () => {
    const file = GameOfLife.readEncodingFile('./rle/1a_simple_glider.rle')
    const data = GameOfLife.parseFile(file)
    vex(data.x).toEqual(3)
    vex(data.y).toEqual(3)
  })
})
