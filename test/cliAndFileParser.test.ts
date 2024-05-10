import fs from 'fs'
import { writeFile } from 'fs/promises'
import { afterAll, beforeAll, describe, test, expect as vex } from 'vitest'
import { GameOfLife } from '../app/GameOfLife'

const dir = './tests/tmp'
const smallGliderPath = dir + '/glider.rle'
const zebrastripesPath = dir + '/zebrastripes.rle'

beforeAll(async () => {
  const gliderString = '#C This is a glider.\nx = 3, y = 3\nbo$2bo$3o!'
  const zebrastripesString =
    '#N zebrastripes.rle\n#C https://conwaylife.com/wiki/Zebra_stripes\r#C https://www.conwaylife.com/patterns/zebrastripes.rle\nx = 27, y = 21, rule = B3/S23\n2b2o$2bo$4bo2bo2bo2bo2bo2bo2bo$3b20o$2bo$3b18o$21bo$b20o$o$b22o$23bob\n2o$b20o2bob2o$o20bobo$b20o2bo$23b2o$3b18o$2bo18bo$3b18o2$5b2o2b2obob4o\nb2o$5b2o2bob2obo2bob2o!'
  fs.mkdirSync(dir, { recursive: true })
  await writeFile(smallGliderPath, gliderString, 'utf-8')
  await writeFile(zebrastripesPath, zebrastripesString)
})

afterAll(() => {
  fs.rmSync('./tests', { recursive: true })
})

describe('In cli a file should be selected and parsed', () => {
  test('File can be read from RLE directory', () => {
    const file = GameOfLife.readEncodingFile(smallGliderPath)
    vex(file).toBeDefined()
  })

  test('Parser can receive x and y values', () => {
    const file = GameOfLife.readEncodingFile(smallGliderPath)
    console.log(file, ' < < < < < ? ', typeof file)
    const data = GameOfLife.parseFile(file)
    vex(data.x).toEqual(3)
    vex(data.y).toEqual(3)
  })

  test('parser can receive sinlge line RLE encoded string', () => {
    const file = GameOfLife.readEncodingFile(smallGliderPath)
    const data = GameOfLife.parseFile(file)
    vex(data.encoding).toEqual('bo$2bo$3o!')
  })

  test('Parse can receive and parse a multiline encoding', () => {
    const file = GameOfLife.readEncodingFile(zebrastripesPath)
    const data = GameOfLife.parseFile(file)
    vex(data.x).toEqual(27)
    vex(data.y).toEqual(21)
    vex(data.encoding).toEqual(
      '2b2o$2bo$4bo2bo2bo2bo2bo2bo2bo$3b20o$2bo$3b18o$21bo$b20o$o$b22o$23bob2o$b20o2bob2o$o20bobo$b20o2bo$23b2o$3b18o$2bo18bo$3b18o2$5b2o2b2obob4ob2o$5b2o2bob2obo2bob2o!'
    )
  })
})
