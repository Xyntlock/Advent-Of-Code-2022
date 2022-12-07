import { readFileSync } from 'fs'
import path from 'path'

const data = readFileSync(path.resolve(__dirname, './input.txt')).toString()
const chars = data.split('')

const markers = chars.slice(0, 4)

let i = 3
while(!(new Set(markers).size === 4)) {
  i += 1
  markers[i % 4] = chars[i]
}

console.log(i + 1)