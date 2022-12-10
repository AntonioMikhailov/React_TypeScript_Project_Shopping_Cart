import { Card, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utility/formatCurrency";
 
type StoreItemsProps = {
  id: number;  
  name: string;
  price: number;
  imgUrl: string;
};

export function StoreItem({ id, name, price, imgUrl }: StoreItemsProps) {
  const {getItemQuantity, increaseCartQuantity,  decreaseCartQuantity, removeFromCart} = useShoppingCart()
const quantity = getItemQuantity(id)   
 // это количество товаров в корзине Если  = 0 то будем показывать кнопку Add to Cart, если уже есть товары в корзине то покажем кнопки Добавить-Удалить
  return (
    <Card className='h-100'>
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline  " style={{marginBottom: '0px'}}>
      <span className='title-item'   >{name}</span>
      {/* Вызываем  formatCurrency и передаем число - он возвратит его с символом валюты */}
      <span className='ms-2 text-muted' > {formatCurrency(price)}</span>
        </Card.Title>
        <hr />
        <div className="mt-auto">
         {quantity === 0 ? (
               <Button className='w-100' onClick={()=> increaseCartQuantity(id)} >+ Добавить в корзину</Button> 
         )  :
         <div className='d-flex align-items-center flex-column' style={{gap: '10px'}} >
            <div className='d-flex align-items-center justify-content-center' style={{gap: '10px'}}>
             <Button onClick={()=> decreaseCartQuantity(id)}> - </Button>
          <div> 
            <span className='fs-3'> {quantity} </span>в корзине </div>
             <Button onClick={()=> increaseCartQuantity(id)} > + </Button>
              </div>
              <Button variant='danger' size='sm' onClick={()=> removeFromCart(id)}>Удалить </Button>
         </div> }
        </div>
      </Card.Body>
    </Card>
  );
}
