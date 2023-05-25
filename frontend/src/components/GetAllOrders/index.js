import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import "./style.css";
import axios from "axios";

const GetAllOrders = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const state = useSelector((state) => {
    return {
      token: state.auth.token,
      userId: state.auth.userId,
    };
  });
  useEffect(() => {
    axios
      .get(`https://creative-minds-s3x9.onrender.com/orders/${state.userId}`, {
        headers: {
          Authorization: state.token,
        },
      })
      .then((result) => {
        console.log(result);
        let order =result.data.order
        setOrders(order.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="all-orders-div">
      <h1 className="titleTopp">My Orders Table</h1>
      <MDBContainer className="mt-5" style={{ maxWidth: "1000px" }}>
        <MDBRow className="justify-content-center">
          <MDBCol md="8" lg="8">
            <MDBCard
              className="shadow-0 border"
            >
              <MDBCardBody className="">
                <div className="allorder">
              <Card.Title className="titleorder">
              Order                        </Card.Title>
                          <Card.Title className="titleorder">
                             Description</Card.Title>
                          <Card.Title className="titleorder">
                          Status 
                          </Card.Title>
                          <Card.Title className="titleorder">
                          Date 
                          </Card.Title>
                          </div>
                {orders && orders.map((order, i) => {
                  return (
                    <div key={order.id}className="allorder">
                      <MDBCard className="mb-4 cardOrderBody allorder">
                        <p className="cardOrderheader">
                           {i + 1}
                        </p>
                        
                          <p className="cardOrderheader">{order.order_desc}</p>
                          <Card.Title className="state"  style={{ color:  order.state_id === 1 ? "blue": 
                          order.state_id === 2?"green":"red"
                              }}>
                            {console.log( order)}
                            {order.state_id === 1 && "Pending" }
                            {order.state_id === 2 && "Completed"}
                            {order.state_id === 3 && "Canceled"}
                          </Card.Title>
    
                        <Card.Title className="state">
                          {order.schedule_date &&
                            order.schedule_date.split("").splice(0, 10)}
                        </Card.Title>
                      </MDBCard>
                    </div>
                  );
                })}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

    </div>
  );
};

export default GetAllOrders;
