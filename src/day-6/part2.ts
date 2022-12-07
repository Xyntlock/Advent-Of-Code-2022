import { readFileSync } from 'fs'
import path from 'path'

const data = readFileSync(path.resolve(__dirname, './input.txt')).toString()
const chars = data.split('')

const markers = chars.slice(0, 14)

let i = 13
while(!markers.map(marker => markers.filter(char => char === marker).length === 1).every(bool => bool)) {
  i += 1
  markers[i % 14] = chars[i]
}

console.log(i + 1)