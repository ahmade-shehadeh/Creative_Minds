import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { setCrafts } from "../Redux/reducers/crafts";
import Dropdown from "react-bootstrap/Dropdown";

const CreateCraft = () => {
  const [craft, setCraft] = useState({});

  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      userId: state.auth.userId,
      token: state.auth.token,
      crafts: state.craft.craft,
      userInfo: state.auth.userInfo,
    };
  });
  console.log(state.userInfo);
  useEffect(() => {
    axios
      .get("http://localhost:5000/crafts/")
      .then((result) => {
        dispatch(setCrafts(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitFn = () => {
    console.log(craft);
    axios
      .put(
        `http://localhost:5000/crafts/${state.userId}`,
        { craft_id: craft.id },
        {
          headers: {
            Authorization: state.token,
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="create-post-container">
      {/* <p>i am a CreateCrafte componnent</p> */}
      <p>please Select your maintenance from list</p>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select your maintenance
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {state.crafts.map((craft, id) => {
            return (
              <Dropdown.Item
                onClick={() => {
                  setCraft(craft);
                }}
                key={id}
              >
                {craft.name}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
      <p>{state.userInfo.first_name}</p>
      <p>{state.userInfo.Phone_number}</p>
      <button onClick={submitFn}>Submit</button>
    </div>
  );
};
export default CreateCraft;
