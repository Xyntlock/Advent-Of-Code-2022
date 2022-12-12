import { readFileSync } from 'fs'
import path from 'path'

const data = readFileSync(path.resolve(__dirname, './input.txt')).toString()
const trees = data.split('\n').map(row => row.split('').map(tree => parseInt(tree)))

const scenicScore = (treeX: number, treeY: number, rowLength: number) => {
  if (treeX === 0 || treeX === rowLength - 1 || treeY === 0 || treeY === trees.length - 1) {
    return 0
  }

  const tree = trees[treeY][treeX]

  let scoreUpwards = 0
  for (let i = treeY - 1; i >= 0; i -= 1) {
    scoreUpwards += 1
    if (trees[i][treeX] >= tree) {
      break
    }
  }

  let scoreDownwards = 0
  for (let i = treeY + 1; i < trees.length; i += 1) {
    scoreDownwards += 1
    if (trees[i][treeX] >= tree) {
      break
    }
  }

  let scoreLeftwards = 0
  for (let i = treeX - 1; i >= 0; i -= 1) {
    scoreLeftwards += 1
    if (trees[treeY][i] >= tree) {
      break
    }
  }

  let scoreRightwards = 0
  for (let i = treeX + 1; i < rowLength; i += 1) {
    scoreRightwards += 1
    if (trees[treeY][i] >= tree) {
      break
    }
  }

  return scoreUpwards * scoreDownwards * scoreLeftwards * scoreRightwards
}

const scores: number[] = []

trees.forEach((row, rowIndex) => row.forEach((_, treeIndex) => {
  scores.push(scenicScore(treeIndex, rowIndex, row.length))
}))

console.log(Math.max(...scores))