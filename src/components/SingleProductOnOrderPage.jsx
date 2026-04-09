import React from "react";

export const SingleProductOnOrderPage = ({item}) => {
    console.log(item);
    
  return (
    <>
      <div className="flex items-center gap-4">
        <img
          src={item.thumbnail}
          alt="product"
          className="w-20 h-20 object-contain bg-gray-100 rounded-lg"
        />
        <div className="flex-1">
          <p className="font-semibold text-gray-800">{item.title}</p>
          <p className="text-sm text-gray-700">${item.price}</p>
          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
        </div>
        <p className="font-semibold">${Math.floor(item.price*item.quantity)}</p>
      </div>
    </>
  );
};
