import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Chat.css";
import axios from "axios";
import { useSelector } from "react-redux";
const Chat = () => {
  const state = useSelector((state) => {
    return {
      language: state.auth.language
    };
  });
 const [input, setContent] = useState("");
  const [output, setOutput] = useState("");
  const ChatNow = async () => {
    console.log(input);
    await axios
      .post  (`https://taslee7-com.onrender.com/chat/`,{input})
      .then((result) => {
        console.log(result);
        setOutput(result.data.result)
      })
      .catch((err) => {
        console.log(err.message);
        setOutput(err.message)
      });
  };
  
  return (
    <div className="main-container">
      <p className="main-title">{state.language=="ar"?"سأكون سعيد باستجابتي لاي سؤال":"Good Day, Ask Me Please! "}</p>
      <div className="main-content">
        <input
          className="word-input"
          type="search"
          placeholder=
          {state.language=="ar"?"قم بالسؤال عن الصيانة  ":"Inquire about services & maintenance"}
          onChange={(e)=>{
const value=e.target.value
setContent(value)
          }}
        ></input>
        <Button size="sm" className="submit-btn" onClick={ChatNow}>
          {"  "}
          {state.language=="ar"?"تأكيد":"Submit"}
        </Button>
        <Button size="sm" className="submit-btn" onClick={()=>{
            setOutput('')
        }}>
          {"  "}
          {state.language=="ar"?"الغاء":"Clear"}
        </Button>
      </div>
      <div className="reply-content " style={{ overflow: "auto" }}>
        <div style={{ maxHeight: "100%"}}>{output}</div>
      </div>
    </div>
  );
};

export default Chat;
