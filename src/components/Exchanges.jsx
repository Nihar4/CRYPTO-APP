import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../index';
import Loader from './Loader';
import ErrorCom from './ErrorCom';

const Exchanges = () => {
  const [exchanges, setExchange] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Error, setError] = useState(false);
  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchange(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchExchanges();
  }, []);

  if (Error) return <ErrorCom />;
  return (
    <div className="exchange">
      {loading ? (
        <Loader />
      ) : (
        <div>
          {exchanges.map(i => (
            <Show
              key={i.id}
              name={i.name}
              img={i.image}
              url={i.url}
              rank={i.trust_score_rank}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Show = ({ name, img, url, rank }) => (
  <a href={url}>
    <img src={img} alt="" />
    <h3>{rank}</h3>
    <p>{name}</p>
  </a>
);

export default Exchanges;
