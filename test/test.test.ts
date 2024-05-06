import { describe, expect, test } from 'vitest'
import { test as testable } from '../test'

describe('Test configuration', () => {
  test('Returns whats needed', () => {
    expect(testable(2)).toBe(3)
  })
})
