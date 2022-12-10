import React , {useState, createContext, ReactNode, useContext} from 'react'
import {ShoppingCart} from '../components/ShoppingCart'
import useLocalStorage from '../hooks/useLocalStorage'
type ShoppingCartProviderProps = {
  children: ReactNode
}
 
type ShoppingCartContext = {
  openCart: ()=> void
  closeCart: ()=> void
 getItemQuantity: (id: number) => number 
 increaseCartQuantity: (id: number) => void  
 decreaseCartQuantity: (id: number) => void 
 removeFromCart: (id: number) => void 
   // тип для Общего количества товаров в корзине - будет отражаться на иконке 
   cartQuantity: number
   cartItems: CartItem[] 
  
}
type CartItem = { id: number, quantity: number}
 
// создаем глобальный Контекст обернем им все компоненты в App
const ShoppingCartContext = createContext({} as  ShoppingCartContext)

// Ф. экспорта всех функций
export function useShoppingCart () {
 return useContext(ShoppingCartContext)
}
 
export function ShoppingCartProvider({children} : ShoppingCartProviderProps) {
 
 //useState меняем на useLocalStorage + надо добавить параметр по умолчанию - чтобы сохранять данные Корзины при перезагрузки страницы   
const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', [])
 const [isOpen, setIsOpen] = useState(false)

// через reduce получим сумму всех цен в массиве
const cartQuantity = cartItems.reduce((quantity, item)=> {
  return item.quantity + quantity
}, 0)

// ф. открытия-закрытия  корзины
const openCart = ()=> setIsOpen(true)
const closeCart = ()=> setIsOpen(false)

// ищем товар по id
function getItemQuantity(id: number) {
   return cartItems.find(item => item.id ===id)?.quantity || 0
 }
  // добавляем товар
  function increaseCartQuantity(id: number) { 
  // перед добавлением получаем текущее количество товаров и проверяем, есть ли такой товар вообще в корзине
    setCartItems(currItems => {  
      // проверяем массив и если null добавляем первый товар  сначала у нас кнопка Add to Cart Но после первого товара она пропадает появляется Добавить-Убавить кнопки  - в  else
      if(currItems.find(item => item.id ===id) == null) {
        return [...currItems, {id, quantity: 1}]
      } else {
        // Но если товар уже есть то просто добавляем новое значение
        return  currItems.map(item => {
         if(item.id === id) {
            return { ...item, quantity: item.quantity +1}
          } else {
            // или возвращаем без изменений
            return item
          }
        } )  
      }})}
// удаляем один товар
 function decreaseCartQuantity(id: number) { 
     setCartItems(currItems => {
     if(currItems.find(item => item.id ===id)?.quantity ===1) {
        // вернет все что есть в массиве кроме совпадения id  
        return currItems.filter(item => item.id !== id)
      } else {
       return  currItems.map(item => {
         if(item.id === id) {
            return { ...item, quantity: item.quantity -1}
          } else {
            // или возвращаем без изменений
            return item
          }
        } )  
      }})}
      // очищаем корзину от конкретного товара по id
   function removeFromCart(id: number) { 
    setCartItems( currItems => {
      // получим все товары которые не совпадают с Id - а который совпадает удалится - весь товар данной категории удалится 
    return currItems.filter(item => item.id !== id)
     })
   }   
// передаем все функции и состояния которые выше через value
  return <ShoppingCartContext.Provider value={{getItemQuantity, increaseCartQuantity,  decreaseCartQuantity, removeFromCart, cartItems, cartQuantity, openCart, closeCart}}>
    {children}
    {/* Добавляем корзину */}
    <ShoppingCart isOpen={isOpen}/>
  </ShoppingCartContext.Provider>
}
