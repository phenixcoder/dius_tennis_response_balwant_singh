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
    this.playerOne = player1
    this.playerTwo = player2
    this.playerOneServing = true
    this.gameScore = {
      playerOne: 0,
      playerTwo: 0
    }
    this.setScore = {
      playerOne: 0,
      playerTwo: 0
    }
  }

  isTiebreakerGame (): boolean {
    const { setScore } = this
    return ((setScore.playerOne >= 6 && setScore.playerTwo >= 6)) && (Math.abs(setScore.playerOne - setScore.playerTwo) < 2)
  }

  pointWonBy (player: string) {
    const GAME_SCORES = [
      0, // Love
      15,
      30,
      40,
      41, // Advantage
      42 // Game
    ]

    const targetPlayer = this.playerOne === player ? 'playerOne' : 'playerTwo'
    const otherPlayer = this.playerOne === player ? 'playerTwo' : 'playerOne'
    const { setScore, gameScore } = this

    let score = gameScore[targetPlayer]

    const isTieBreaker = this.isTiebreakerGame()

    if (isTieBreaker) {
      score++
    } else {
      score = GAME_SCORES[GAME_SCORES.indexOf(score) + 1]

      if (score === 41 && gameScore[otherPlayer] < 40) {
        score = 42
      }

      if (score === 41 && gameScore[otherPlayer] === 41) {
        score = 40
        gameScore[otherPlayer] = 40
      }
      if (score === 42) {
        // Game Score
        score = 0

        setScore[targetPlayer]++

        gameScore.playerOne = 0
        gameScore.playerTwo = 0
        this.playerOneServing = !this.playerOneServing
      }
    }
    gameScore[targetPlayer] = score
  }

  score () {
    const { gameScore, setScore } = this
    let gameScoreString = 'love all'

    const playerOneString = `${gameScore.playerOne === 0 ? 'love' : gameScore.playerOne}`
    const playerTwoString = `${gameScore.playerTwo === 0 ? 'love' : gameScore.playerTwo}`

    gameScoreString = playerOneString === playerTwoString ? `${playerOneString} all` : `${playerOneString}-${playerTwoString}`

    if (gameScoreString === '40 all') {
      gameScoreString = 'deuce'
    }

    if (gameScore.playerOne === 41 || gameScore.playerTwo === 41) {
      gameScoreString = `Advantage ${gameScore.playerOne === 41 ? this.playerOne : this.playerTwo}`
    }

    if (this.isTiebreakerGame()) {
      gameScoreString = `${gameScore.playerOne}-${gameScore.playerTwo}`
    }
    return `${setScore.playerOne}-${setScore.playerTwo}, ${gameScoreString}`
  }

  status () {
    const { gameScore, setScore, playerTwo, playerOne } = this

    let isMatchOver = (setScore.playerOne >= 6 || setScore.playerTwo >= 6) && (Math.abs(setScore.playerOne - setScore.playerTwo) >= 2)

    if (this.isTiebreakerGame()) {
      isMatchOver = Math.abs(gameScore.playerOne - gameScore.playerTwo) >= 2
    }

    if (isMatchOver) {
      if (this.isTiebreakerGame()) {
        return `${gameScore.playerOne > gameScore.playerTwo ? playerOne : playerTwo} wins the match`
      }
      return `${setScore.playerOne > setScore.playerTwo ? playerOne : playerTwo} wins the match`
    }
    return 'Match in progress'
  }
}
