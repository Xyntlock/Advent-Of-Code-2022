import { readFileSync } from 'fs'
import path from 'path'

const data = readFileSync(path.resolve(__dirname, './input.txt')).toString()
const instrs = data.split('\n')

let cycle = 1
let X = 1
let pixels: string = ''
let pixelPos

const parseInstr = (instr: string): void => {
  pixelPos = ((cycle - 1) % 40)

  pixels = pixels.concat([X - 1, X, X + 1].includes(pixelPos) ? '#' : '.') 

  if (pixelPos === 39) {
    pixels = pixels.concat('\n')    
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

console.log(pixels)
