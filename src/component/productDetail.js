import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import 'react-circular-progressbar/dist/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { BiChevronLeftCircle } from 'react-icons/bi';
import { RiVirusFill } from 'react-icons/ri';
import { AiOutlineContainer } from 'react-icons/ai';
import { selectedProduct, removeSelectedProduct } from '../redux/action/productAction';

const ProductDetail = () => {
  const product = useSelector((state) => state.product);
  const {
    // eslint-disable-next-line max-len
    country, continent, casesPerOneMillion, deathsPerOneMillion, recoveredPerOneMillion, testsPerOneMillion, todayCases, todayDeaths, updated, countryInfo,
  } = product;

  const { flag } = { ...countryInfo };

  // eslint-disable-next-line radix
  const date = new Date(parseInt(updated));
  const lastUpdate = date.toString();
  const { productId } = useParams();
  const dispatch = useDispatch();

  const flechProductDetail = async () => {
    const respons = await axios
      .get(`https://corona.lmao.ninja/v2/countries/${productId}`)
      .catch((error) => {
        console.log('error', error);
      });
    dispatch(selectedProduct(respons.data));
  };

  useEffect(() => {
    if (productId && productId !== '') {
      flechProductDetail();
    }
    dispatch(removeSelectedProduct());
  }, [productId]);

  return (
    <di className="detail-content">
      <RiVirusFill className="virus-icon" />
      <div className="content">
        <Link to="/"><BiChevronLeftCircle className="back" /></Link>
        <div className="country-data">
          <img src={flag} alt={country} />
          <h2 className="name">{country}</h2>
          <p className="continent">{continent}</p>
          <div className="day_data">
            <p>
              todayCases:
              {' '}
              {todayCases}
            </p>
            <p>
              todayDeaths:
              {' '}
              {todayDeaths}
            </p>
          </div>
          <p>
            Updated:
            {' '}
            {lastUpdate}
          </p>
        </div>
        <div className="details-cases">
          <AiOutlineContainer />
          <p className="cases">
            casesPerOneMillion:
            {' '}
            {casesPerOneMillion}
          </p>
          <p className="death">
            deathsPerOneMillion:
            {' '}
            {deathsPerOneMillion}
          </p>
          <p className="recovered">
            recoveredPerOneMillion:
            {' '}
            {recoveredPerOneMillion}
          </p>
          <p className="tested">
            testsPerOneMillion:
            {' '}
            {testsPerOneMillion}
          </p>
        </div>
      </div>
    </di>
  );
};

export default ProductDetail;