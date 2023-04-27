import {
  MDBIcon,
 } from "mdb-react-ui-kit";
import "./footer.css"

const Footer = () => {
    return (
      <>
      
     
        <footer id="footer" className="footer">
<div className="container">
  <div className="row gy-4">
    <div className="col-lg-5 col-md-12 footer-info">
      <a href="index.html" className="logo d-flex align-items-center">
        <span>Taslee7</span>
      </a>
      <p>
      We provide comprehensive solutions to keep your equipment and facilities in top condition. Our experienced team of professionals offers a range of services, including preventative maintenance, repairs, and upgrades to ensure your equipment operates efficiently and safely.</p>
      <div className="social-links d-flex mt-4">
        <a href="#" className="icons"><i className="bi bi-twitter"><MDBIcon fab icon="twitter" /></i></a>
        <a href="#" className="icons"><i className="bi bi-facebook"><MDBIcon fab icon="facebook" /></i></a>
        <a href="#" className="icons"><i className="bi bi-instagram"><MDBIcon fab icon="instagram" /></i></a>
        <a href="#" className="icons"><i className="bi bi-linkedin"><MDBIcon fab icon="linkedin-in" /></i></a>
      </div>
    </div>

    <div className="col-lg-2 col-3 footer-links">
      <h4 className="Footerlinks">Links</h4>
      <ul >
        <li ><a  href="#">Home</a></li>
        <li><a href="#">About us</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Terms of service</a></li>
      
      </ul>
    </div>

    

    <div className="col-lg-3 col-7 footer-links">
      <h4>Contact Us</h4>
      <p>
        
        Amman, N 02<br/>
        Jordan <br/><br/>
        <strong>Phone:</strong> +962 079 098 7058<br/>
        <strong>Email:</strong> CreativeMinds@gmail.com<br/>
      </p>

    </div>

  </div>
</div>

<div className="container mt-4">
  <div className="copyright">
    &copy; Copyright <strong><span>Taslee7</span></strong>. 
  </div>
  <div className="credits">
    {/* <!-- All the links in the footer should remain intact. -->
    <!-- You can delete the links only if you purchased the pro version. -->
    <!-- Licensing information: https://bootstrapmade.com/license/ -->
    <!-- Purchase the pro version with working PHP/AJAX contact form:
     https://bootstrapmade.com/logis-bootstrap-logistics-website-template/ --> */}
    Designed by <a href="https://bootstrapmade.com/">Creative Minds</a>
  </div>
</div>

</footer>


</>
   
    )
}
export default Footer