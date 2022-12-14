import { readFileSync } from 'fs'
import lcm from 'compute-lcm'
import path from 'path'

const data = readFileSync(path.resolve(__dirname, './input.txt')).toString()
const monkeys = data.split('\n\n')

class Monkey {
  id: number
  items: number[]
  operation: (old: number) => number
  divisor: number
  targetInts: [number, number]
  targetMonkeys: Monkey[] = []
  inspections: number = 0

  constructor(
    id: number,
    startingItems: number[], 
    operation: (old: number) => number, 
    divisor: number,
    targetInts: [number, number]) {
      this.id = id
      this.items = startingItems
      this.operation = operation
      this.divisor = divisor
      this.targetInts = targetInts
  }

  public setTargets(targets: [Monkey, Monkey]) {
    this.targetMonkeys = targets
  }

  public addItem(item: number) {
    this.items.push(item)
  }

  private test(item: number) {
    return item % this.divisor === 0
  }

  private inspectItem(lowestMultiple: number) {
    let item = this.items.shift()
    if (!item) return

    this.inspections += 1

    item = this.operation(item)
    item = item % lowestMultiple

    this.throwItem(item)
  }

  private throwItem(item: number) {
    if (this.test(item)) 
      this.targetMonkeys[0].addItem(item)
    else 
      this.targetMonkeys[1].addItem(item)
  }

  public turn(lowestMultiple: number) {
    const itemsLength = this.items.length
    for (let i = 0; i < itemsLength; i += 1)
    {
      this.inspectItem(lowestMultiple)
    }
  }
}

const parseOperation = (operation: string): ((input: number) => number) => {
  const elements = operation.split(' ')
  const parameter = parseInt(elements[2])
  const useOld = Number.isNaN(parameter)

  // is parsing an operation
  switch(elements[1]) {
    case '+':
      return useOld ? (input: number) => input + input : (input: number) => input + parameter
    case '*':
      return useOld ? (input: number) => input * input : (input: number) => input * parameter
    default:
      break
  }

  return () => -1
}

const monkeySets = monkeys.map((monkey, index) => {
  const lines = monkey.split('\n')
  const items = lines[1].split(':')[1].split(',').map(item => parseInt(item))
  const operation = parseOperation(lines[2].split('= ')[1])
  const divisor = Number(lines[3].split(': ')[1].split(' ')[2])
  const target1 = parseInt(lines[4].split('monkey ')[1])
  const target2 = parseInt(lines[5].split('monkey ')[1])

  return new Monkey(index, items, operation, divisor, [target1, target2])
})

const lowestMultiple = lcm(monkeySets.map(monkey => monkey.divisor))

monkeySets.forEach(monkey => {
  const targetMonks = monkey.targetInts.map(int => monkeySets.find(monk => monk.id === int))
  monkey.setTargets(targetMonks as [Monkey, Monkey])
})

for (let i = 0; i < 10000; i += 1) {
  monkeySets.forEach(monkey => monkey.turn(lowestMultiple!))
}

const inspections = monkeySets.map(monkey => monkey.inspections).sort((a, b) => b - a)
console.log(inspections[0] * inspections[1])