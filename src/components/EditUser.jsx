import React, { useEffect, useState } from 'react'

import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import instance from '../axios/axios.js';
import { useNavigate, useParams } from 'react-router-dom';

function EditUser() {

    const [validated] = useState(false);
    const [userName, setUserName] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigate =useNavigate()
   
    const {id} = useParams('id');




  useEffect(()=>{

      const getUserDetails = async ()=>{
        try {
        const res = await instance.get(`/users/user/${id}`,{withCredentials: true});

        setUserName(
          res.data.user.fullName
         
        );
        setUserEmail(
          res.data.user.email
         
        )
	

      } catch (error) {

       
        toast.error(error.message);
        
      }
      }

      getUserDetails()
    },[id])



    const handleUserName = (event) =>{

      const name = event.target.value.trim();
      setUserName(name)

      if (name === "") {
          setUserNameError(<ul><li>Please enter your name</li></ul>);
          return false
          
        } else if (name.length < 3) {
          setUserNameError(<ul><li>Enter a valid Name</li></ul>);
          return false

         
        } else if (!/^[a-zA-Z0-9_]+(?: [a-zA-Z0-9_]+)*$/.test(name)) {
          setUserNameError(<ul><li>Username should only contain alphanumeric characters, single space, or underscore</li></ul>);
          return false
          
        } else {
          setUserNameError("");
         
          return true
        }

    };

  const handleUserEmail = (event) => {
      const email = event.target.value.trim();
      setUserEmail(email)
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    
      if (email === "") {
          setEmailError(<ul><li> Please enter your email</li></ul>);
          return false
        
      } else if (!emailPattern.test(email)) {
          setEmailError(<ul><li>Please enter a valid email address</li></ul>);
         return false

      } else {
          setEmailError("");
          return true
      }
    }


    const handleSubmit = async(event) => {
      event.preventDefault();
     
      const isNameValid =  handleUserName({ target: { value: userName } });
      const isEmailValid = handleUserEmail({ target: { value: userEmail } });
     
      
      const form = event.currentTarget;
    
      if (form.checkValidity()=== false || !isNameValid || !isEmailValid ) {
        event.stopPropagation();
        toast.error('fill the valid details')
        console.log();
      } else {
        // If the form is valid, proceed with form submission
      
    
       
       
      try {

        let res = await instance.put(`/users/user/${id}`,{
          fullName : userName,
          email: userEmail
        },{withCredentials:true})

        if (res.data.success){
          toast.success(res.data.message);
          
        // // Set a delay of 2000 milliseconds (2 seconds) before navigating
        // setTimeout(()=>{navigate('/')
        // },2000)
        await new Promise((resolve)=>setTimeout(resolve, 2000));
        navigate('/');
        }
     
       
        
        
      } catch (error) {
        console.log(error.message);
        toast.error(error.message)
      }
     
          
      
    }
  }


  
  return (
    <Container>
    <ToastContainer 
    position="top-center"
    autoClose={2000}
    />
    <Row>
        <Col>
                <h3 className='my-4 text-dark fs-1 mb-5'>Update User :</h3>
        </Col>
    </Row>
    <Row>
        <Col md={6} className="mx-auto">
          <Form noValidate  validated={validated}  onSubmit={handleSubmit} >
                <Form.Group className="mb-4" controlId="formGroupName">
                    <Form.Label className='fw-bold'>Full Name</Form.Label>
                    <Form.Control
                      className='shadow-none'
                      type="text"
                      placeholder="Enter name"
                      
                      onChange={handleUserName}
                      defaultValue={userName}
                      required
                      
                    />

                      {userNameError && <div className='p-1' style={{ color: 'red' }}>{userNameError}</div>}

                    
                </Form.Group>
                <Form.Group className="mb-4" controlId="formGroupEmail">
                    <Form.Label className='fw-bold'>Email</Form.Label>
                    <Form.Control
                      className='shadow-none'
                      type="email"
                      placeholder="Enter Address"
                      
                      onChange={handleUserEmail}
                      required
                      defaultValue={userEmail}
                    />

                      {emailError && <div className='p-1' style={{ color: 'red' }}>{emailError}</div>}

                </Form.Group>
                <Form.Group className="d-flex justify-content-center p-4">
                    <Button type="submit" variant="primary">Update</Button>
                </Form.Group>
            </Form>
        </Col>
    </Row>
</Container>
  )
}

export default EditUser
