
import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { USER_AUTH_SUCCESS } from '../Redux/userAuthenticate';
import instance from '../axios/axios';

function SignIn() {

    const [validated, setValidated] = useState(false);
    const [userEmail,setUserEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [userPassword,setuserPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();



    const handleUserEmail = (event) => {
      const email = event.target.value.trim();
      setUserEmail(email)
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    
      if (email === "") {
          setEmailError(<ul><li> Enter your email</li></ul>);
          setValidated(false);
        
      } else if (!emailPattern.test(email)) {
          setEmailError(<ul><li>Enter a valid email address</li></ul>);
          setValidated(false);

      } else {
          setEmailError("");
          setValidated(true);
      }
    }


    const handlePassword = (event)=>{

      const password = event.target.value.trim();
      setuserPassword(password);

        if(!password){
          setPasswordError(<ul><li>Fill your Password</li></ul>);

          setValidated(false);
        } else {
          setValidated(true);
        }


    }

    const handleSubmit = async(e)=>{

      e.preventDefault();

      const form = e.currentTarget

      if (form.checkValidity() === false) {
        e.stopPropagation();
        toast.error('fill the valid details')
        setValidated(false);
      } else {
        // If the form is valid, proceed with form submission
        setValidated(true);
    
        // request to your backend
       
        try {

          let res = await instance.post('/users/login', {
            email: userEmail,
            password: userPassword,
          }
            ,
            {withCredentials: true, 
          })
          console.log(res)
          if(res.data.isAuthenticated){
            dispatch(USER_AUTH_SUCCESS(res.data))
          }
       

          if (res.data.success){
            toast.success(res.data.message);
          
            // Set a delay of 2000 milliseconds (2 seconds) before navigating
            await new Promise((resolve)=>setTimeout(resolve, 2000));
            navigate('/');
          } 
     
        } catch (error) {
          if (error.response && error.response.data && error.response.data.message) {
              toast.error(error.response.data.message);
          } else {
              // If the expected properties are not present, provide a generic error message
              toast.error("An error occurred during the request");
          }
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
            <h3 className='my-4 text-dark fs-1 mb-5'>Sign In :</h3>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mx-auto">
            <Form noValidate  validated={validated}  onSubmit={handleSubmit} >
              <Form.Group className="mb-4" controlId="formGroupEmail">
                <Form.Label className='fw-bold'>Email</Form.Label>
                <Form.Control
                  className='shadow-none'
                  type="email"
                  placeholder="Enter Address"
                  value={userEmail}
                  onChange={handleUserEmail}
                  required
                />

                {emailError && <p className='p-1' style={{ color: 'red' }}>{emailError}</p>}
              </Form.Group>
              <Form.Group className="mb-4" controlId="formGroupPassword">
                <Form.Label className='fw-bold'>Password</Form.Label>
                <Form.Control
                  className='shadow-none'
                  type="password"
                  placeholder="Enter Password"
                  value={userPassword}
                  onChange={handlePassword}
                  required
                />
                {passwordError && <p className='p-1'  style={{ color: 'red' }}>{passwordError}</p>}
              </Form.Group>
              <Form.Group className="d-flex justify-content-center p-4">
                <Button type="submit" variant="primary">Submit</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    );
}

export default SignIn;
