import "./Navbar.css"
import { BsFillHouseFill,BsPersonCheckFill } from 'react-icons/bs';
import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../Redux/reducers/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { BsFillHouseFill } from "react-icons/bs";


const Navbars = () => {
  const [imageP,setImageP] = useState("")
  const [craft,setCraft] = useState("")
  const [moodstate, setMoodstate] = useState(false);
  const navigate = useNavigate();
  const dispath = useDispatch();
  const logout = () => {
    dispath(setLogout());
  };
  const state = useSelector((state) => {
    
    return {
      isLoggedIn: state.auth.isLoggedIn,
      token: state.auth.token,
    };
  });
  
  let newTheme = moodstate ? "lightMood" : "darkMood";
  const getImage = ()=>{
    axios
      .get(`http://localhost:5000/users/`,{headers:{Authorization: state.token}})
      .then((result)=>{
        setCraft(result.data.user[0].craft_id);
        setImageP(result.data.user[0].user_image);
        console.log(result.data.user[0].user_image);
      })
      .catch((err)=>{
          console.log(err);
      })
  }
  useEffect(()=>{
    getImage()
 
  },[])
  return (
    <div className="navBar-container">
      <Navbar collapseOnSelect expand="lg"  className="background-navbar">
      <Navbar.Brand style={{marginLeft:"1%"}}>
        Maintenance services <BsFillHouseFill style={{marginLeft:"10px"}}
        onClick={()=>{
          navigate('/')
        }}
        /></Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Form className="d-flex leeft-margin-search">
              <Form.Control type="search" placeholder="Search" className="me-2"
                aria-label="Search"/>
              <Button variant="danger">Search</Button>
              {/* primary secondary success  danger warning  info light dark */}
            </Form>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="to-left">
            {state.isLoggedIn?
            <>
            <img
              src={imageP}
              alt="Profile Pic"
              style={{ width: '55px', height: '55px', borderRadius: '50%', marginRight: '10px' }}
            />
            <NavDropdown id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={()=>{
                navigate("/Dashboard/provider")
              }}>DashBoard</NavDropdown.Item>
              {craft?
                <NavDropdown.Item onClick={()=>{navigate("/CreatePost")}}>Create Announcement</NavDropdown.Item>
                :
                <NavDropdown.Item onClick={()=>{navigate("/CreateCrafts")}}>Become a service provider</NavDropdown.Item>
              }
              <NavDropdown.Item onClick={logout}>logout</NavDropdown.Item>
            </NavDropdown>
            </>
            :
            <Nav.Link style={{ fontSize: '18px' }} onClick={()=>{navigate(`/login`)}}>login <BsPersonCheckFill/></Nav.Link>
            }
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    </div>
  );
};

export default Navbars;
