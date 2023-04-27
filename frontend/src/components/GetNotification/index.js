import { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";


const GetAllNotification = () => {
  const navigate = useNavigate();
  const [smShow, setSmShow] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const state = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });

    const getNotifications = ()=>{
        axios
        .get(`http://localhost:5000/notifications`,{headers: {
            Authorization: state.token
            }})
        .then((result)=>{
            console.log(result.data.notification);
            setNotifications(result.data.notification)
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        getNotifications()
    },[])
    const createNotivication = (order_id,description,status)=>{
        axios
        .get(`http://localhost:5000/orders/order_id/${order_id}`)
        .then((result)=>{
            console.log(result);
            axios
            .post(`http://localhost:5000/notifications/${order_id}`,{description:description,status:status,receiver_user_id:result.data.order[0].requester_user_id})
            .then((result)=>{console.log(result);})
            .catch((err)=>{console.log(err);})

        })
        .catch((err)=>{console.log(err);}) 
        }
    const updateNotificationFn = (id,status) => {
        axios
        .put(`http://localhost:5000/notifications/${id}`,{status:status})
        .then((result)=>{console.log(result);})
        .catch((err)=>{console.log(err);})
    }
    const updateOrderState = (order_id,state_id) => {
        axios
        .put(`http://localhost:5000/orders/state/${order_id}`,{state_id},{headers: {
            Authorization: state.token
        }})
        .then((result)=>{
            console.log(result);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    const RateFn = (rate,receiver_user_id,order_id,idNoti)=>{
        axios
        .get(`http://localhost:5000/orders/order_id/${order_id}`)
        .then((result)=>{
            console.log(result);
            axios
            .post(`http://localhost:5000/review`,{rate,receiver_user_id:result.data.order[0].receiver_user_id,order_id},{headers: {
            Authorization: state.token
            }})
            .then((result)=>{
                updateNotificationFn(idNoti,"order_end")
                navigate("/Dashboard/provider")
            })
            .catch((err)=>{console.log(err);})

        })
        .catch((err)=>{console.log(err);})
    }
    return (    
    <div className="all-notification-div">
        <div className="notification">
            <p>notification create_order</p>
            <div className="display_flex">
                {
                    notifications.map((noti,i)=>{
                        if(noti.status==="create_order"){
                        return(
                            <div className="each_noti" key={i}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{noti.description}</Card.Title>
                                        <Button onClick={()=>{
                                            createNotivication(noti.order_id,"your order accepted from provider","accept_order");
                                            updateNotificationFn(noti.id,"accepted_order")
                                            updateOrderState(noti.order_id,2)}} className="button_noti">Accept</Button>
                                        <Button onClick={()=>{
                                            createNotivication(noti.order_id,"your order canceld from provider","canceld_order");
                                            updateNotificationFn(noti.id,"order_canceld")
                                            updateOrderState(noti.order_id,3)}} className="button_noti">Cancel</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        )}
                    })
                }
            </div>
        </div>
        <div className="notification">
            <p>notification accept_order</p>
            <div className="display_flex">
                {
                    notifications.map((noti,i)=>{
                        if(noti.status==="accept_order"){
                        return(
                            <div className="each_noti" key={i}>
                                <Card >
                                    <Card.Body>
                                        <Card.Title>{noti.description}</Card.Title>
                                        <p>the provider accepted</p>
                                        <p>please rate the provider</p>
                                        <Button onClick={() => setSmShow(true)} className="me-2 button_noti" >Rate</Button>
                                        <Modal size="sm" show={smShow} onHide={() => setSmShow(false)} aria-labelledby="example-modal-sizes-title-sm">
                                            <Modal.Header closeButton>
                                                <Modal.Title id="example-modal-sizes-title-sm"> Rate order </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <p>please rate your order</p>
                                                <div className="rating">
                                                    <span className="star" data-rating="5" onClick={()=>{RateFn(5,noti.receiver_user_id,noti.order_id,noti.id)}}></span>
                                                    <span className="star" data-rating="4" onClick={()=>{RateFn(4,noti.receiver_user_id,noti.order_id,noti.id)}}></span>
                                                    <span className="star" data-rating="3" onClick={()=>{RateFn(3,noti.receiver_user_id,noti.order_id,noti.id)}}></span>
                                                    <span className="star" data-rating="2" onClick={()=>{RateFn(2,noti.receiver_user_id,noti.order_id,noti.id)}}></span>
                                                    <span className="star" data-rating="1" onClick={()=>{RateFn(1,noti.receiver_user_id,noti.order_id,noti.id)}}></span>
                                                </div>
                                            </Modal.Body>
                                        </Modal>
                                    </Card.Body>
                                </Card>
                            </div>
                        )}
                    })
                }
            </div>
        </div>
        <div className="notification">
            <p>notification canceld_order</p>
            <div className="display_flex">
                {
                    notifications.map((noti,i)=>{
                        if(noti.status==="canceld_order"){
                        return(
                            <div className="each_noti" key={i}>
                                <Card >
                            <Card.Body>
                                <Card.Title>{noti.description}</Card.Title>
                                <p>the provider canceld order</p>
                                <Button onClick={()=>{updateNotificationFn(noti.id,"finale_order-canceld")}} className="button_noti">Cancel</Button>
                            </Card.Body>
                                </Card>
                            </div>
                        )}
                    })
                }
            </div>
        </div>
    </div>
  );
};

export default GetAllNotification;
