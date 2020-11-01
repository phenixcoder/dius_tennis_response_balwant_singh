import { Match } from './Match'

describe('Match Class', () => {
  it('should create a class object with players passed', () => {
    const match = new Match('Player One', 'Player Two')
    expect(match).toBeInstanceOf(Match)
    expect(match.playerOneServing).toEqual(true)
    expect(match.playerOne).toEqual('Player One')
    expect(match.playerTwo).toEqual('Player Two')
    expect(match.gameScore.playerOne).toEqual(0)
    expect(match.gameScore.playerTwo).toEqual(0)
    expect(match.setScore.playerOne).toEqual(0)
    expect(match.setScore.playerTwo).toEqual(0)
  })

  it('should update the score of Player One', () => {
    const match = new Match('Player One', 'Player Two')
    expect(match.score()).toEqual('0-0, love all')
    expect(match.playerOneServing).toEqual(true)
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('0-0, 15-love')
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('0-0, 30-love')
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('0-0, 40-love')
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('1-0, love all')
    expect(match.playerOneServing).toEqual(false)
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('1-0, 15-love')
    expect(match.status()).toEqual('Match in progress')
  })
  it('should update the score of Player Two', () => {
    const match = new Match('Player One', 'Player Two')
    expect(match.score()).toEqual('0-0, love all')
    match.pointWonBy('Player Two')
    expect(match.score()).toEqual('0-0, love-15')
    match.pointWonBy('Player Two')
    expect(match.score()).toEqual('0-0, love-30')
    match.pointWonBy('Player Two')
    expect(match.score()).toEqual('0-0, love-40')
    match.pointWonBy('Player Two')
    expect(match.score()).toEqual('0-1, love all')
    match.pointWonBy('Player Two')
    expect(match.score()).toEqual('0-1, love-15')
    expect(match.status()).toEqual('Match in progress')
  })
  it('should score to deuce', () => {
    const match = new Match('Player One', 'Player Two')
    expect(match.score()).toEqual('0-0, love all')
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('0-0, 15-love')
    match.pointWonBy('Player Two')
    expect(match.score()).toEqual('0-0, 15 all')
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('0-0, 30-15')
    match.pointWonBy('Player Two')
    expect(match.score()).toEqual('0-0, 30 all')
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('0-0, 40-30')
    match.pointWonBy('Player Two')
    expect(match.score()).toEqual('0-0, deuce')
    expect(match.status()).toEqual('Match in progress')
  })
  it('should reach to Player One advantage and eventually win the game', () => {
    const match = new Match('Player One', 'Player Two')
    expect(match.score()).toEqual('0-0, love all')
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('0-0, 15-love')
    match.pointWonBy('Player Two')
    expect(match.score()).toEqual('0-0, 15 all')
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('0-0, 30-15')
    match.pointWonBy('Player Two')
    expect(match.score()).toEqual('0-0, 30 all')
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('0-0, 40-30')
    match.pointWonBy('Player Two')
    expect(match.score()).toEqual('0-0, deuce')
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('0-0, Advantage Player One')
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('1-0, love all')
    expect(match.status()).toEqual('Match in progress')
  })
  it('should reach to Player One advantage and eventually Player Two win the game', () => {
    const match = new Match('Player One', 'Player Two')
    expect(match.score()).toEqual('0-0, love all')
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('0-0, 15-love')
    match.pointWonBy('Player Two')
    expect(match.score()).toEqual('0-0, 15 all')
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('0-0, 30-15')
    match.pointWonBy('Player Two')
    expect(match.score()).toEqual('0-0, 30 all')
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('0-0, 40-30')
    match.pointWonBy('Player Two')
    expect(match.score()).toEqual('0-0, deuce')
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('0-0, Advantage Player One')
    match.pointWonBy('Player Two')
    expect(match.score()).toEqual('0-0, deuce')
    match.pointWonBy('Player Two')
    expect(match.score()).toEqual('0-0, Advantage Player Two')
    match.pointWonBy('Player Two')
    expect(match.score()).toEqual('0-1, love all')
    expect(match.status()).toEqual('Match in progress')
  })

  it('should display Player one wins the match Player one scores 6-0, love all', () => {
    const match = new Match('Player One', 'Player Two')
    for (let setidx = 0; setidx < 6; setidx++) { // Wins 6 games
      for (let gameIdx = 0; gameIdx < 4; gameIdx++) { // Wins a game
        match.pointWonBy('Player One')
      }
    }
    expect(match.score()).toEqual('6-0, love all')
    expect(match.status()).toEqual('Player One wins the match')
  })

  it('should display Player one wins the match Player one scores 7-5, love all', () => {
    const match = new Match('Player One', 'Player Two')
    for (let setidx = 0; setidx < 4; setidx++) { // Wins 4 games
      for (let gameIdx = 0; gameIdx < 4; gameIdx++) { // Wins a game
        match.pointWonBy('Player One')
      }
    }
    expect(match.score()).toEqual('4-0, love all')
    for (let setidx = 0; setidx < 4; setidx++) { // Wins 4 games
      for (let gameIdx = 0; gameIdx < 4; gameIdx++) { // Wins a game
        match.pointWonBy('Player Two')
      }
    }
    expect(match.score()).toEqual('4-4, love all')
    for (let gameIdx = 0; gameIdx < 4; gameIdx++) { // Wins a game
      match.pointWonBy('Player One')
    }
    expect(match.score()).toEqual('5-4, love all')
    for (let gameIdx = 0; gameIdx < 4; gameIdx++) { // Wins a game
      match.pointWonBy('Player Two')
    }
    expect(match.score()).toEqual('5-5, love all')
    for (let gameIdx = 0; gameIdx < 4; gameIdx++) { // Wins a game
      match.pointWonBy('Player One')
    }
    expect(match.score()).toEqual('6-5, love all')
    for (let gameIdx = 0; gameIdx < 4; gameIdx++) { // Wins a game
      match.pointWonBy('Player One')
    }
    expect(match.score()).toEqual('7-5, love all')
    expect(match.status()).toEqual('Player One wins the match')
  })

  it('should play a tie breaker game after set score reaches 6-6, love all', () => {
    const match = new Match('Player One', 'Player Two')
    for (let setidx = 0; setidx < 4; setidx++) { // Wins 4 games
      for (let gameIdx = 0; gameIdx < 4; gameIdx++) { // Wins a game
        match.pointWonBy('Player One')
      }
    }
    expect(match.score()).toEqual('4-0, love all')
    for (let setidx = 0; setidx < 4; setidx++) { // Wins 4 games
      for (let gameIdx = 0; gameIdx < 4; gameIdx++) { // Wins a game
        match.pointWonBy('Player Two')
      }
    }
    expect(match.score()).toEqual('4-4, love all')
    for (let gameIdx = 0; gameIdx < 4; gameIdx++) { // Wins a game
      match.pointWonBy('Player One')
    }
    expect(match.score()).toEqual('5-4, love all')
    for (let gameIdx = 0; gameIdx < 4; gameIdx++) { // Wins a game
      match.pointWonBy('Player Two')
    }
    expect(match.score()).toEqual('5-5, love all')
    for (let gameIdx = 0; gameIdx < 4; gameIdx++) { // Wins a game
      match.pointWonBy('Player One')
    }
    expect(match.score()).toEqual('6-5, love all')
    for (let gameIdx = 0; gameIdx < 4; gameIdx++) { // Wins a game
      match.pointWonBy('Player Two')
    }
    expect(match.score()).toEqual('6-6, 0-0') // Tie Breaker game Starts
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('6-6, 1-0')
    match.pointWonBy('Player Two')
    expect(match.score()).toEqual('6-6, 1-1')
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('6-6, 2-1')
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('6-6, 3-1')
    match.pointWonBy('Player Two')
    expect(match.score()).toEqual('6-6, 3-2')
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('6-6, 4-2')
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('6-6, 5-2')
    expect(match.status()).toEqual('Player One wins the match')
  })
  it('should play a tie breaker game after set score reaches 6-6, love all and tiebreak goes till 10-8', () => {
    const match = new Match('Player One', 'Player Two')
    for (let setidx = 0; setidx < 4; setidx++) { // Wins 4 games
      for (let gameIdx = 0; gameIdx < 4; gameIdx++) { // Wins a game
        match.pointWonBy('Player One')
      }
    }
    expect(match.score()).toEqual('4-0, love all')
    for (let setidx = 0; setidx < 4; setidx++) { // Wins 4 games
      for (let gameIdx = 0; gameIdx < 4; gameIdx++) { // Wins a game
        match.pointWonBy('Player Two')
      }
    }
    expect(match.score()).toEqual('4-4, love all')
    for (let gameIdx = 0; gameIdx < 4; gameIdx++) { // Wins a game
      match.pointWonBy('Player One')
    }
    expect(match.score()).toEqual('5-4, love all')
    for (let gameIdx = 0; gameIdx < 4; gameIdx++) { // Wins a game
      match.pointWonBy('Player Two')
    }
    expect(match.score()).toEqual('5-5, love all')
    for (let gameIdx = 0; gameIdx < 4; gameIdx++) { // Wins a game
      match.pointWonBy('Player One')
    }
    expect(match.score()).toEqual('6-5, love all')
    for (let gameIdx = 0; gameIdx < 4; gameIdx++) { // Wins a game
      match.pointWonBy('Player Two')
    }
    expect(match.score()).toEqual('6-6, 0-0') // Tie Breaker game Starts
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('6-6, 1-0')
    match.pointWonBy('Player Two')
    expect(match.score()).toEqual('6-6, 1-1')
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('6-6, 2-1')
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('6-6, 3-1')
    match.pointWonBy('Player Two')
    expect(match.score()).toEqual('6-6, 3-2')
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('6-6, 4-2')
    match.pointWonBy('Player Two')
    expect(match.score()).toEqual('6-6, 4-3')
    match.pointWonBy('Player Two')
    expect(match.score()).toEqual('6-6, 4-4')
    match.pointWonBy('Player Two')
    expect(match.score()).toEqual('6-6, 4-5')
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('6-6, 5-5')
    match.pointWonBy('Player Two')
    expect(match.score()).toEqual('6-6, 5-6')
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('6-6, 6-6')
    match.pointWonBy('Player Two')
    expect(match.score()).toEqual('6-6, 6-7')
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('6-6, 7-7')
    match.pointWonBy('Player Two')
    expect(match.score()).toEqual('6-6, 7-8')
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('6-6, 8-8')
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('6-6, 9-8')
    match.pointWonBy('Player One')
    expect(match.score()).toEqual('6-6, 10-8')
    expect(match.status()).toEqual('Player One wins the match')
  })
})
