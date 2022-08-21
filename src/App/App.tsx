import React from 'react';
import { Container } from '@mui/material';
import Header from '../components/Header';
import { Router } from '../router';
import { Spinner } from './Spinner';

export const App: React.FC = () => {
  return (
    <>
      <Spinner />
      <Header />
      <Container>
        <div>
          <Router />
        </div>
      </Container>
    </>
  );
};
