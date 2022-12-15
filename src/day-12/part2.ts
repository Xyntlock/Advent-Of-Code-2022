import { readFileSync } from 'fs'
import path from 'path'

const data = readFileSync(path.resolve(__dirname, './input.txt')).toString()
const lines = data.split('\n')

const startRowIndex = lines.findIndex(line => line.includes('S'))
const startColumnIndex = lines.find(line => line.includes('S'))?.indexOf('S')!

type Height = {
  value: string
  elevation: string
  distance: number
  position: [number, number]
  neighbours: Height[]
}

const nodes: Height[] = []

const generateNodes = (rowIndex: number, columnIndex: number): Height => {
  const nodeAtGivenIndex = nodes.find(node => node.position[0] === rowIndex && node.position[1] === columnIndex)
  if (nodeAtGivenIndex) {
    return nodeAtGivenIndex
  }

  const value = lines[rowIndex].charAt(columnIndex)

  const node: Height = {
    value,
    elevation: value === 'S' ? 'a' : value === 'E' ? 'z' : value,
    distance: value === 'S' ? 0 : Number.MAX_SAFE_INTEGER,
    position: [rowIndex, columnIndex],
    neighbours: []
  }

  nodes.push(node)

  for (let i = -1; i < 2; i += 1) {
    if (rowIndex + i < 0 || rowIndex + i >= lines.length || i === 0) continue
    const neighbourNode = generateNodes(rowIndex + i, columnIndex)
    if (neighbourNode) {
      nodes.push(neighbourNode)
      if (node.elevation.charCodeAt(0) - neighbourNode.elevation.charCodeAt(0) > -2) {
        node.neighbours.push(neighbourNode)
      }
    }
  }

  for (let i = -1; i < 2; i += 1) {
    if (columnIndex + i < 0 || columnIndex + i >= lines[rowIndex].length || i === 0) continue
    const neighbourNode = generateNodes(rowIndex, columnIndex + i)
    if (neighbourNode) {
      nodes.push(neighbourNode)
      if (node.elevation.charCodeAt(0) - neighbourNode.elevation.charCodeAt(0) > -2) {
        node.neighbours.push(neighbourNode)
      }
    }
  }

  return node
}

generateNodes(startRowIndex, startColumnIndex)

const startingPoints = nodes.filter(node => node.elevation === 'a')!
let shortestDistance: number = Number.MAX_SAFE_INTEGER

startingPoints.forEach(start => {
  nodes.forEach(node => {
    node.distance = node === start ? 0 : Number.MAX_SAFE_INTEGER
  })

  const unvisitedNodes: Height[] = [start]
  const visitedNodes: Height[] = []

  while (unvisitedNodes.length > 0 && !visitedNodes.includes(nodes.find(node => node.value === 'E')!)) {
    const node = unvisitedNodes.pop()!

    if (node.distance > shortestDistance) return

    node?.neighbours.forEach(neighbour => {
      if (node.distance + 1 < neighbour.distance) {
        neighbour.distance = node.distance + 1
        unvisitedNodes.push(neighbour)
      }
    })
  
    visitedNodes.push(node)
    unvisitedNodes.sort((a, b) => b.distance - a.distance)
  }
  
  const distance = (nodes.find(node => node.value === 'E')!.distance)
  shortestDistance = shortestDistance > distance ? distance : shortestDistance
})

console.log(shortestDistance)