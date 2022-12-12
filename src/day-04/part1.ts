import { readFileSync } from 'fs'
import path from 'path'

const data = readFileSync(path.resolve(__dirname, './input.txt'))
const string = data.toString()

const pairs = string.split('\n')
const limits = pairs.map(pair => pair.split(',').map(range => range.split('-').map(limit => parseInt(limit))))

const compare = (range1: number[], range2: number[]) => range1[0] >= range2[0] && range1[1] <= range2[1]


const withinRange = (range1: number[], range2: number[]) => {
  return compare(range1, range2) || compare(range2, range1)
}

let totalOverlaps = 0
limits.forEach(pairs => {
  if (withinRange(pairs[0], pairs[1])) totalOverlaps += 1
})

console.log(totalOverlaps)