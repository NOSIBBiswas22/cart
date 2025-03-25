'use client';

import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartslice';
import Image from 'next/image';

const ProductCard = ({ id, title, price, description, image }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white text-gray-800 shadow-xl rounded-lg overflow-hidden transition-transform transform hover:scale-102 hover:shadow-lg w-100 m-4">
      {/* Product Image */}
      <div className="relative w-full h-52 bg-gray-200">
        <Image 
          src={image} 
          alt={title} 
          layout="fill" 
          objectFit="cover" 
          className="rounded-t-lg"
        />
      </div>

      {/* Product Details */}
      <div className="p-6 flex flex-col">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 text-sm mt-2">{description}</p>

        {/* Price and Add to Cart */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-2xl font-bold text-indigo-600">${price}</p>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            onClick={() => dispatch(addToCart({ id, title, price }))}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
