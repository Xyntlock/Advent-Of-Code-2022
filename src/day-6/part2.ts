import { readFileSync } from 'fs'
import path from 'path'

const data = readFileSync(path.resolve(__dirname, './input.txt')).toString()
const chars = data.split('')

const markers = chars.slice(0, 14)

let i = 13
while(!(new Set(markers).size === 14)) {
  i += 1
  markers[i % 14] = chars[i]
}

console.log(i + 1)