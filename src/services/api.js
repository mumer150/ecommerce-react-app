import axios from "axios";

export const getProducts = async () => {
  const res = await axios.get("https://dummyjson.com/products/");

  return res.data.products;
};

export const getSingleProduct = async (id) => {
  const res = await axios.get(`https://dummyjson.com/products/${id}`);
  return res.data;
};
