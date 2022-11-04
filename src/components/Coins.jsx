import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { server } from '../index';
import Loader from './Loader';
import ErrorCom from './ErrorCom';

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [arr1, setarr1] = useState([true, false, false]);
  const [loading, setLoading] = useState(true);
  const [Error, setError] = useState(false);
  const [currency, setCurrency] = useState('inr');
  const [page, setPage] = useState(1);
  const arr = new Array(132).fill(1);

  const changepage = index => {
    setPage(index);
    setLoading(true);
  };

  const change = e => {
    let currs = document.querySelectorAll('.curr');
    for (let i = 0; i < currs.length; i++) {
      arr1[i] = currs[i].checked;
    }
    setarr1(arr1);
    setCurrency(e.target.value);
  };
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchCoins();
  }, [page, currency]);

  if (Error) return <ErrorCom />;

  const sym = currency === 'inr' ? '₹' : currency === 'usd' ? '$' : '€';
  return (
    <div className="coin">
      {loading ? (
        <Loader />
      ) : (
        <>
          <form action="">
            <input
              type="radio"
              name="CURR"
              id=""
              className="curr"
              value="inr"
              checked={arr1[0]}
              onChange={change}
            />
            <label htmlFor="">INR</label>
            <input
              type="radio"
              className="curr"
              name="CURR"
              id=""
              checked={arr1[1]}
              value="usd"
              onChange={change}
            />
            <label htmlFor="">USD</label>
            <input
              type="radio"
              className="curr"
              name="CURR"
              id=""
              checked={arr1[2]}
              value="eur"
              onChange={change}
            />
            <label htmlFor="">EUR</label>
          </form>
          <div>
            {coins.map(i => (
              <Show
                id={i.id}
                key={i.id}
                img={i.image}
                symbol={i.symbol}
                name={i.name}
                price={sym + i.current_price}
              />
            ))}
          </div>
          <main>
            {arr.map((item, i) => (
              <button key={i} onClick={() => changepage(i + 1)}>
                {i + 1}
              </button>
            ))}
          </main>
        </>
      )}
    </div>
  );
};

const Show = ({ id, img, symbol, name, price }) => (
  <Link to={`/coin/${id}`}>
    <img src={img} alt="" />
    <h3>{symbol}</h3>
    <p>{name}</p>
    <p>{price}</p>
  </Link>
);

export default Coins;
