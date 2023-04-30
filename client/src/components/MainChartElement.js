import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/main-chart.module.scss';
import { monthNames } from '../utils/monthNames';

export default function MainChartElement({ bucket, heightPerValue }) {
  return (
    <div className={styles.mainChart__histogram__element}>
      <div className={styles.mainChart__histogram__element__charts}>
        <Link
          to={`/details/${1}/${bucket.month}`}
          style={{
            height: `${heightPerValue * bucket.factory1Products}px`,
          }}
          className={styles.mainChart__histogram__element__charts__factory1}
        ></Link>
        <Link
          to={`/details/${2}/${bucket.month}`}
          style={{
            height: `${heightPerValue * bucket.factory2Products}px`,
          }}
          className={styles.mainChart__histogram__element__charts__factory2}
        ></Link>
      </div>
      <div>{monthNames[bucket.month]}</div>
    </div>
  );
}
