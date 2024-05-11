import { initializeGame } from './app/initializeGame'

/**
 * Might be wrong but main will have only args and setInterval
 * both of which are tricky to test. Can be only mocked. So this will
 * be implemented via manual testing...
 */
const path = process.argv[2]

function main() {
  const game = initializeGame(path)

  console.log('GAME STRING WITH FOLLOWING STATE:')
  console.log(game.toString())

  setInterval(() => {
    game.checkCells()
    console.log(game.toString())
  }, 1000)
}

main()
