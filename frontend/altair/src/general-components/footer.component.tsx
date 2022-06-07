import "./footer.styles.scss";

import { FacebookLogo, TwitterLogo, InstagramLogo } from "phosphor-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = `${new Date().getFullYear()}`;

  const facebookHandler = () => {
    window.open("https://www.youtube.com/watch?v=zov_jJr5lIw");
  };

  const twitterHandler = () => {
    window.open("https://www.youtube.com/watch?v=U9LcavIYo-o");
  };

  const instagramHandler = () => {
    window.open("https://www.youtube.com/watch?v=fKvnGGJJUVI");
  };

  return (
    <footer>
      <div className="social-container">
        <FacebookLogo onClick={facebookHandler} className="social-icons" />
        <TwitterLogo onClick={twitterHandler} className="social-icons" />
        <InstagramLogo onClick={instagramHandler} className="social-icons" />
      </div>
      <div className="copyright-div">
        <p className="copyright">
          Ⓒ {year} Ana Malinar, Karlo Maros and Ante Latinčić. All rights
          reserved.
        </p>
      </div>

      <div className="about">
        <Link to="/about-us" className="copyright contact-link">
          About Us
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
