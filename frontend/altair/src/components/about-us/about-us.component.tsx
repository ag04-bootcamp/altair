import "./about-us.styles.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import davinci from "assets/davinci.jpg";
import healthIcon2 from "assets/icon2.png";
import healthIcon from "assets/icon.png";
import envelope from "assets/envelope.png";

const AboutUs = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const cancelHandler = () => {
    navigate("/");
  };

  const messageHandler = (event) => {
    setMessage(event.target.value);
  };

  const contactHandler = () => {};

  const submitHandler = (event) => {
    event.preventDefault();

    const data = {
      email,
      message,
    };

    console.log(data);
  };

  return (
    <>
      <div className="about-grid">
        <div>
          <h2 className="main-title">What is altair?</h2>
          <p className="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
            architecto dolorem libero exercitationem? Reiciendis libero ab quasi
            fugit deserunt corrupti, repellat commodi sequi eius tempora amet,
            sapiente neque debitis labore distinctio illo dignissimos
            exercitationem, ratione eligendi dicta a vero delectus. Fugiat
            consectetur nisi quibusdam, laboriosam ipsa autem voluptatibus
            consequuntur doloribus.
          </p>
        </div>
        <img className="davinci" src={davinci} alt="DaVinci's man in circle" />
        <img className="health" src={healthIcon2} alt="hand holding a heart" />
        <div>
          <h2 className="main-title">Start Making Changes</h2>
          <p className="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
            architecto consectetur accusamus doloremque nihil vel ipsum earum
            quibusdam, quia dicta fuga saepe eius assumenda exercitationem
            expedita aspernatur laborum? Vitae tempore earum harum obcaecati sed
            commodi sunt tempora ea. Voluptate quas voluptas ipsam iste beatae
            unde sequi dolor eos harum exercitationem?
          </p>
        </div>

        <div>
          <h2 className="main-title">Try it out for free</h2>
          <p className="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            velit id ex voluptatem delectus, culpa officia impedit quod quasi
            beatae veritatis nobis facere pariatur magni repellendus aspernatur,
            hic sed a voluptas error. Consectetur commodi perferendis omnis
            aspernatur unde voluptates sit possimus accusantium dolorem,
            veritatis quaerat nam vero voluptatibus accusamus reiciendis.
          </p>
        </div>
        <img className="icon" src={healthIcon} alt="Heart with weight scale" />
      </div>

      <div className="contact">
        <div className="content-grid">
          <div className="center-content-grid">
            <h2 className="main-title">Contact Us</h2>
            <div className="names1">
              <div className="flex">
                <label htmlFor="email">Your email</label>
                <input
                  onChange={emailHandler}
                  required
                  id="email"
                  type="email"
                />
              </div>

              <div className="flex">
                <label htmlFor="message">Your message</label>
                <textarea
                  id="message"
                  name="observation"
                  onChange={messageHandler}
                  className="message"
                  rows={5}
                ></textarea>
              </div>

              <div className="horizontal">
                <button onClick={contactHandler} className="send button">
                  Contact Us
                </button>
                <button
                  onClick={cancelHandler}
                  className="cancel margin-left button"
                >
                  Cancel
                </button>

                <div className="test"></div>
              </div>
            </div>
          </div>
          <img src={envelope} alt="green envelope" className="envelope" />
        </div>
      </div>

      <div className="location">
        <div className="location-flex">
          <h2>Where to find us</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2893.560739486742!2d16.444631115783892!3d43.51149826959957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13355e05c24cf505%3A0x44eda39698f175ce!2sUl.%20Georgea%20Washingtona%2022%2C%2021000%2C%20Split!5e0!3m2!1sen!2shr!4v1654517694900!5m2!1sen!2shr"
            width="600"
            height="450"
            style={{ border: "0", width: "100%", borderRadius: "9px" }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="map"
          ></iframe>
        </div>
        <div className="address">
          <h2>Address</h2>
          <a
            href="https://www.google.com/maps?ll=43.512422,16.447466&z=16&t=m&hl=en&gl=HR&mapclient=embed&q=Ul.+Georgea+Washingtona+22+21000,+Split"
            target="blank"
          >
            Ulica Georgea Washingtona 22, 21000 Split
          </a>

          <h2 className="margin-top">Working hours:</h2>
          <p className="work-hours">Mon - Fri : 06:00h - 20:00h</p>

          <h2 className="margin-top">Contact number:</h2>
          <p className="work-hours">Telephone: 00385 21 776 154</p>
          <p className="work-hours">Cellphone: 00385 95 112 7261</p>
          <p className="work-hours">Email: info-altair@gmail.com</p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
