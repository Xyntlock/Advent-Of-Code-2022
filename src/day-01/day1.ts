import { readFileSync } from 'fs'
import path from 'path'

const data = readFileSync(path.resolve(__dirname, './input.txt'))
const string = data.toString()

const calories = string.split('\n\n')
const totalCalories = calories.map(calorieSet => {
  const splitCalories = calorieSet.split('\n')
  const parsedCalories = splitCalories.map(calorie => parseInt(calorie))
  const totalCalories = parsedCalories.reduce((acc, cur) => acc + cur, 0)
  return totalCalories
})

console.log(Math.max(...totalCalories)) // top 1 elf calorie count

totalCalories.sort((a, b) => b - a)
console.log(totalCalories[0] + totalCalories[1] + totalCalories[2]) // top 3 elf calorie count