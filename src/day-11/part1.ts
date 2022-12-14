import { readFileSync } from 'fs'
import path from 'path'

const data = readFileSync(path.resolve(__dirname, './input.txt')).toString()
const monkeys = data.split('\n\n')

class Monkey {
  id: number
  items: number[]
  operation: (old: number) => number
  test: (old: number) => boolean
  targetInts: [number, number]
  targetMonkeys: Monkey[] = []
  inspections: number = 0

  constructor(
    id: number,
    startingItems: number[], 
    operation: (old: number) => number, 
    test: (old: number) => boolean,
    targetInts: [number, number]) {
      this.id = id
      this.items = startingItems
      this.operation = operation
      this.test = test
      this.targetInts = targetInts
  }

  public setTargets(targets: [Monkey, Monkey]) {
    this.targetMonkeys = targets
  }

  public addItem(item: number) {
    this.items.push(item)
  }

  private inspectItem() {
    let item = this.items.shift()
    if (!item) return

    this.inspections += 1

    item = this.operation(item)
    item = Math.floor(item / 3)

    this.throwItem(item)
  }

  private throwItem(item: number) {
    if (this.test(item)) 
      this.targetMonkeys[0].addItem(item)
    else 
      this.targetMonkeys[1].addItem(item)
  }

  public turn() {
    const itemsLength = this.items.length
    for (let i = 0; i < itemsLength; i += 1)
    {
      this.inspectItem()
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

const parseTest = (operation: string): ((input: number) => boolean) => {
  const elements = operation.split(' ')
  const parameter = parseInt(elements[2])
  
  return (input: number) => input % parameter === 0
}

const monkeySets = monkeys.map((monkey, index) => {
  const lines = monkey.split('\n')
  const items = lines[1].split(':')[1].split(',').map(item => parseInt(item))
  const operation = parseOperation(lines[2].split('= ')[1])
  const test = parseTest(lines[3].split(': ')[1])
  const target1 = parseInt(lines[4].split('monkey ')[1])
  const target2 = parseInt(lines[5].split('monkey ')[1])

  return new Monkey(index, items, operation, test, [target1, target2])
})

monkeySets.forEach(monkey => {
  const targetMonks = monkey.targetInts.map(int => monkeySets.find(monk => monk.id === int))
  monkey.setTargets(targetMonks as [Monkey, Monkey])
})

for (let i = 0; i < 20; i += 1) {
  monkeySets.forEach(monkey => monkey.turn())
}

const inspections = monkeySets.map(monkey => monkey.inspections).sort((a, b) => b - a)
console.log(inspections[0] * inspections[1])