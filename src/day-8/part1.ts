import { readFileSync } from 'fs'
import path from 'path'

const data = readFileSync(path.resolve(__dirname, './input.txt')).toString()
const trees = data.split('\n').map(row => row.split('').map(tree => parseInt(tree)))

const visible = (treeX: number, treeY: number, rowLength: number) => {
  if (treeX === 0 || treeX === rowLength - 1 || treeY === 0 || treeY === trees.length - 1) {
    return true
  }

  const tree = trees[treeY][treeX]

  let visibleUpwards = true
  for (let i = treeY - 1; i >= 0; i -= 1) {
    if (trees[i][treeX] >= tree) {
      visibleUpwards = false
    }
  }

  let visibleDownwards = true
  for (let i = treeY + 1; i < trees.length; i += 1) {
    if (trees[i][treeX] >= tree) {
      visibleDownwards = false
    }
  }

  let visibleLeftwards = true
  for (let i = treeX - 1; i >= 0; i -= 1) {
    if (trees[treeY][i] >= tree) {
      visibleLeftwards = false
    }
  }

  let visibleRightwards = true
  for (let i = treeX + 1; i < rowLength; i += 1) {
    if (trees[treeY][i] >= tree) {
      visibleRightwards = false
    }
  }

  return [visibleUpwards, visibleDownwards, visibleLeftwards, visibleRightwards].some(bool => bool)
}

let visibleTrees = 0

trees.forEach((row, rowIndex) => row.forEach((_, treeIndex) => {
  if (visible(treeIndex, rowIndex, row.length)) {
    visibleTrees += 1
  }
}))

console.log(visibleTrees)