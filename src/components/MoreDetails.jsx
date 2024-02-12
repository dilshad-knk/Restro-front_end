import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './MoreDetails.css'

function MoreDetails() {


    const {id} = useParams();

    const restaurants = useSelector((state) => state.restaurants.data )

   
    const restaurant = restaurants.find((res) => res._id === id);

  return (
   
    <Container>
    {restaurant && (

  <Row >
    <Col className='py-3' md={7}>
        <Card  >
            <Card.Img variant="top" src={process.env.REACT_APP_SERVER_URL + restaurant.photograph}  
           className="img-fluid mw-100 card-imgd" />
            
        </Card>
          
    </Col>
    
    <Col className='py-3'>
           <h1>{restaurant.name}</h1>
         	
          <Card  >
         <Card.Body>
                <Card.Title>Location</Card.Title>
                <Card.Text>
                  {restaurant.address}
                </Card.Text>
                 
            </Card.Body>
	 </Card>	
		
          {/* <h5 className='mb-3 mt-5'>Operating Hours</h5>

          <ListGroup variant="flush">
            <ListGroup.Item>Monday : {restaurant.operating_hours.Monday}</ListGroup.Item>
            <ListGroup.Item>Tuesday : {restaurant.operating_hours.Tuesday}</ListGroup.Item>
            <ListGroup.Item>Wednesday : {restaurant.operating_hours.Wednesday}</ListGroup.Item>
            <ListGroup.Item>Thursday : {restaurant.operating_hours.Thursday}</ListGroup.Item>
            <ListGroup.Item>Friday : {restaurant.operating_hours.Friday}</ListGroup.Item>
            <ListGroup.Item>Saturday : {restaurant.operating_hours.Saturday}</ListGroup.Item>
            <ListGroup.Item>Sunday : {restaurant.operating_hours.Sunday}</ListGroup.Item>
            
          </ListGroup> */}


    </Col>
  </Row>
  
)}


</Container>

  )
}

export default MoreDetails
