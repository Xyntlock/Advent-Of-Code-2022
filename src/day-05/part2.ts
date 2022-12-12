import { readFileSync } from 'fs'
import path from 'path'

const data = readFileSync(path.resolve(__dirname, './input.txt')).toString()
const [stackRows, instrs] = data.split('\n\n').map(array => array.split('\n'))
const numOfStacks = parseInt(stackRows.reverse().shift()!.split('   ').pop()!)

let stacks: string[][] = new Array(numOfStacks).fill([])

// populate stacks with crates and empty strings
for (let i = 0; i < stacks.length; i += 1) {
  for (let j = 0; j < stackRows.length; j += 1) {
    const char = stackRows[j].charAt(i * 4 + 1)
    if(char !== ' ') {
      stacks[i] = stacks[i].concat(stackRows[j].charAt(i * 4 + 1))
    }
  }
}

// get relevant numbers from instructions
const instrNums = instrs.map(instr => { 
  const words = instr.split(' ')
  return [words[1], words[3], words[5]].map(num => parseInt(num))
})

// move crates as per instructions
instrNums.forEach(instrs => {
  const stackToMoveFrom = instrs[1] - 1
  const stackToMoveTo = instrs[2] - 1

  const cratesToMove = []
  for(let i = 0; i < instrs[0]; i += 1) {
    cratesToMove.push(stacks[stackToMoveFrom].pop()!)
  }
  cratesToMove.reverse()
  stacks[stackToMoveTo].push(...cratesToMove)
})

// print top crate of each stack
console.log(stacks.map(stack => stack[stack.length - 1]).join(''))