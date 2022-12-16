import { readFileSync } from 'fs'
import path from 'path'

const data = readFileSync(path.resolve(__dirname, './input.txt')).toString()
const pairs = data.split('\n\n')

type Value = number | Value[]

const compare = (left: Value, right: Value): boolean | null => {
  if (Array.isArray(left)) {
    if (right === undefined) return false // right has ran out of items

    if (Array.isArray(right)) {
      if (left.length === 0 && right.length === 0) return null // lists are equal
      if (left.length === 0 && right.length > 0) return true // left has ran out of items
      const comparison = compare(left[0], right[0])
      return comparison === null ? compare(left.slice(1), right.slice(1)) : comparison
    }
    else {
      return compare(left, [right])
    }
  }
  else {
    if (Array.isArray(right)) {
      return compare([left], right)
    }
    else {
      return left < right ? true : left === right ? null : false
    }
  }
}

const packetPairs = pairs.map(pair => pair.split('\n')).map(pair => pair.map(array => JSON.parse(array)))

let correctOrderPairs = 0

packetPairs.forEach((packetPair, index) => {
  const comparison = compare(packetPair[0], packetPair[1])
  if (comparison !== false) {
    correctOrderPairs += index + 1
  }
})

console.log(correctOrderPairs)