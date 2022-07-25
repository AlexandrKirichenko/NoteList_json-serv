import React from 'react';
import { ListFeature } from '../features/ListFeature';
import styles from './App.module.scss';

export const App: React.FC = () => {
  return (
    <div className={styles.wrap}>
      <ListFeature />
    </div>
  );
};
