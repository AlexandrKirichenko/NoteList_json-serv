import React from 'react';
import { ListFeature } from '../features/ListFeature';
import Header from '../components/Header';
import styles from './App.module.scss';

export const App: React.FC = () => {
  return (
    <div>
      <Header />
      <ListFeature />
    </div>
  );
};
