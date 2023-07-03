import React from "react";
import "./Footer.scss";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillMail,
} from "react-icons/ai";
function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="content">
          <div className="footer-left">
            <h3 className="title">Follow</h3>
            <ul className="follow">
              <li className="hover-link">
                <a href="https://www.facebook.com" target="_blank">
                  <AiFillFacebook />
                </a>
              </li>
              <li className="hover-link">
                <a href="https://www.instagram.com" target="_blank">
                  <AiFillInstagram />
                </a>
              </li>
              <li className="hover-link">
                <a href="https://www.twitter.com" target="_blank">
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="hover-link">
                <a href="https://www.gmail.com" target="_blank">
                  <AiFillMail />
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-right">
            <h3 className="title">Company</h3>
            <ul className="company">
              <li className="hover-link">Contact Us</li>
              <li className="hover-link">Privacy policy</li>
              <li className="hover-link">Return and exchange policy</li>
              <li className="hover-link">shipping policy</li>
              <li className="hover-link">Terms & Conditions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
