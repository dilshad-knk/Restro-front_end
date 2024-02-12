import {Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import About from "./components/About";
import AddRestaurant from "./components/AddRestaurant";
import { Container } from "react-bootstrap";
import MoreDetails from "./components/MoreDetails";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import ProtectedRoute from "./Utils/ProtectedRoute";
import { useSelector } from "react-redux";
import Users from "./components/Users";
import EditUser from "./components/EditUser";



function App() {

  const isAuthenticated =useSelector((state) => state.user.isAuthenticated);
  
  return (
   <Router>
      <div className="d-flex flex-column vh-100">
      <Header/>
      <Container fluid className="flex-grow-1">
      <Routes>

          <Route path="/" element={<Home/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/MoreDetails/:id" element={<MoreDetails/>} />
          <Route path="/signUp" element={<SignUp/>} />
          <Route path="/signIn" element={<SignIn/>} />
          <Route path="/add" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AddRestaurant/></ProtectedRoute>} />
          <Route path="/allUsers" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Users/></ProtectedRoute>} />
          <Route path="/user/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated}><EditUser/></ProtectedRoute>} />

        

         
      </Routes>
      </Container>
      <Footer/>
      </div>
   </Router>
  );
}

export default App;
