import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Blog, Homepage, Blogpost, Error } from './pages';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Blogpost />} />
        <Route path="/" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
