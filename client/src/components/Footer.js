import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './style.css';

// Footer component
const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-dark text-white">
      <div className="container">
        <section className="social-icons-wrapper d-flex flex-column flex-md-row justify-content-center my-3">
           {/* JAMES SECTION */}
   <div className="d-flex flex-column align-items-center mx-md-2 transparent-bg">
            <a href="https://github.com/Jameshughes2009" className="icon Jameshughes2009" target="_blank" rel="noreferrer">
              {/* <FontAwesomeIcon icon={faGithub} flip size="3x" style={{ color: 'green' }} /> */}
            </a>
            <a href="https://github.com/Jameshughes2009" target="_blank" rel="noreferrer">
              <span className="d-inline-block mx-1 name">@Jameshughes2009</span>
            </a>
          </div>
          
          {/* HEMENT SECTION */}
          <div className="d-flex flex-column align-items-center mx-md-2 transparent-bg">
            <a href="https://github.com/hementB2" className="icon hementB2" target="_blank" rel="noreferrer">
              {/* <FontAwesomeIcon icon={faGithub} beat size="3x" style={{ color: 'purple' }} /> */}
            </a>
            <a href="https://github.com/hementB2" target="_blank" rel="noreferrer">
              <span className="d-inline-block mx-1 name">@hementB2</span>
            </a>
          </div>
          
        </section>
        
        {/* Footer bottom section */}
        <section className="footer" id="footer">
          <section className="form-footer">
            <h5 className="text-center mb-2">Designed Uoft Project 3</h5>
            <p className="text-center mb-0">
              <h6>&copy; {new Date().getFullYear()} All rights reserved.</h6>
            </p>
          </section>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
