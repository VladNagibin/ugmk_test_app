import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/pie-chart.module.scss';
import { monthNames } from '../utils/monthNames';

export default function Details() {
  const { factoryId, month } = useParams();

  const [data, setData] = useState();

  const fetchData = async () => {
    const { data } = await axios.get(
      `/api/products/details?month=${month}&factoryId=${factoryId}`
    );
    let degreesChart = {
      product1: 0,
      product2: 0,
      product3: 0,
    };
    const productSum = data.product1 + data.product2 + data.product3;
    degreesChart.product1 = (360 / productSum) * data.product1;
    degreesChart.product2 =
      (360 / productSum) * data.product2 + degreesChart.product1;
    degreesChart.product3 =
      (360 / productSum) * data.product3 + degreesChart.product2;
    setData(degreesChart);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={styles.pieChart}>
      <h1>
        Статистика по продукции фабрики {factoryId === '1' ? 'A' : 'Б'} за{' '}
        {monthNames[month]}
      </h1>
      {data && (
        <div
          className={styles.pieChart__pie}
          style={{
            background: `conic-gradient(
      blue 0deg ${data.product1}deg,
      yellow ${data.product1}deg ${data.product2}deg,
      green ${data.product2}deg ${data.product3}deg
    )`,
          }}
        ></div>
      )}
      <div className={styles.pieChart__definitions}>
        <div className={styles.pieChart__definitions__1}>
          Продукт 1<div></div>
        </div>
        <div className={styles.pieChart__definitions__2}>
          Продукт 2<div></div>
        </div>
        <div className={styles.pieChart__definitions__3}>
          Продукт 3<div></div>
        </div>
      </div>
    </div>
  );
}
