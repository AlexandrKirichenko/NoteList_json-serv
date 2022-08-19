import React from 'react';
import { Container } from '@mui/material';
import Header from '../components/Header';
import { Router } from '../router';

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <div>
          <Router />
        </div>
      </Container>
    </>
  );
};
