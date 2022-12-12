import { readFileSync } from 'fs'
import path from 'path'

const data = readFileSync(path.resolve(__dirname, './input.txt')).toString()
const instrs = data.split('\n')

let cycle = 1
let X = 1
const importantCycles = [20, 60, 100, 140, 180, 220]
const signalStrengths: number[] = []

const parseInstr = (instr: string): void => {
  if (importantCycles.includes(cycle)) {
    signalStrengths.push(X * cycle)
  }

  if (instr === 'noop') {
    cycle += 1
    return
  }

  cycle += 1
  parseInstr('noop')
  const addX = parseInt(instr.split(' ')[1])
  X += addX
}

instrs.forEach(instr => parseInstr(instr))

console.log(signalStrengths.reduce((prev, curr) => prev + curr, 0))