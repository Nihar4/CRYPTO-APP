import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stat, StatArrow } from '@chakra-ui/react';

import axios from 'axios';
import { server } from '../index';
import Loader from './Loader';
import ErrorCom from './ErrorCom';
import Chart from './Chart';

const Coindetail = () => {
  const [coin, setCoin] = useState({});
  const [arr1, setarr1] = useState([true, false, false]);
  const [loading, setLoading] = useState(true);
  const [Error, setError] = useState(false);
  const [currency, setCurrency] = useState('inr');
  const [days, setdays] = useState('1');
  const [chartarr, setchartarr] = useState([]);
  let [disable, setdisable] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const params = useParams();

  const btns = ['24h', '7d', '14d', '30d', '60d', '200d', '1y', 'max'];
  const change = e => {
    let currs = document.querySelectorAll('.curr');
    for (let i = 0; i < currs.length; i++) {
      arr1[i] = currs[i].checked;
    }
    setarr1(arr1);
    setCurrency(e.target.value);
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const { data: chartdata } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setCoin(data);
        setchartarr(chartdata.prices);
        setLoading(false);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchCoin();
  }, [params.id, currency, days]);

  if (Error) return <ErrorCom />;

  const sym = currency === 'inr' ? '₹' : currency === 'usd' ? '$' : '€';

  const chartchange = (i, index) => {
    if (i === '24h') setdays('1');
    else if (i === '1y') setdays('365');
    else setdays(i);
    disable = [false, false, false, false, false, false, false, false];
    disable[index] = true;
    setdisable(disable);
    setLoading(true);
  };
  return (
    <div className="coindetails">
      {loading ? (
        <Loader />
      ) : (
        <div className="coindetails">
          <div className="chart">
            <Chart arr={chartarr} currency={sym} days={days} />
          </div>
          <div className="buttons">
            {btns.map((i, index) => {
              return (
                <button
                  key={i}
                  // pointer={'cursor'}
                  disabled={disable[index]}
                  onClick={() => chartchange(i, index)}
                >
                  {i}
                </button>
              );
            })}
          </div>
          <div className="alldetails">
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
                value="usd"
                checked={arr1[1]}
                onChange={change}
              />
              <label htmlFor="">USD</label>
              <input
                type="radio"
                name="CURR"
                className="curr"
                id=""
                value="eur"
                checked={arr1[2]}
                onChange={change}
              />
              <label htmlFor="">EUR</label>
            </form>
            <div className="upper">
              <p>
                Last Updated On{' '}
                {Date(coin.market_data.last_updated).split('G')[0]}
              </p>
              <img src={coin.image.large} alt="" />
              <h3>{coin.name}</h3>
              <h1>{sym + coin.market_data.current_price[currency]}</h1>
              <Stat>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? 'increase'
                      : 'decrease'
                  }
                  color={
                    coin.market_data.price_change_percentage_24h > 0
                      ? 'green'
                      : 'red'
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </Stat>
              <span>#{coin.market_cap_rank}</span>
            </div>
            <div className="mid">
              <div className="progress">
                <div></div>
              </div>
              <div className="pdetails">
                <p className="low">
                  {sym + coin.market_data.low_24h[currency]}
                </p>
                <p>24H RANGE</p>
                <p className="high">
                  {sym + coin.market_data.high_24h[currency]}
                </p>
              </div>
            </div>
            <div className="details">
              <div>
                <p className="bold">Max Supply</p>
                <p>{coin.market_data.max_supply}</p>
              </div>
              <div>
                <p className="bold">Circulating Supply</p>
                <p>{coin.market_data.circulating_supply}</p>
              </div>
              <div>
                <p className="bold">Market Cap</p>
                <p>
                  {sym +
                    coin.market_data.market_cap_change_24h_in_currency[
                      currency
                    ]}
                </p>
              </div>
              <div>
                <p className="bold">All Time Low</p>
                <p>{sym + coin.market_data.atl[currency]}</p>
              </div>
              <div>
                <p className="bold">All Time High</p>
                <p>{sym + coin.market_data.ath[currency]}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coindetail;
