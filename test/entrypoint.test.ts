import { describe, test, expect as vex, vi } from 'vitest'
import { initializeGame } from '../app/initializeGame'

describe('Tests function which sets up the game ', () => {
  test('Accepts the path of the file where RLE is located', () => {
    const viFunction = vi.fn(initializeGame)

    viFunction('./somePath')

    vex(viFunction).toHaveBeenCalledOnce()
  })
})
