import { MDBIcon } from "mdb-react-ui-kit";
import "./footer.css";
import { useNavigate } from "react-router-dom";

const Footerar = () => {
  const navigate = useNavigate();

  return (
    <>
      <footer id="footer" className="footer">
        <div className="container" style={{marginLeft:"10%"}}>
          <div className="row gy-4">
            <div className="col-lg-3 col-7 footer-links">
              <h4>
                <a
                  className="cursor"
                  onClick={() => {
                    navigate(`/support`);
                  }}
                >
                  تحدث معنا
                </a>
              </h4>
              <p>
                عمان, N 02
                <br />
                الاردن <br />
                <br />
                <strong>هاتف:</strong> +962 079 098 7058
                <br />
                 CreativeMinds@gmail.com<strong>:ايميل</strong>
                <br />
              </p>
            </div>
            

            <div className="col-lg-2 col-3 footer-links">
              <h4 className="Footerlinks">روابط</h4>
              <ul>
                <li>
                  <a
                    onClick={() => {
                      navigate(`/`);
                    }}
                  >
                    الرئيسية
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate(`/aboutus`);
                    }}
                  >
                    فريقنا
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate(`/support`);
                    }}
                  >
                    الدعم
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate(`/Chat`);
                    }}
                  >
                    شات
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-5 col-md-12 footer-info">
              <a href="index.html" className="logo d-flex align-items-center">
                <span>تصليح</span>
              </a>
              <p>
              نحن نقدم حلولاً شاملة للحفاظ على معداتك ومرافقك في أفضل حالة. يقدم فريق المحترفين ذوي الخبرة لدينا مجموعة من الخدمات ، بما في ذلك الصيانة الوقائية والإصلاحات والترقيات لضمان تشغيل أجهزتك بكفاءة وأمان.

              </p>
              <div className="social-links d-flex mt-4">
                <a className="icons">
                  <i className="bi bi-twitter">
                    <MDBIcon fab icon="twitter" />
                  </i>
                </a>
                <a className="icons">
                  <i className="bi bi-facebook">
                    <MDBIcon fab icon="facebook" />
                  </i>
                </a>
                <a className="icons">
                  <i className="bi bi-instagram">
                    <MDBIcon fab icon="instagram" />
                  </i>
                </a>
                <a className="icons">
                  <i className="bi bi-linkedin">
                    <MDBIcon fab icon="linkedin-in" />
                  </i>
                </a>
              </div>
            </div>
            
          </div>
        </div>

        <div className="container mt-4">
          <div className="copyright">
            &copy; Copyright{" "}
            <strong>
              <span>Taslee7</span>
            </strong>
          </div>
          <div className="credits">
            Designed by <a href="https://bootstrapmade.com/">Creative Minds</a>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footerar;
