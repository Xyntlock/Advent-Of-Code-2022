import { readFileSync } from 'fs'
import path from 'path'

const data = readFileSync(path.resolve(__dirname, './input.txt')).toString()
const commands = data.split('\n')

type Directory = {
  name: string
  directFileSizes: number
  totalSize: number
  subDirectories: Directory[]
  parentDirectory: Directory | null
}

const home: Directory = {
  name: '/',
  directFileSizes: 0,
  totalSize: 0,
  subDirectories: [],
  parentDirectory: null
}

let currentDir = home

commands.forEach((command, index) => {
  if(command.includes('$ cd')) {
    const portions = command.split(' ')

    if(portions[2] === '..') { // go up one directory
      if (currentDir.parentDirectory) {
        currentDir = currentDir.parentDirectory
      }
    }
    else { // moving to subdirectory
      if (portions[2] === '/') {
        currentDir = home
      }
      else { // check subdirectory exists, if not, create subdirectory entry and move to
        const nextDir = currentDir.subDirectories.find(directory => directory.name === portions[2])

        if (nextDir) {
          currentDir = nextDir
        }
        else {
          const newDir: Directory = {
            name: portions[2],
            directFileSizes: 0,
            totalSize: 0,
            subDirectories: [],
            parentDirectory: currentDir
          }
          currentDir.subDirectories.push(newDir)
          currentDir = newDir
        }
      }
    }
  }
  else if (command.includes('dir ')) { // check directory listed exists, if not, create subdirectory entry
    const directoryName = command.split(' ')[1]

    const directory = currentDir.subDirectories.find(directory => directory.name === directoryName)

    if (!directory) {
      currentDir.subDirectories.push({
        name: directoryName,
        directFileSizes: 0,
        totalSize: 0,
        subDirectories: [],
        parentDirectory: currentDir
      })
    }
  }
  else if (command.includes('$ ls')) {
    // nothing to process
  }
  else { // must be a file, record filesize
    const filesize = command.split(' ')[0]
    currentDir.directFileSizes += parseInt(filesize)
  }
})

const setTotalDirectorySize = (directory: Directory): number => {
  const subDirectorySizes = directory.subDirectories.map(subDirectory => setTotalDirectorySize(subDirectory))
  
  const subDirectoryTotal = subDirectorySizes.reduce((prev, curr) => prev + curr, 0)

  directory.totalSize = directory.directFileSizes + subDirectoryTotal

  return directory.totalSize
}

setTotalDirectorySize(home)

let directoriesToDelete: Directory[] = []
const markDirectoriesForDelete = (directory: Directory) => {
  if (directory.totalSize <= 100000) {
      directoriesToDelete.push(directory)
  }

  directory.subDirectories.forEach(subDir => markDirectoriesForDelete(subDir))
}

markDirectoriesForDelete(home)

console.log(directoriesToDelete.map(dir => dir.totalSize).reduce((prev, cur) => prev + cur, 0))