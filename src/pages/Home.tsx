 
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Home() {
 
  return (
 <>
    <h2 style={{marginBottom: '20px'}}>Главная</h2>
    <Link to='/catalog'>
      <Button >
      Перeйти в каталог
     </Button>
     </Link>
 
 </>
  )
}
