import "./product-list.styles.scss";
import Product from "./product.component";
import diet1 from "assets/product-images/diet1.jpg";
import diet2 from "assets/product-images/diet2.jpg";
import diet3 from "assets/product-images/diet3.jpg";
import diet4 from "assets/product-images/diet4.jpg";
import diet5 from "assets/product-images/diet5.jpg";
import diet6 from "assets/product-images/diet6.jpg";

import React from "react";
import { a } from "react-spring";

const PRODUCTS = [
  {
    name: "The Mediterranean diet",
    price: "$24,99",
    description:
      "The Mediterranean diet is based on foods that people in countries like Italy and Greece have traditionally eaten",
    image: diet1,
  },

  {
    name: "The DASH diet",
    price: "$19,99",
    description:
      "Dietary Approaches to Stop Hypertension, or DASH, is an eating plan designed to help treat or prevent high blood pressure, which is clinically known as hypertension.",
    image: diet2,
  },

  {
    name: "Plant-based and flexitarian diets",
    price: "$9,99",
    description:
      "Vegetarianism and veganism are the most popular versions of plant-based diets, which restrict animal products for health, ethical, and environmental reasons.",
    image: diet3,
  },

  {
    name: "The MIND diet",
    price: "$14,99",
    description:
      "The Mediterranean-DASH Intervention for Neurodegenerative Delay (MIND) diet combines aspects of the Mediterranean and DASH diets to create an eating pattern that focuses on brain health.",
    image: diet4,
  },
  {
    name: "WW (formerly Weight Watchers)",
    price: "$19,99",
    description:
      "While it doesn’t restrict any food groups, people on a WW plan must eat within their set number of daily points to help them reach their ideal weight.",
    image: diet5,
  },
  {
    name: "Intermittent fasting",
    price: "$24,99",
    description:
      "Intermittent fasting is a dietary strategy that cycles between periods of fasting and eating.",
    image: diet6,
  },
];

const ProductList = () => {
  return (
    <div className="product-grid">
      {PRODUCTS.map((product) => {
        return (
          <Product
            title={product.name}
            price={product.price}
            src={product.image}
            description={product.description}
          />
        );
      })}
    </div>
  );
};

export default ProductList;
