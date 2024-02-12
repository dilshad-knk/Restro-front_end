import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Restaurants.css'

function Restaurants({restaurant}) {
  
  console.log(restaurant.photograph)
  

  return (
    <Card>
      
        <Card.Img variant="top" src={process.env.REACT_APP_SERVER_URL + restaurant.photograph} className='card-img12 card-img-fixed-height'/>
        
       
        <Card.Body>
            <Card.Title>{restaurant.name}</Card.Title>
		<div className='mb-2 mt-4'>
			             <Card.Text className='m-0' >
					{restaurant.neighborhood}
				    </Card.Text>
				    <Card.Text className='m-0' >
					{restaurant.address}
				    </Card.Text>
		</div>
            <Button as={Link} to ={`/MoreDetails/${restaurant._id}`} variant="dark">More Details </Button>
        </Card.Body>
    </Card>
  )
}

export default Restaurants
