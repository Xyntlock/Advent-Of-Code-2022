import { readFileSync } from 'fs'
import path from 'path'

const data = readFileSync(path.resolve(__dirname, './input.txt'))
const string = data.toString()

const pairs = string.split('\n')
const limits = pairs.map(pair => pair.split(',').map(range => range.split('-').map(limit => parseInt(limit))))

const compare = (limit: number, range2: number[]) => limit >= range2[0] && limit <= range2[1]

const withinRange = (range1: number[], range2: number[]) => {
  return range1.map(limit => compare(limit, range2)).some(bool => bool) || range2.map(limit => compare(limit, range1)).some(bool => bool)
}

let totalOverlaps = 0
limits.forEach(pairs => {
  if (withinRange(pairs[0], pairs[1])) totalOverlaps += 1
})

console.log(totalOverlaps)