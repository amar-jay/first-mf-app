import React from "react";
import { Link } from "react-location";
import { useMatch } from "react-location";

import { currency } from "../lib/products";
import { addToCart, useLoggedIn } from "../lib/cart";

import type { LocationGenerics } from "../router";

export default function HomeContent() {
  const loggedIn = useLoggedIn();
  const { products } = useMatch<LocationGenerics>().data;

  return (
    <div className="grid grid-cols-4 gap-5">
      {products.map((product) => (
        <div key={product.id}>
          <Link to={`/product/${product.id}`}>
            <img src={product.image} alt={product.name} />
          </Link>
          <div className="flex">
            <div className="flex-grow font-bold">
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            </div>
            <div className="flex-end">{currency.format(product.price)}</div>
          </div>
          <div className="text-sm mt-4">{product.description}</div>
          {loggedIn && (
            <div className="text-right mt-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
                onClick={() => addToCart(product.id)}
                id={`addtocart_${product.id}`}
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
