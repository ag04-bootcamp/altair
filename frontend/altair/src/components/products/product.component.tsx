import React from "react";
import "./product.styles.scss";

const Product = (props) => {
  return (
    <div className="product-card">
      <div className="image-container">
        <img className="product-img" src={props.src} alt={props.description} />
      </div>
      <div className="content-container">
        <h3 className="product-title">{props.title}</h3>
        <p className="description">{props.description}</p>
        <p className="price">{props.price}</p>
      </div>
    </div>
  );
};

export default Product;
