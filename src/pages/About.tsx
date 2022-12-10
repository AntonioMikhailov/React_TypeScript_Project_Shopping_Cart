import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

 

export  function About() {
  return (
  <>
 
    <h2 style={{marginBottom: '20px'}}>О нас</h2>
    <Link to='/catalog'>
      <Button >
      Перeйти в каталог
     </Button>
     </Link>

  </>
  )
}
