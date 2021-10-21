export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K'
export type Suit = 'Heart' | 'Spade' | 'Diamond' | 'Club'

export const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
export const suits = ['Heart', 'Spade', 'Diamond', 'Club']

export class Card {


  constructor(readonly rank: Rank,
    readonly suit: Suit) {}

}

export class Stack {
  
  static deck = (): Stack => {
    let res = []

    for (let s of suits) {
      for (let r of ranks) {
        res.push(new Card(r, s))
      }
    }
    return new Stack(res)
  }

  get shuffle(): Stack {
    return this
  }

  get duplicate(): Stack {
    return this
  }

  constructor(readonly cards: Array<Card>) {}




}

export class Solitaire {

  static shuffleAndDeal = (): Solitaire => {

    let ser: Stack = Stack.deck().shuffle

    let backs = []
    let fronts = []
    let holes = []

    for (let i = 0; i < 5; i++) {
      backs.push(ser.cutp(i))
      fronts.push(ser.cutp(1))
    }

    let backDeals = ser
    let frontDeals = ser.cutp(0)

    return new Solitaire(backDeals,
      frontDeals,
      backs,
      fronts,
      holes) 
  }

  constructor(
    readonly backDeals: Stack,
    readonly frontDeals: Stack,
    readonly backs: Array<Stack>,
    readonly fronts: Array<Stack>,
    readonly holes: Array<Stack>) {}

}
