import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import { ListFeature } from '../features/ListFeature';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import NotFound from '../pages/NotFound';
import { Container } from '@mui/material';

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <div>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/notes" element={<ListFeature />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Container>
    </>
  );
};
