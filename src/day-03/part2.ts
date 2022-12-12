import { readFileSync } from 'fs'
import path from 'path'

const data = readFileSync(path.resolve(__dirname, './input.txt'))
const string = data.toString()

const rucksacksByLine = string.split(/\n/)

const rucksackGroups = string.split(/(.*\n.*\n.*\n)/g).filter(line => line != '')


let prioritySum = 0

const getPriority = (item: string) => item.charCodeAt(0) > 90 ? item.charCodeAt(0) - 96 : item.charCodeAt(0) - 38


rucksackGroups.map(rucksackGroup => {
  const rucksacks = rucksackGroup.split('\n', 3).map(rucksack => rucksack.split(''))

  let repeatedItem
  let i = 0
  while (!repeatedItem) {
    repeatedItem = rucksacks[0].find(item => item === rucksacks[1].find(item => item === rucksacks[2][i]))
    i += 1
  }

  prioritySum += getPriority(repeatedItem)
})

console.log(prioritySum)