import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Blog, Homepage, Blogpost, Error } from './pages';
import AppRoutes from './routes';

function App() {
  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
