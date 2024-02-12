// import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import instance from '../axios/axios.js';
import { ToastContainer, toast } from 'react-toastify';


function Addrestaurant() {


    const [validated, setValidated] = useState(false);
    const [restaurantDetails,setRestaurantDetails] = useState({
        name:'',
        address:'',
        neighborhood:'',
        cuisine:'',
        photograph:''


    });
    
     const navigate = useNavigate();
  
    console.log(restaurantDetails);

    const handleSubmit = async (event) => {
      event.preventDefault();
      const form = event.currentTarget;

      if (form.checkValidity() === false) {
        
        event.stopPropagation();
        console.log('checkvalidity error')
        
      }  else{
        
        
        const formData = new FormData();
        
        	formData.append('name',restaurantDetails.name);
        	formData.append('address',restaurantDetails.address);
        	formData.append('neighborhood',restaurantDetails.neighborhood);
        	formData.append('cuisine',restaurantDetails.cuisine);
        	formData.append('photograph',restaurantDetails.photograph);
        	
        
        
        
        try {
        	
		const res = await instance.post('/restaurant/add',
			  {withCredentials: true,
			});

				
		if (!res.data.success) {
		  toast.error(res.data.message);
		  console.log(res.data.message);
		} else {
		  toast.success(res.data.message);
		  console.log(res.data.message, 'success');
		  await new Promise((resolve) => setTimeout(resolve, 2000));
		  navigate('/');
		}

        } catch (error) {
        
        	 toast.error(error.response.data.message);
        	
        
        }
        
  
      }
       
      setValidated(true);
     
    
     
      // axios.post('',restaurantDetails)
    };
  return (
    <Container>
    
    	 <ToastContainer 
        position="top-center"
        autoClose={1000}
        />
        <Row>
            <Col>
                    <h3 className='my-4 text-dark fs-1 mb-5'>Add New Restaurant :</h3>
            </Col>
        </Row>
        <Row>
            <Col md={6} className="mx-auto">
              <Form noValidate validated={validated} onSubmit={handleSubmit} >
                    <Form.Group className="mb-4" controlId="formGroupName">
                        <Form.Label className='fw-bold'>Restaurant Name</Form.Label>
                        <Form.Control
                          className='shadow-none'
                          type="text"
                          placeholder="Enter Restaurant name"
                          onChange= {(e)=> setRestaurantDetails({...restaurantDetails,name: e.target.value})}
                          required
                        />
                        
                        
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formGroupAddress">
                        <Form.Label className='fw-bold'>Address</Form.Label>
                        <Form.Control
                          className='shadow-none'
                          type="text"
                          placeholder="Enter Address"
                          onChange={(e)=> setRestaurantDetails({...restaurantDetails,address:e.target.value})}
                          required
                        />
                         
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formGroupAddress">
                        <Form.Label className='fw-bold'>Neighborhood</Form.Label>
                        <Form.Control
                          className='shadow-none'
                          type="text"
                          placeholder="Enter Neighborhood"
                          onChange={(e)=> setRestaurantDetails({...restaurantDetails,neighborhood:e.target.value})}
                          required
                        />
                         
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState" className="mb-4">
                        <Form.Label className="fw-bold">Cuisine Type</Form.Label>
                        <Form.Select  defaultValue = "Choose..."  onChange={(e)=> setRestaurantDetails({...restaurantDetails,cuisine:e.target.value})} required>
                            <option>Indian</option>
                            <option>Chinese</option>
                            <option>Italian</option>
                            <option>Arabic</option>


                        </Form.Select>
                     </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label className="fw-bold">Upload Restaurant Photo</Form.Label>
                            <Form.Control 
                            className='shadow-none'  
                            type="file" 
                            onChange= {(e)=> setRestaurantDetails({...restaurantDetails, photograph: e.target.files[0]})}

                            required />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-center p-4">
                        <Button type="submit" variant="primary">Submit</Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </Container>
  )
}

export default Addrestaurant
