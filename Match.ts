export class Match {
  playerOne: string

  playerTwo: string

  playerOneServing: boolean

  gameScore: {
    playerOne: number,
    playerTwo: number
  }

  setScore: {
    playerOne: number,
    playerTwo: number
  }

  constructor (player1: string, player2: string) {
    throw new Error('Not Implimented')
  }

  pointWonBy (player: string) {
    throw new Error('Not Implimented')
  }

  score () {
    throw new Error('Not Implimented')
  }

  status () {
    throw new Error('Not Implimented')
  }
}
