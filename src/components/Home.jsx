import React, { useEffect } from 'react'
import Restaurants from './Restaurants'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurant } from '../Redux/restaurantSlice';
import { Col, Container, Row } from 'react-bootstrap';
import instance from '../axios/axios';
import { ToastContainer, toast } from 'react-toastify';

function Home() {
  



  const dispatch = useDispatch();
  const restaurants = useSelector((state) => state.restaurants.data)

  useEffect (() =>{
        

    // fetch('./restaurants.json')
    //     .then((res) => res.json())
    //     .then((data) => dispatch(getRestaurant(data.restaurants)))

    const getRestaurantsList = async ()=>{

      try {
        
        const res = await instance.get('/restaurant/restaurants');

        if(!res.data.success){
          toast.error(res.data.message);
        }
        console.log(res);
        dispatch(getRestaurant(res.data.restaurants))

      } catch (error) {
        toast.error(error.message);
      }

    }

    getRestaurantsList();
    
},[dispatch])
  
    
  
  return (
    <Container>

    <ToastContainer 
        position="top-center"
        autoClose={1000}
        />
    <Row>

        {restaurants && (

            restaurants.map((restaurant) => ( 
            
            <Col className='py-3' md={3} key={restaurant._id}>  {/*or restaurants.id   as id is unique*/}
                <Restaurants restaurant={restaurant}/> {/*implicit that the value is to be returned,,used parantheses*/}
            
            </Col>))
        )

        }
          
      
    </Row>
</Container>
  )
}

export default Home
