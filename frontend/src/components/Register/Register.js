import React, { useEffect, useState,useRef } from "react";
import "./Register.css";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

function Register() {
  const navigate = useNavigate();
  const fileInputRef =useRef()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [role, setRole] = useState("2");
  const [phone_no, setPhone_no] = useState("");
  const [done, setDone] = useState(true);
  const [image, setImage] = useState('')
  const [ url, setUrl ] = useState("");
const uploadImage = (pas) => {
  console.log(image);
const data = new FormData()
data.append("file", image)
data.append("upload_preset", "n9udcnak")
data.append("cloud_name","dh2mazipf")
fetch("https://api.cloudinary.com/v1_1/dh2mazipf/image/upload",{
method:"post",
body: data
})
.then(resp => resp.json())
.then(data => {
  console.log(data.url);
  handelRegister(pas)
  setUrl(data.url)
})
.catch(err => console.log(err))
}
const uploadImage2 = async(i) => {
  console.log(i);
const data = new FormData()
data.append("file", i)
data.append("upload_preset", "n9udcnak")
data.append("cloud_name","dh2mazipf")
await fetch("https://api.cloudinary.com/v1_1/dh2mazipf/image/upload",{
method:"post",
body: data
})
.then(resp => resp.json())
.then(data => {
  console.log(data.url);
  setUrl(data.url)
})
.catch(err => console.log(err))
}

  const handelRegister = async(password) => {
    console.log(password);
    const newUser = {
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
      phone_no: phone_no,
      role_id: role,
      craft_id: "",
      user_image:url
    };
console.log(newUser);
    
      try{
        const result= await axios
      .post("https://creative-minds-s3x9.onrender.com/users/register", newUser)
        console.log(result.data);
        tologin()
      }
      
      catch(err){
        console.log(err);
        setDone(false)
      };
  };
  const tologin = ()=>{
    navigate("/login")
  }
 return (
    <>
    
      <MDBContainer fluid>
        <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Sign up
                </p>

                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="First Name"
                    id="form1"
                    type="text"
                    className="w-100"
                    onChange={(e) => {
                      const name = e.target.value;
                      setFirst_name(name);
                    }}
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="Last Name"
                    id="form5 "
                    type="text"
                    className="w-100"
                    onChange={(e) => {
                      const name = e.target.value;
                      setLast_name(name);
                    }}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    label="Your Email"
                    id="form2"
                    type="email"
                    onChange={(e) => {
                      const email = e.target.value;
                      setEmail(email);
                    }}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    label="Password"
                    id="form3"
                    type="password"
                    onChange={(e) => {
                      const Password1 = e.target.value;
                      setPassword1(Password1);
                    }}
                  />
                </div>
                
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size="lg" />
                  <MDBInput
                    label="Repeat your Password"
                    id="form4"
                    type="password"
                    onChange={(e) => {
                      const Password2 = e.target.value;
                      setPassword2(Password2);
                    }}
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="phone-alt me-3" size="lg" />
                  <MDBInput
                    label="your phone"
                    id="form3"
                    type="tel"
                    onChange={(e) => {
                      const phone = e.target.value;
                      setPhone_no(phone);
                    }}
                  />
                </div>
                {image ? <img src={url} className="img"/>:
                <div className="d-flex flex-row align-items-center mb-4" onDragOver={(e)=>{
e.preventDefault();
                }}
                onDrop={(e)=>{
e.preventDefault()
setImage(e.dataTransfer.files[0])
uploadImage2(e.dataTransfer.files[0])

                }}>
                  <MDBIcon  fas icon="camera-retro me-3"size="lg" />
                  <button className="imgbtn" onClick={(e)=>{
                    fileInputRef.current.click()
                  }}>Drag and Drop or Add picture 
                  <br></br>
                  <MDBIcon fas  size ='lg'icon="plus-circle me-3" /></button>
                  <MDBInput
                    label=""
                    id="form4"
                    type="file"
                    style={{display:'none'}}
                    ref={fileInputRef}
                    onChange={(e) => {
                      // console.log(e.target.files[0]);
                      setImage(e.target.files[0])
                      uploadImage2(e.target.files[0])
                      
                    }}
                  />
                </div>}

                <MDBBtn
                  className="mb-4"
                  size="lg"
                  onClick={() => {
                    password1 !== password2 ? (
                      setDone(!done)
                    ) : (
                      <>
                        {setPassword(password1)}
                        {uploadImage(password1)}
                      </>
                    );
                  }}
                >
                  Register
                </MDBBtn>
              {done ? <></> :<><p>Register Faild</p> </> }
              </MDBCol>
              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center"
              >
                <MDBCardImage src="./media/Maintenance-bro.png" fluid />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  )
}

export default Register;
