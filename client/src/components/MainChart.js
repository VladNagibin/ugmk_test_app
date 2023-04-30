import React, { useMemo } from 'react';
import MainChartElement from './MainChartElement';
import styles from '../styles/main-chart.module.scss';

export default function MainChart({ productsBucket }) {
  const maxChartValue = useMemo(() => {
    let currentMaxValue = 0;
    for (let i = 0; i < productsBucket.length; i++) {
      if (productsBucket[i].factory1Products > currentMaxValue) {
        currentMaxValue = productsBucket[i].factory1Products;
      }
      if (productsBucket[i].factory2Products > currentMaxValue) {
        currentMaxValue = productsBucket[i].factory2Products;
      }
    }
    return currentMaxValue;
  }, [productsBucket]);
  return (
    <div className={styles.mainChart}>
      <div className={styles.mainChart__graph}>
        <div className={styles.mainChart__y}>
          <div className={styles.mainChart__y__value}>{maxChartValue}</div>
          <div className={styles.mainChart__y__value}>
            {(maxChartValue / 4) * 3}
          </div>
          <div className={styles.mainChart__y__value}>{maxChartValue / 2}</div>
          <div className={styles.mainChart__y__value}>{maxChartValue / 4}</div>
          <div className={styles.mainChart__y__value}>0</div>
        </div>
        <div className={styles.mainChart__histogram}>
          {productsBucket.map(bucket => (
            <MainChartElement
              key={bucket.month}
              bucket={bucket}
              heightPerValue={320 / maxChartValue}
            />
          ))}
        </div>
      </div>
      <div className={styles.mainChart__definition}>
        <div className={styles.mainChart__definition__factory1}>
          <div className={styles.mainChart__definition__factory1__color}></div>
          Фабрика А
        </div>
        <div className={styles.mainChart__definition__factory2}>
          <div className={styles.mainChart__definition__factory2__color}></div>
          Фабрика Б
        </div>
      </div>
    </div>
  );
}
