import { readFileSync } from 'fs'
import path from 'path'

const data = readFileSync(path.resolve(__dirname, './input.txt'))
const string = data.toString()

const rounds = string.split('\n')

const counteredBy = {
  A: 'B',
  B: 'C',
  C: 'A',
} as any

type InputLine = ['A' | 'B' | 'C', 'X' | 'Y' | 'Z']

const calcRoundScore = (round: string) => {
  const plays: InputLine = round.split(' ') as InputLine
  
  const outcome = plays[1]

  let suggestedPlay
  if (outcome === 'Y') {
    suggestedPlay = plays[0]
  }
  else if (outcome === 'Z') {
    suggestedPlay = counteredBy[plays[0]]
  }
  else {
    suggestedPlay = counteredBy[counteredBy[plays[0]]]
  }

  const suggestedPlayScore = suggestedPlay.charCodeAt(0) - 64

  if (plays[0] === suggestedPlay) return (3 + suggestedPlayScore)

  return suggestedPlayScore + (counteredBy[plays[0]] === suggestedPlay ? 6 : 0)
}

const totalScore = rounds.map(calcRoundScore).reduce((acc, cur) => acc + cur, 0)
console.log(totalScore)