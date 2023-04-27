import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState ,useRef} from "react";
import Form from "react-bootstrap/Form";
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
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
const CreatePost = () => {
  const fileInputRef =useRef()
  const uploadImage = async (i) => {
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
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  const state = useSelector((state) => {
    return {
      token: state.auth.token,
      mood: state.Mood.mood,
    };
  });
  const mood = state.mood;

  const [url, setUrl] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pricing, setPricing] = useState("");
  const [image, setImage] = useState(" ");
  

  const submitFn = () => {
    console.log(title, description, pricing,state.token);
    axios
      .post(
        `https://creative-minds-s3x9.onrender.com/posts`,
        { title, description, pricing, post_image: url },
        {
          headers: {
            Authorization: state.token,
          },
        }
      )
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="inpust-post">
      <Form>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlInput1"
        ></Form.Group>

        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
        ></Form.Group>
      </Form>
      <MDBContainer fluid>
        <MDBCard
          className={
            mood === "darkMood"
              ? "darkMood text-black m-5navbar"
              : "lightMood text-black m-5navbar"
          }
          style={{ borderRadius: "25px" }}
        >
          <MDBCardBody>
            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="fas fa-heading me-3" size="lg"
                  className={
                    mood === "darkMood"
                      ? "darkMood"
                      : "lightMood"
                  } />
                  <MDBInput
                    label="Title"
                    id="form1"
                    type="text"
                    className={
                      mood === "darkMood"
                        ? "darkMood w-100"
                        : "lightMood w-100"
                    }
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas 
                  icon="fas fa-highlighter me-3"
                   size="lg"
                   className={
                    mood === "darkMood"
                      ? "darkMood"
                      : "lightMood"
                  } />
                  <MDBInput
                  className={
                    mood === "darkMood"
                      ? "darkMood w-100"
                      : "lightMood w-100"
                  }
                    label="Description"
                    id="form1"
                    type="text"
                    
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon
                    fas
                    icon=" fas fa-money-bill-1-wave me-3"
                    size="lg"
                    className={
                      mood === "darkMood"
                        ? "darkMood"
                        : "lightMood"
                    }
                  />

                  <MDBInput
                    label="Pricing"
                    id="form1"
                    type="text"
                    className={
                      mood === "darkMood"
                        ? "darkMood w-100"
                        : "lightMood w-100"
                    }
                    
                    onChange={(e) => {
                      setPricing(e.target.value);
                    }}
                  />
                </div>
                <div
                  className="d-flex flex-row align-items-center mb-4"
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setImage(e.dataTransfer.files[0]);
                    uploadImage(e.dataTransfer.files[0]);
                  }}
                >
                  <MDBIcon fas icon="camera-retro me-3" size="lg" 
                  className={
                    mood === "darkMood"
                      ? "darkMood"
                      : "lightMood"
                  }/>
                  <button className="imgbtn" onClick={(e) => { fileInputRef.current.click()}}>
                    take image from your device
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
                      uploadImage(e.target.files[0]);
                    }}
                  />
                </div>
                ============================
                <MDBBtn className={
                      mood === "darkMood"
                        ? "darkMood mb-4"
                        : "lightMood mb-4"
                    }size="lg" onClick={submitFn}>
                  Submit
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};
export default CreatePost;
