import React from 'react'
import { Offcanvas, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { formatCurrency } from '../utility/formatCurrency'
import CartItem from './CartItem'
import storeItems from "../data/items.json"
 
type ShoppingCartProps = {
  isOpen: boolean 
}
export function ShoppingCart({isOpen}:ShoppingCartProps ) {
 
  const {closeCart, cartItems} = useShoppingCart()
  return (
 // Offcanvas- эффект слайда в BS
  <Offcanvas className='offCanvas'  show={isOpen} onHide={closeCart} placement='end' >
<Offcanvas.Header closeButton>
  <Offcanvas.Title>Корзина</Offcanvas.Title>
</Offcanvas.Header>
<Offcanvas.Body>
  <Stack gap={3}>
{
 cartItems.map((item, i)=> { 
   return (
      
   <CartItem key={i} {...item}/> 
    )})  
}
 
{/* Сумму получаем через reduce  */}
<div className='ms-auto fw-bold fs-5' >
{/* // получаем отдельный товар */}
Общая сумма {formatCurrency(cartItems.reduce((total, cartItem)=> {
const item = storeItems.find(i => i.id === cartItem.id)
return total + (item?.price || 0) * cartItem.quantity
}, 0)
)}
</div>
  </Stack>
</Offcanvas.Body>
 </Offcanvas>
  )
}
