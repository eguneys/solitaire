type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades'

type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type SuitMap<A> = {
  [k in Suit]: A
}

type Card = {
  suit: Suit,
  rank: Rank
}

type Stack = Array<Card>;

type SoliStack = {
  back: Stack,
  front: Stack
}

type Solitaire = {
  stock: Stack,
  waste: Stack,
  piles: [SoliStack, SoliStack, SoliStack, SoliStack, SoliStack, SoliStack],
  foundations: SuitMap<Stack>
}

type PilePos = 0 | 1 | 2 | 3 | 4 | 5 | 6
type PileStackPos = [PilePos, number]

const soliNbStacks = [1, 2, 3, 4, 5, 6, 7]

const suits: Array<Suit> = ['hearts', 'diamonds', 'clubs', 'spades']

const ranks: Array<Rank> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const cards: Array<Card> = suits.flatMap(suit => 
  ranks.map(rank => ({ suit, rank })))

function suitmap<A>(hearts: A, spades: A, diamonds: A, clubs: A): SuitMap<A> {
  return {
    hearts,
    spades,
    diamonds,
    clubs
  }
}

function solistack(cards: Array<Card>): SoliStack {
  return {
    back: cards,
    front: []
  }
}

function solistack_faceup(ss: SoliStack) {
  ss.front.push(ss.back.splice(0, 1)[0])
}


function solitaire(deck: Array<Card>): Solitaire {
  let piles = soliNbStacks
    .map(nb => deck.splice(0, nb))
    .map(_ => solistack(_)),
    stock = deck,
    foundations = suitmap([], [], [], [])

  piles.forEach(_ => solistack_faceup(_))

  return {
    piles: piles as any,
    stock,
    waste: [],
    foundations
  }
} 

