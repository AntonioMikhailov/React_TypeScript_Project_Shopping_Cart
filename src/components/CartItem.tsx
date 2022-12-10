 
import { Button, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
// импортируем БД  
import storeItems from '../data/items.json'
import { formatCurrency } from '../utility/formatCurrency'
type CartItemProps = {
  id: number
  quantity: number 
}
 
export default function CartItem({id, quantity}: CartItemProps) {
  
const {removeFromCart} = useShoppingCart()

const item = storeItems.find(i => i.id === id)
if( item == null) return null

 return (
 <Stack direction='horizontal' gap={2} className='d-flex align-items-center' >
<img src={item.imgUrl} alt="s" style={{width: '125px', height: '75px', objectFit: 'cover' }} />
<div className='me-auto' >
  {/* Добавляем к названию товара его кол-во */}
  <div>{item.name} {quantity > 0 && (<span className='text-muted' style={{fontSize: '14px'}} >x{quantity}</span>)
 }
  </div>
  {/* Price */}
<div className='text-muted' style={{fontSize: '14px'}} >{formatCurrency(item.price)}</div>
</div>
{/* Total Price  */}
<div className=' ' style={{fontSize: '14px'}}>{formatCurrency(item.price * quantity) }</div>
<Button variant='outline-danger' size='sm' onClick={()=> removeFromCart(item.id)}>&times;</Button>

 </Stack>
  )
}
