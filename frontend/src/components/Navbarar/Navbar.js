import "./Navbar.css";
import { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector, useDispatch } from "react-redux";
import { setLogout, setNotification } from "../Redux/reducers/auth";
import { setCounterNotification } from "../Redux/reducers/noti";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { changeMood } from "../Redux/reducers/mood";
import {
  BsFillHouseGearFill,
  BsFillBarChartFill,
  BsChatDotsFill,
  BsFillPlusSquareFill,
  BsFillPlusCircleFill,
  BsBoxArrowInLeft,
  BsSpellcheck
} from "react-icons/bs";
import GetAllNotification from "../GetNotification";
import { setLanguage } from "../Redux/reducers/auth";
const Navbarar = () => {
  const [moodstate, setMoodstate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notiShow, setNotiShow] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    setIsLoading(true);
    setNotificationsCount(0);
    navigate(`/login`);
    dispatch(setLogout());
  };
  const state = useSelector((state) => {
    console.log();
    return {
      isLoggedIn: state.auth.isLoggedIn,
      token: state.auth.token,
      user_image: state.auth.user_image,
      craft: state.auth.userInfo.craft_id,
      noNotification: state.noti.counterNotification,
      mood: state.Mood.mood,
    };
  });
  const mood = state.mood;

  const [notificationsCount, setNotificationsCount] = useState(
    state.noNotification
  );

  let newTheme = moodstate ? "lightMood" : "darkMood";
  return (
    <>
      <div
        className={
          mood === "darkMood"
            ? "darkMood navBar-container"
            : "lightMood navBar-container"
        }
      >
        <Navbar collapseOnSelect expand="lg" className="background-navbar" style={{boxShadow:"none"}}>
          <Navbar.Collapse
            id="responsive-navbar-nav"
            style={{ marginLeft: "3%" }}
          >
            <Nav>
              {state.isLoggedIn ? (
                <>
                  <img
                    src={state.user_image}
                    alt="Profile Pic"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      marginRight: "20px",
                    }}
                  />
                  <NavDropdown menuAlign="center" id="collasible-nav-dropdown" >
                    <NavDropdown.Item
                      onClick={() => {
                        navigate("/Dashboard/provider");
                      }}
                      style={{textAlign:"right"}}
                    >
                       لوحة المعلومات <BsFillBarChartFill />
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => {
                        navigate("/update/profile");
                      }}
                      style={{textAlign:"right"}}
                    >
                      حسابي <BsFillHouseGearFill />
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => {
                        navigate("/Chat");
                      }}
                      style={{textAlign:"right"}}
                    >
                      محادثة ذكية <BsChatDotsFill />
                    </NavDropdown.Item>
                    {state.craft ? (
                      <NavDropdown.Item
                        onClick={() => {
                          navigate("/CreatePost");
                        }}
                        style={{textAlign:"right"}}
                      >
                        إعلان جديد <BsFillPlusSquareFill />
                      </NavDropdown.Item>
                    ) : (
                      <NavDropdown.Item
                        onClick={() => {
                          navigate("/CreateCraft");
                        }}
                        style={{textAlign:"right"}}
                      >
                        انضم إلينا <BsFillPlusCircleFill />
                      </NavDropdown.Item>
                    )}
                    <NavDropdown.Item onClick={()=>{dispatch(setLanguage("en"))}} style={{textAlign:"right"}}>
                      الأنجليزية <BsSpellcheck />
                    </NavDropdown.Item> 
                    <NavDropdown.Item onClick={logout} style={{textAlign:"right"}}>
                      تسجيل الخروج <BsBoxArrowInLeft />
                    </NavDropdown.Item>
                  </NavDropdown>
                  <div
                    style={{ color: "white" }}
                    onClick={() => {
                      navigate("/getAllNotification");
                    }}
                  >
                    <FaBell
                      size={22}
                      color="gray"
                      style={{ color: "white", marginTop: "12px" }}
                    />
                  </div>
                  <span >
                      {state.noNotification}
                  </span>
                  {state.noNotification!=0?
                  <NavDropdown menuAlign="left">
                    <NavDropdown.Item
                      style={{ justifyContent: "flex-end", marginLeft: "-25%" }}
                    >
                      <GetAllNotification />
                    </NavDropdown.Item>
                  </NavDropdown>:<p className="eache-navbar-1ar" style={{ opacity: 0 }}>
                    ss
                  </p>}
                  <Nav.Link
                    style={{ fontSize: "18px", color: "white" }}
                    onClick={() => {
                      navigate(`/aboutus`);
                    }}
                    className="each-navbar darkss"
                  >
                    فريقنا{" "}
                  </Nav.Link>
                  <Nav.Link
                    style={{ fontSize: "18px", color: "white" }}
                    className="each-navbar"
                    onClick={() => {
                      navigate("/support");
                    }}
                  >
                    الدعم{" "}
                  </Nav.Link>
                  <Nav.Link
                    style={{
                      fontSize: "18px",
                      marginLeft: "-30%",
                      color: "white",
                      marginLeft: "0%",
                    }}
                    onClick={() => {
                      navigate(`/`);
                    }}
                    className="each-navbar"
                  >
                    الرئيسية
                    {/* Home{" "} */}
                  </Nav.Link>
                </>
              ) : (
                <div className="countainer-each-navbar">
                  <p
                    className="eache-navbar-1ar"
                    onClick={() => {
                      dispatch(setLanguage("en"));
                    }}
                  >
                    الانجليزية
                  </p>
                  <p className="eache-navbar-1ar" style={{ opacity: 0 }}>
                    ss
                  </p>
                  <p
                    className="eache-navbar-1ar"
                    onClick={() => {
                      navigate(`/aboutus`);
                    }}
                  >
                    فريقنا
                  </p>
                  <p className="eache-navbar-1ar" style={{ opacity: 0 }}>
                    ss
                  </p>
                  <p
                    className="eache-navbar-1ar"
                    onClick={() => {
                      navigate("/support");
                    }}
                  >
                    الدعم
                  </p>
                  <p className="eache-navbar-1ar" style={{ opacity: 0 }}>
                    ss
                  </p>
                  <p
                    className="eache-navbar-1ar"
                    onClick={() => {
                      navigate(`/login`);
                    }}
                  >
                    الدخول
                  </p>

                  <p className="eache-navbar-1ar" style={{ opacity: 0 }}>
                    ss
                  </p>
                  <p
                    className="eache-navbar-1ar"
                    onClick={() => {
                      navigate(`/register`);
                    }}
                  >
                    التسجيل
                  </p>
                  <p className="eache-navbar-1ar" style={{ opacity: 0 }}>
                    ss
                  </p>
                  <p
                    className="eache-navbar-1ar"
                    onClick={() => {
                      navigate(`/`);
                    }}
                  >
                    الرئيسية
                  </p>
                  <p className="eache-navbar-1ar" style={{ opacity: 0 }}>
                    ss
                  </p>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Brand style={{ justifyContent: "flex-end" }}>
            <h3
              className="header-logo"
              style={{
                display: "flex",
                fontFamily: "Roboto",
                letterSpacing: "0.8px",
                lineHeight: "1",
                fontSize: "40px",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              تصليح
              <span className="for-the-dot">.</span>
            </h3>{" "}
          </Navbar.Brand>
        </Navbar>
      </div>
    </>
  );
};

export default Navbarar;
