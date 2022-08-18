import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from '../components/Header';
import { ListFeature } from '../features/ListFeature';
import SignIn from '../pages2/SignIn';
import SignUp from '../pages2/SignUp';
import NotFound from '../pages2/NotFound';
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
