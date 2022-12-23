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
  nextKnot: Knot | null
  index: number

  constructor(knot: Knot | null, index: number) {
    this.visitedNodes.add(JSON.stringify(this.pos))
    this.nextKnot = knot
    this.index = index
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

  public moveWithRope() {
    if (!this.nextKnot) return

    const knot = this.nextKnot

    if (this.isAdjacent(knot.pos)) return

    if (Math.abs(this.pos.x - knot.pos.x) > 0) {
      this.pos.x += knot.pos.x > this.pos.x ? 1 : -1
    }
  
    if (Math.abs(this.pos.y - knot.pos.y) > 0) {
      this.pos.y += knot.pos.y > this.pos.y ? 1 : -1
    }
  }

  public addNode() {
    this.visitedNodes.add(JSON.stringify(this.pos))
  }
}

const knots = new Array<Knot>(10)
for (let i = 0; i < 10; i += 1) {
  knots[i] = new Knot(i > 0 ? knots[i - 1] : null, i)
}

const head = knots[0]
const tail = knots[9]

instructions.forEach(instr => {
  head.move(instr)

  knots.forEach(knot => knot.moveWithRope())

  tail.addNode()
})

console.log(tail.visitedNodes.size)