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
      <div>
        <p className="copyright">
          Ⓒ {year} Ana Malinar, Karlo Maros and Ante Latinčić. All rights
          reserved.
        </p>
      </div>
      <div className="copyright">
        <a
          target="#"
          href="https://www.google.com/maps/place/300+Hidden+Figures+Way,+Washington,+DC+20024,+USA/data=!4m2!3m1!1s0x89b7b778ab8e734b:0x6bbb01abe0946b44?sa=X&ved=2ahUKEwi6l4yu-dv3AhUySPEDHUhsAboQ8gF6BAgWEAE"
        >
          300 Hidden Figures Way SW Washington D.C., USA
        </a>
      </div>

      <div>
        <Link to="/contact" className="copyright contact-link">
          Contact
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
