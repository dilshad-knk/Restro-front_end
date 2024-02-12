
import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {PencilSquare} from 'react-bootstrap-icons';
import DeleteUser from './DeleteUser';
import instance from '../axios/axios';


function Users() {

    const [users,setUsers] =useState([]);
    const navigate = useNavigate();


    useEffect(
        ()=>{
          
    const getAllUsers = async ()=>{
      try {
          const res = await  instance.get('/users/allUsers',{withCredentials : true});
          setUsers(res.data.users)
      } catch (error) {
          
    
      
        toast.error(`Error: ${error.response.data.message}`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate('/login');
              
    
    }
      
      
    }


    getAllUsers()

        },[navigate]

    
)


  return (
    <Container>
    <ToastContainer 
          position="top-center"
          autoClose={1000}
        />
        <Row>
            <Col>
                <h3 className='my-4 text-dark fs-1 mb-5'>Users</h3>
            </Col>
        </Row>
        <Row>
            <Col>
            <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Edit</th>
          <th>Delete</th>
          
        </tr>
      </thead>
      <tbody>
       
            

            {users && users.map((user, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>
                  <Link to={`/user/${user._id}`}>
                        <PencilSquare/>
                    </Link>    
                </td>
                <td> <DeleteUser id={user._id} users={users} setUsers={setUsers} /></td>


            </tr>
            ))}

       
      </tbody>
    </Table>
  
            </Col>
        </Row>
    </Container>
  )
}

export default Users
