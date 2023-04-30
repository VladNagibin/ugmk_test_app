import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import MainChart from '../components/MainChart';
import styles from '../styles/main-page.module.scss';

const QUERY_KEY = 'products-grid';

export default function Main() {
  const [productId, setProductId] = useState(0);

  const mainQueryKey = [productId, QUERY_KEY];
  const products = useQuery(mainQueryKey, async () => {
    const query = Object.entries({
      productId,
    }).filter(([, v]) => Boolean(v));
    const queryStr = '?' + query.map(([k, v]) => `${k}=${v}`).join('&');
    const { data } = await axios.get(`/api/products${queryStr}`);
    return data;
  });

  return (
    <div className={styles.mainPage}>
      <div className={styles.mainPage__filter}>
        Фильтр по типу продукции
        <select
          value={productId}
          onChange={e => {
            setProductId(e.target.value);
          }}
        >
          <option value={1}>Продукт 1</option>
          <option value={2}>Продукт 2</option>
          <option value={3}>Продукт 3</option>
          <option value={0}>Все продукты</option>
        </select>
      </div>
      {!products.isLoading && (
        <MainChart productsBucket={Object.values(products.data)} />
      )}
    </div>
  );
}
