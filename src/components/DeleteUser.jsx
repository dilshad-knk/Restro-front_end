import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import instance from '../axios/axios';
import { ToastContainer, toast } from 'react-toastify';


function DeleteUser({id,users,setUsers}) {

    const [show, setShow] = useState(false);
   
    console.log(id);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


  
    const handleConfirm = async()=>{
        setShow(false)
        try {
           const res = await instance.delete(`/users/user/${id}`,{withCredentials: true})

           if (res.data.success) {
            toast.success(res.data.message, {
              onClose: () => {
                setUsers(users.filter((user) => user._id !== id));
              },
              autoClose: 500,
            });
          }

            
        } catch (error) {
            
                toast.error(error.response.data.message);
            
        }
    }

  return (
    
    <>
        <Trash onClick={handleShow}/>
        
        <ToastContainer 
          position="top-center"
          
        />
        

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are u sure you that you want to delete the User ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteUser