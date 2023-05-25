import React, { useState, useEffect } from "react";
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
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setLogin,
  setUserInfo,
  setLoginGoogel,
  setUserInfoGoogle,
} from "../Redux/reducers/auth";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../Spinner/Spinner.js";
import { setCounterNotification } from "../Redux/reducers/noti";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      language: state.auth.language
    };
  });

  const handelLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("https://taslee7-com.onrender.com/users/login", user)
      .then((result) => {
        axios
          .get(`https://taslee7-com.onrender.com/notifications`, {
            headers: {
              Authorization: result.data.token,
            },
          })
          .then((result) => {
            dispatch(setCounterNotification(result.data.notification));
          })
          .catch((err) => {
            console.log(err);
          });


        dispatch(setLogin(result.data));
        dispatch(setUserInfo(result.data));
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          handleClickS();
          setTimeout(() => {
            navigate("/");
          }, 2000);
          return () => clearTimeout();
        }, 3000);

        return () => clearTimeout();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setDone(false);
          handleClickF();
        }, 3000);

        return () => clearTimeout();
      });
  };
  const handleClickF = () => {
    if (state.language=="ar") {
    toast.error("فشلت عملية الدخول");
  }else{
    toast.error("Login Failed");
  }
  };
  const handleClickS = () => {
    if (state.language=="ar") {
      toast.success("تم الدخول بنجاح", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
      });
    }else{
    toast.success("Login Successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
    });}
  };

  return (
    <>
      <div>{isLoading && <Spinner />}</div>
      
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow>
          {state.language=="ar"?<>
        
          <MDBCol col="4" md="6">
            <MDBInput
              wrapperClass="mb-4"
              label="الايميل"
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
              label="كلمة الأمان"
              id="formControlLg1"
              type="password"
              size="lg"
              onChange={(e) => {
                const password = e.target.value;
                setPassword(password);
              }}
            />
        

            <div className=" justify-content-between mb-4" style={{marginLeft:"90%"}}>
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="تذكرني"
              />
            </div>

            <div className="text-center text-md-start mt-4 pt-2" style={{textAlign:"right"}}>
              <div style={{textAlign:"right"}}>
                <MDBBtn
                  className="mb-0 px-5"
                  style={{ backgroundColor: "#223d66" }}
                  size="lg"
                  onClick={handelLogin}
                >
                  الدخول
                </MDBBtn>
                <ToastContainer />
              </div>

              <p className="small fw-bold mt-2 pt-1 mb-2" style={{textAlign:"right"}}>
                لا تملك حساب؟{" "}
                <a
                  href="#!"
                  className="link-danger"
                  onClick={() => {
                    navigate("/Register");
                  }}
                >
                  سجل الان
                </a>
              </p>
              <hr className="hr1" style={{width:"40%",marginLeft:"60%"}}/>
              <div className="google" style={{width:"40%",marginLeft:"63%",display:"right"}}>
                <GoogleOAuthProvider clientId="623758713896-qs98f7ph84a1pgflgvg84up6i825a8mv.apps.googleusercontent.com">
                  <GoogleLogin
                  
                    onSuccess={(credentialResponse) => {
                      console.log(credentialResponse);
                      const token = credentialResponse.credential;

                      dispatch(setLoginGoogel(credentialResponse));
                      dispatch(setUserInfoGoogle(credentialResponse));
                      navigate("/");
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


          <MDBCol col="10" md="6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </MDBCol>

          </>:<>
          <MDBCol col="10" md="6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </MDBCol>

          <MDBCol col="4" md="6">
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
              <div>
                <MDBBtn
                  className="mb-0 px-5"
                  style={{ backgroundColor: "#223d66" }}
                  size="lg"
                  onClick={handelLogin}
                >
                  Login
                </MDBBtn>
                <ToastContainer />
              </div>

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
              <hr className="hr1" />
              <div className="google">
                <GoogleOAuthProvider clientId="623758713896-qs98f7ph84a1pgflgvg84up6i825a8mv.apps.googleusercontent.com">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      console.log(credentialResponse);
                      const token = credentialResponse.credential;

                      dispatch(setLoginGoogel(credentialResponse));
                      dispatch(setUserInfoGoogle(credentialResponse));
                      navigate("/");
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
          </>}
          

        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default Login;
