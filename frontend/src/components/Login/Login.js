import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import "./Login.css"
import { useDispatch, useSelector } from "react-redux";
import {
  setLogin,
  setUserInfo,
  setLoginGoogel,
  setUserInfoGoogle,
} from "../Redux/reducers/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(true);

  const dispatch = useDispatch();

  const handelLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("https://creative-minds-s3x9.onrender.com/users/login", user)
      .then((result) => {
        console.log(result.data);

        dispatch(setLogin(result.data));
        dispatch(setUserInfo(result.data));
        toHome();
      })
      .catch((err) => {
        console.log(err);
        setDone(false);
      });
  };
  const toHome = () => {
    navigate("/");
  };
  return (
    <>
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow>
          <MDBCol col="10" md="6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </MDBCol>

          <MDBCol col="4" md="6">
            {/* <div className="d-flex flex-row align-items-center justify-content-center">

            <p className="lead fw-normal mb-0 me-3">Sign in with</p>

            <MDBBtn floating size='md' tag='a' className='me-2'>
              <MDBIcon fab icon='facebook-f' />
            </MDBBtn>

            <MDBBtn floating size='md' tag='a'  className='me-2'>
              <MDBIcon fab icon='twitter' />
            </MDBBtn>

            <MDBBtn floating size='md' tag='a'  className='me-2'>
              <MDBIcon fab icon='linkedin-in' />
            </MDBBtn>

          </div> */}

            {/* <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div> */}

            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="formControlLg"
              type="email"
              size="lg"
              onChange={(e) => {
                const email = e.target.value;
                setEmail(email);
              }}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="formControlLg1"
              type="password"
              size="lg"
              onChange={(e) => {
                const password = e.target.value;
                setPassword(password);
              }}
            />

            <div className="d-flex justify-content-between mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="!#">Forgot password?</a>
            </div>

            <div className="text-center text-md-start mt-4 pt-2">
              <MDBBtn className="mb-0 px-5" size="lg" onClick={handelLogin}>
                Login
              </MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an account?{" "}
                <a
                  href="#!"
                  className="link-danger"
                  onClick={() => {
                    navigate("/Register");
                  }}
                >
                  Register
                </a>
              </p>
              <hr className="hr1"/>
              <div className="google">
              <GoogleOAuthProvider clientId="623758713896-qs98f7ph84a1pgflgvg84up6i825a8mv.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                    const token = credentialResponse.credential;

                    dispatch(setLoginGoogel(credentialResponse));
                    dispatch(setUserInfoGoogle(credentialResponse));
                    toHome()
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  auto_select
                />
              </GoogleOAuthProvider>
            </div>
            </div>
          </MDBCol>
        </MDBRow>
            
        {done ? (
          <></>
        ) : (
          <>
            <p>Register Faild</p>{" "}
          </>
        )}
      </MDBContainer>
    </>
  );
};

export default Login;
