import {Row, Col } from 'react-bootstrap'
import { StoreItem } from '../components/StoreItem'
import storeItems from '../data/items.json'
export  function Store() {
  return (
  <>
    <h2 style={{marginBottom:'20px'}}>Каталог</h2>
 <Row md={2} xs={1} lg={3} className='g-3' >
  {
   storeItems.map((item, i)=> { 
    return ( 
      // передаем всю БД в StoreItem через Spread
      <Col key={i}><StoreItem {...item}/></Col>
     )})   
  }
 </Row>
  </>
  )
}
