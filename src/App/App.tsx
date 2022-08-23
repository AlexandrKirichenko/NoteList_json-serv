import React from 'react';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Header from '../components/Header';
import { Router } from '../router';
import { Spinner } from './Spinner';

export const App: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container sx={{ flex: '1 1 90vh' }}>
        <div>
          <Router />
        </div>
      </Container>
      <Spinner />
    </Box>
  );
};
