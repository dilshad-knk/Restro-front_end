import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { userLogout } from '../Redux/userAuthenticate';
import cookie from "js-cookie";

function Header() {

  const isAuthenticated = useSelector((state)=> state.user.isAuthenticated)
  const dispatch = useDispatch();
  const navigate =useNavigate();


  const handleLogout =()=>{
        dispatch(userLogout());
        cookie.remove('rest_token');
        navigate('/signin')
  }






  return (
    <Navbar expand="sm" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand className='p-2 fs-3' as={Link} to="/">
        Restro
      </Navbar.Brand>
      <Nav className="me-auto d-flex flex-row shadow-none">
        
      </Nav>
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
      <Navbar.Collapse id="responsive-navbar-nav">
       
        <Nav>
           <NavLink className={({isActive}) => isActive ? 'text-warning nav-link' : 'text-white nav-link'} to ="/"> Home</NavLink>
           <NavLink className={({isActive}) => isActive ? 'text-warning nav-link' : 'text-white nav-link'} to ="/contact"> Contact</NavLink>
           <NavLink className={({isActive}) => isActive ? 'text-warning nav-link' : 'text-white nav-link'} to ="/about">About</NavLink>
           <NavLink className={({isActive}) => isActive ? 'text-warning nav-link' : 'text-white nav-link'} to ="/add">Add</NavLink>
           <NavLink className={({isActive}) => isActive ? 'text-warning nav-link' : 'text-white nav-link'} to ="/allUsers">Users</NavLink>
      
        </Nav>

        <Nav className='ms-auto'>
           
            <NavLink className={({isActive}) => isActive ? 'text-warning nav-link' : 'text-white nav-link'} to ="/signUp">Signup</NavLink>
            
            {isAuthenticated? <Button className='ms-3' onClick={handleLogout}>Logout</Button> : <Button><NavLink style={{ textDecoration: 'none' }}  className='text-white no-underline'  to ="/signin">SignIn</NavLink></Button>}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header


