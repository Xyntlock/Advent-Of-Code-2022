import { readFileSync } from 'fs'
import path from 'path'

const data = readFileSync(path.resolve(__dirname, './input.txt'))
const string = data.toString()

const rucksacks = string.split('\n')

let prioritySum = 0

const getPriority = (item: string) => item.charCodeAt(0) > 90 ? item.charCodeAt(0) - 96 : item.charCodeAt(0) - 38


rucksacks.map(rucksack => {
  const firstCompartment = rucksack.slice(0, rucksack.length / 2).split('')
  const secondCompartment = rucksack.slice(rucksack.length / 2).split('')

  let repeatedItem
  let i = 0
  while(!repeatedItem) {
    repeatedItem = secondCompartment.find(item => item === firstCompartment[i])
    i += 1
  }

  prioritySum += getPriority(repeatedItem)
})

console.log(prioritySum)
