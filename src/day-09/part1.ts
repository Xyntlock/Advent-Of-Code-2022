import { readFileSync } from 'fs'
import path from 'path'

const data = readFileSync(path.resolve(__dirname, './input.txt')).toString()
const instructions: Direction[] = data.split('\n').map(line => line.split(' ')).map(instr => instr[0].repeat(Number(instr[1]))).flatMap(dir => dir.split('')) as Direction[]

type Coordinate = {
  x: number
  y: number
}

type Direction = 'R' | 'L' | 'U' | 'D'

class Knot {
  pos: Coordinate = { x: 0, y: 0 }
  visitedNodes: Set<string> = new Set()

  constructor() {
    this.visitedNodes.add(JSON.stringify(this.pos))
  }

  public isAdjacent(coord: Coordinate): boolean {
    if (Math.abs(coord.x - this.pos.x) > 1 || Math.abs(coord.y - this.pos.y) > 1) return false
    return true
  }

  public move(dir: Direction) {
    switch(dir) {
      case 'R':
        this.pos.x += 1
        break
      case 'L':
        this.pos.x -= 1
        break
      case 'U':
        this.pos.y += 1
        break
      case 'D':
        this.pos.y -= 1
        break
    }
  }

  public addNode() {
    this.visitedNodes.add(JSON.stringify(this.pos))
  }
}

const head = new Knot()
const tail = new Knot()

instructions.forEach(instr => {
  head.move(instr)

  if (tail.isAdjacent(head.pos)) return

  if (Math.abs(tail.pos.x - head.pos.x) > 0) {
    tail.pos.x += head.pos.x > tail.pos.x ? 1 : -1
  }

  if (Math.abs(tail.pos.y - head.pos.y) > 0) {
    tail.pos.y += head.pos.y > tail.pos.y ? 1 : -1
  }

  tail.addNode()
})

console.log(tail.visitedNodes.size)