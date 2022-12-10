 
import { useEffect, useState } from "react"
export default function useLocalStorage<T>(key: string, initialValue: T | (()=> T)) {
const [ value, setValue] = useState<T>(()=> {
  const jsonValue = localStorage.getItem(key)
  // если не пустое хранилище
  if(jsonValue != null) return JSON.parse(jsonValue)
  if( typeof initialValue === 'function') {
    // возвращаем как ф.  - добавляем типизацию  
    return (initialValue as ()=> T)()
  } else {
    return initialValue
  }
})
// следим за key, value
useEffect(()=> {
localStorage.setItem(key, JSON.stringify(value))
}, [key, value])
// опять добавляем типизацию через typeof  
  return  [value, setValue] as [typeof value, typeof setValue]
}
