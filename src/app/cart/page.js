"use client";

import Navbar from "@/components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/cartslice";

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        <h1 className="text-2xl font-bold border-b pb-3 mb-4">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center py-6">Your cart is empty</p>
        ) : (
          <div>
            {/* Cart Header */}
            <div className="grid grid-cols-5 font-semibold text-gray-600 border-b pb-2">
              <p className="col-span-2">Product</p>
              <p className="text-center">Quantity</p>
              <p className="text-center">Price</p>
              <p className="text-right">Remove</p>
            </div>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-5 items-center border-b py-3"
              >
                {/* Product Info */}
                <div className="col-span-2">
                  <p className="text-lg font-semibold">{item.title}</p>
                  <p className="text-gray-500">${item.price} each</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex justify-center items-center">
                  <button
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded-l hover:bg-gray-400"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded-r hover:bg-gray-400"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >
                    +
                  </button>
                </div>

                {/* Price */}
                <p className="text-center text-lg font-bold text-blue-600">
                  ${item.price * item.quantity}
                </p>

                {/* Remove Button */}
                <button
                  className="text-red-500 hover:text-red-700 text-right"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  ✖
                </button>
              </div>
            ))}

            {/* Total Price */}
            <div className="text-right font-bold text-xl mt-4">
              Total: <span className="text-green-600">${totalPrice}</span>
            </div>

            {/* Clear Cart Button */}
            <div>
              <button
                className="bg-red-500 text-white px-5 py-2 rounded-lg mt-5 hover:bg-red-600 transition w-full"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>
              <button className="bg-green-500 text-white px-5 py-2 rounded-lg mt-5 hover:bg-green-600 transition w-full">
                Pay ${totalPrice}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
