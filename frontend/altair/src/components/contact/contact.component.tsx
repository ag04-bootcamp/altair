import "./contact.styles.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
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
    <form onSubmit={submitHandler}>
      <h2>Contact Us</h2>

      <div className="names1">
        <div className="flex">
          <label htmlFor="email">Your email</label>
          <input onChange={emailHandler} required id="email" type="email" />
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
          <button onClick={contactHandler} className="start signBtn">
            Contact Us
          </button>
          <button onClick={cancelHandler} className="cancel1 bacColor">
            Cancel
          </button>

          <div className="test"></div>
        </div>
      </div>
    </form>
  );
};

export default Contact;
