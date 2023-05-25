import { useDispatch, useSelector } from "react-redux";
import "./style.css";

import { useState, useRef } from "react";
import axios from "axios";
import { MDBIcon, MDBInput } from "mdb-react-ui-kit";
import { setLogout } from "../Redux/reducers/auth";
import { useNavigate } from "react-router-dom";
const UpdateProfile = () => {
  const state = useSelector((state) => {
    return {
      userId: state.auth.userId,
      token: state.auth.token,
      userInfo: state.auth.userInfo,
      image: state.auth.user_image,
      language: state.auth.language
    };
  });
  const navigate = useNavigate();
  const dispath = useDispatch();
  const fileInputRef = useRef();
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const [first_name, setFirst_name] = useState(state.userInfo.first_name);
  const [last_name, setLast_name] = useState(state.userInfo.last_name);
  const [phone_no, setPhone_no] = useState(state.userInfo.Phone_Number);
  const [user_image, setUser_image] = useState(state.image);
  const [isLoading, setIsLoading] = useState(false);
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
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  const logout = () => {
    setIsLoading(true);
    dispath(setLogout());
    navigate("/login");
  };

  const updateFn = (url2) => {
    axios.put(
      "https://creative-minds-s3x9.onrender.com/users/updateUser",
      { first_name, last_name, phone_no, user_image: url2 },
      { headers: { Authorization: state.token } }
    );
    try {
      logout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container-profile">
      <div className="card-profile">
        <div className="card-header-profile">
          <h1 className="header-title-profile">{state.language=="ar"?"معلوماتي الشخصية":"Personal Information"}</h1>
        </div>
        {state.language=="ar"?
          <div className="card-body-profile" >
            <form style={{textAlign:"right"}}>
              <div className="form-group-profile">
                <label htmlFor="firstName" className="label-profile" style={{textAlign:"right"}}>
                  الاسم الاول{" "}
                </label>
                <input
                  onChange={(e) => {
                    setFirst_name(e.target.value);
                  }}
                  className="input-profile"
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder={first_name}
                  required
                  
                />
              </div>
              <div className="form-group-profile">
                <label htmlFor="lastName" className="label-profile" style={{textAlign:"right"}}>
                  اسم العائلة{" "}
                </label>
                <input
                  onChange={(e) => {
                    setLast_name(e.target.value);
                  }}
                  className="input-profile"
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder={last_name}
                  required
                />
              </div>
              <div className="form-group-profile">
                <label htmlFor="phone" className="label-profile" style={{textAlign:"right"}}>
                  رقم الهاتف{" "}
                </label>
                <input
                  onChange={(e) => {
                    setPhone_no(e.target.value);
                  }}
                  className="input-profile"
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder={phone_no}
                  required
                />
              </div>
              <div className="form-group-profile">
                <label htmlFor="image" className="label-profile" style={{textAlign:"right"}}>
                  قم بتحميل صورة
                </label>

                {image ? (
                  <img src={url} className="img" />
                ) : (
                  <div style={{marginLeft:"26%"}}
                    className="d-flex flex-row align-items-center mb-4 updateimg"
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
                      قم بتحميل الصورة هنا
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
              </div>
            </form>
            <button
              onClick={() => {
                updateFn(url);
              }}
              type="submit"
              className="button-profile"
            >
              تأكيد المعلومات
            </button>
          </div>
        :
        <div className="card-body-profile">
          <form>
            <div className="form-group-profile">
              <label htmlFor="firstName" className="label-profile">
                First Name{" "}
              </label>
              <input
                onChange={(e) => {
                  setFirst_name(e.target.value);
                }}
                className="input-profile"
                type="text"
                id="firstName"
                name="firstName"
                placeholder={first_name}
                required
              />
            </div>
            <div className="form-group-profile">
              <label htmlFor="lastName" className="label-profile">
                Last Name{" "}
              </label>
              <input
                onChange={(e) => {
                  setLast_name(e.target.value);
                }}
                className="input-profile"
                type="text"
                id="lastName"
                name="lastName"
                placeholder={last_name}
                required
              />
            </div>
            <div className="form-group-profile">
              <label htmlFor="phone" className="label-profile">
                Phone{" "}
              </label>
              <input
                onChange={(e) => {
                  setPhone_no(e.target.value);
                }}
                className="input-profile"
                type="tel"
                id="phone"
                name="phone"
                placeholder={phone_no}
                required
              />
            </div>
            <div className="form-group-profile">
              <label htmlFor="image" className="label-profile">
                Upload Image
              </label>

              {image ? (
                <img src={url} className="img" />
              ) : (
                <div
                  className="d-flex flex-row align-items-center mb-4 updateimg"
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
            </div>
          </form>
          <button
            onClick={() => {
              updateFn(url);
            }}
            type="submit"
            className="button-profile"
          >
            Submit
          </button>
        </div>
        }
      </div>
    </div>
  );
};
export default UpdateProfile;
