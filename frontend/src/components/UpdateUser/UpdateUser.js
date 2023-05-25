import React, { useState, useRef, useEffect } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardImage,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const UpdateUser = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone_no, setPhone_no] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [craft_id, setCraft_id] = useState("");
  const [crafts, setCrafts] = useState("");
  const state = useSelector((state) => {
    return {
      token: state.auth.token,
      userInfo: state.auth.userInfo,
      userId: state.auth.userId,
      mood: state.Mood.mood,
    };
  });
  const token = state.token;

  const uploadImage = () => {
    console.log(image);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "n9udcnak");
    data.append("cloud_name", "dh2mazipf");
    fetch("https://api.cloudinary.com/v1_1/dh2mazipf/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data.url);
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };
  const uploadImage2 = async (i) => {
    console.log(i);
    const data = new FormData();
    data.append("file", i);
    data.append("upload_preset", "n9udcnak");
    data.append("cloud_name", "dh2mazipf");
    await fetch("https://api.cloudinary.com/v1_1/dh2mazipf/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data.url);
        UpdateUser();
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };
useEffect(() => {
  axios
  .get("https://creative-minds-s3x9.onrender.com/crafts/")
  .then((result) => {
    console.log(result.data.result);
   setCrafts(result.data.result);
  })
  .catch((err) => {
    console.log(err);
  });

  
}, [])

  const UpdateUser = async () => {
    
    const newUser = {
      first_name: first_name,
      last_name: last_name,
      phone_no: phone_no,
      craft_id: craft_id,
      user_image: url,
    };
    console.log(newUser);

    try {
      const result = await axios.post(
        "https://creative-minds-s3x9.onrender.com/users/register",
        newUser,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result.data);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        // tologin();
      }, 3000);
      return () => clearTimeout();
    } catch (err) {
      console.log(err);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      return () => clearTimeout();
    }
  };
  return (
    <div>
      <div>{isLoading && <Spinner />}</div>
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
                  Update you information
                </p>

                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="First Name"
                    id="form1"
                    type="text"
                    className="w-100"
                    onChange={(e) => {
                      setFirst_name(e.target.value);
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
                      setLast_name(e.target.value);
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
                      setPhone_no(e.target.value);
                    }}
                  />
                </div >
                <div className="d-flex flex-row align-items-center mb-4">
                <label className="labelc"> crafts:</label>
          <select
          className="select"
            name="category"
            id="category"
            onClick={(e) => {
             setCraft_id(e.target.value)
            }}>
            {crafts &&  crafts.map((craft,i) => {
              console.log('craft:',craft.name);
                return(
                 <option key={craft.id} value={craft.id} >{craft.name}</option>
                 )
            })}
          </select>
          </div>
                {image ? (
                  <img src={url} className="img" />
                ) : (
                  <div
                    className="d-flex flex-row align-items-center mb-4"
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setImage(e.dataTransfer.files[0]);
                      uploadImage2(e.dataTransfer.files[0]);
                    }}
                  >
                    <MDBIcon fas icon="camera-retro me-3" size="lg" />
                    <button
                      className="imgbtn"
                      onClick={(e) => {
                        fileInputRef.current.click();
                      }}
                    >
                      Drag and Drop or Add picture
                      <br></br>
                      <MDBIcon fas size="lg" icon="plus-circle me-3" />
                    </button>
                    <MDBInput
                      label=""
                      id="form4"
                      type="file"
                      style={{ display: "none" }}
                      ref={fileInputRef}
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                        uploadImage2(e.target.files[0]);
                      }}
                    />
                  </div>
                )}
                <MDBBtn className="mb-0 px-5" size="lg" onClick={UpdateUser}>
                update
              </MDBBtn>
                <MDBCardImage
                  src="https://img.freepik.com/premium-photo/man-with-wrench-background-air-conditioner_96743-296.jpg?w=826"
                  fluid
                />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default UpdateUser;
