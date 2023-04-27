import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import "axios";

import "./style.css";
import axios from "axios";

const GetAllOrders = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([])
  const state = useSelector((state) => {
    return {
      token: state.auth.token,
      userId: state.auth.userId
    };
  });
  useEffect(()=>{
    axios
    .get(
      `https://creative-minds-s3x9.onrender.com/orders/${state.userId}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((result) => {
      console.log(result);
      setOrders(result.data.order)
    })
    .catch((err) => {
      console.log(err);
    });
  },[])

  return (
    <div className="all-orders-div">
      {
        orders.map((order,i)=>{
          return(<div>
            <Card.Body>
              <h5>order number : {i+1}</h5>
                <Card.Title>{order.order_desc}</Card.Title>
                <Card.Title>{order.schedule_date}</Card.Title>
                <Card.Title>state : {order.state_id===1&&"Pending"}
                {order.state_id===2&&"Completed"}
                {order.state_id===3&&"Canceled"}
                </Card.Title>
              </Card.Body>
          </div>)
        })
      }
    </div>
  );
};

export default GetAllOrders;
