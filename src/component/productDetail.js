import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectedProduct, removeSelectedProduct } from "../redux/action/productAction";

const ProductDetail = () => {
  const product = useSelector((state) => state.product);
  const {title, price, category, image, description} = product;
  const { productId } = useParams();
  console.log(useParams());
  const dispatch = useDispatch()
  console.log(productId);
  console.log(product)

  const flechProductDetail = async () => {
    const response = await axios
    .get(`https://fakestoreapi.com/products/${productId}`)
    .catch((error) => {
      console.log("error", error);
    })
    dispatch(selectedProduct(response.data));
  }

  useEffect(() =>{
    if( productId && productId !== ""){
      flechProductDetail();
    }
    dispatch(removeSelectedProduct())
  }, [productId]);
  
  return (
    <di className="detail-content">
      <div className="details">
      <img src={image} alt={title}/>
      <div className="content">
      <h1>{title}</h1>
      <h2 className="price">${price}</h2>
      <p>{category}</p>
      <p>{description}</p>
      </div>
    </div>
    </di>
  );
}

export default ProductDetail;