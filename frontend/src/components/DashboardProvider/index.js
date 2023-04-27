import "./style.css";
import { useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsBorderWidth ,BsFilePost,BsFillHouseGearFill,BsFillBellFill,BsFillPlusSquareFill} from 'react-icons/bs';
const DashboardProvider = () => {
  const [orders, setOrders] = useState([]);
  const [completed, setCompleted] = useState(0)
  const [pending, setPending] = useState(0)
  const [canceled, setCanceled] = useState(0)
  const [coulmName,setCoulmName] = useState([])
  const [coulmValue,setCoulmValue] = useState([])
  const navigate = useNavigate();
  const state = useSelector((state) => {
    console.log(state.auth);
    return {
      userId: state.auth.userId,
      token: state.auth.token,
      userInfo: state.auth.userInfo,
    };
  });
  const fillterRate = (array) =>{
    let rate1 = 0;
    let rate2 = 0;
    let rate3 = 0;
    let rate4 = 0;
    let rate5 = 0;
    for (let i = 0; i < array.length; i++) {
      if(array[i].rate === 5){rate5++}
      if(array[i].rate === 4){rate4++}
      if(array[i].rate === 3){rate3++}
      if(array[i].rate === 2){rate2++}
      if(array[i].rate === 1){rate1++}
    }
    setCoulmName(["Very Poor","Poor","Fair","Good","Excellent"])
    setCoulmValue([rate1,rate2,rate3,rate4,rate5])
  }
  const getRate = () =>{
    axios
    .get(`https://creative-minds-s3x9.onrender.com/review/`,{headers: {Authorization: state.token}})
    .then((result)=>{
      fillterRate(result.data.Reviews)
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  const ChartComponent = (props) => {
    const chartRef = useRef(null);
    useEffect(() => {
      const chartCanvas = chartRef.current.getContext("2d");
      const myChart = new Chart(chartCanvas, {
        type: "bar", //bar,pie
        data: {
          labels: ["Total Orders","Pending Orders","Accepted  Orders","Canceled  Orders"],
          datasets: [
            {
              label: "",
              data: [orders.length,pending,completed,canceled],
              backgroundColor: ["rgb(220,235,252)", "rgb(251, 175, 175)", "#c3e6e1", "rgb(211, 211, 255)"],
              // borderColor: ["#36A2EB", "#FFCE56", "#FF6384", "#FFCE56", "#FF6384"],
            },
          ],
        },
        options: { scales: { y: { beginAtZero: true } } },
      });

      return () => {
        myChart.destroy();
      };
    }, [props]);

    return <canvas ref={chartRef} />;
  };
  const ChartComponent1 = (props) => {
    const chartRef = useRef(null);
    useEffect(() => {
      const chartCanvas = chartRef.current.getContext("2d");
      const myChart = new Chart(chartCanvas, {
        type: "doughnut", //bar,pie
        data: {
          labels: coulmName,
          datasets: [
            {
              label: "no: rated",
              data: coulmValue,
              backgroundColor: ["green", "rgb(211, 211, 255)", "#c3e6e1", "rgb(251, 175, 175)", "rgb(68, 67, 67)"],
              borderColor: "rgba(255, 99, 132, 0.2)",
            },
          ],
        },
        options: { scales: { y: { beginAtZero: true } } },
      });

      return () => {
        myChart.destroy();
      };
    }, [props]);

    return <canvas ref={chartRef} />;
  };

  const descOrder = (array)=>{
    let a = 0;
    let b = 0;
    let c = 0;
    for (let i = 0; i < array.length; i++) {
      if(array[i].state_id==1){a++;setPending(a)}
      if(array[i].state_id==2){b++;setCompleted(b)}
      if(array[i].state_id==3){c++;setCanceled(c)}
    }
  } 
  const getAllOrder = () =>{
    console.log(state.userId);
    axios
    .get(`https://creative-minds-s3x9.onrender.com/orders/${state.userId}`, {headers: {Authorization: state.token}})
    .then((result)=>{
      setOrders(result.data.order)
      descOrder(result.data.order)
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  useEffect(()=>{
  getAllOrder()
  getRate()
  },[])
  const to_notification = ()=>{
    navigate('/getAllNotification')
  }


  // const getAllOrder = () => {
  //   axios
  //     .get(`https://creative-minds-s3x9.onrender.com/orders/${state.userId}`, {
  //       headers: { Authorization: state.token },
  //     })
  //     .then((result) => {
  //       setOrders(result.data.order);
  //       console.log(orders);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // useEffect(() => {
  //   getAllOrder();
  // }, []);
  // const to_notification = () => {
  //   navigate("/getAllNotification");
  // };
const toCreatePost = ()=>{
  navigate("/CreatePost")
}
const toOrder = ()=>{
  navigate("/orders")
}
//Service Statistics
  return (
    <div className="container_dashboard_provider">
      
      <div className="menu">
        
        <p>
          <button className="go_to"><BsFillHouseGearFill/> Settings</button>
        </p><br/>
        <p>
          <button className="go_to"><BsFilePost/> My Posts</button>
        </p><br/>
        <p>
          <button className="go_to" onClick={toOrder}><BsBorderWidth/> Orders</button>
        </p><br/>
        <p>
          <button className="go_to" onClick={to_notification}>
            <BsFillBellFill/> Notifications
          </button>
        </p><br/>
        <p>
          <button className="go_to" onClick={toCreatePost}><BsFillPlusSquareFill/> Create Announcement</button>
        </p><br/>
      </div>
      <div className="body_container">
        <div className="order_info__cotainer_div">
          <div className="card_order_info">
            <h3>Total Orders</h3>
            <p className="number-order">{orders.length}</p>
          </div>
          <div className="card_order_info light-blue">
            <h3>Pending Orders</h3>
            <p className="number-order">{pending}</p>
          </div>
          <div className="card_order_info light-green">
            <h3>Accepted Orders</h3>
            <p className="number-order">{completed}</p>
          </div>
          <div className="card_order_info light-red">
            <h3>Canceled Orders</h3>
            <p className="number-order">{canceled}</p>
          </div>
        </div>
        <hr className="hr2"/>
        <div className="display-flex ChartComponent-div">
          <div className="ChartComponent">
            <h2>Orders</h2>
            <ChartComponent/></div>
          <div className="ChartComponent ChartComponent1">
            <h2 className="h2">Rate</h2>
            <ChartComponent1/></div>
        </div>
      </div>
       
      
    </div>
  );
};
export default DashboardProvider