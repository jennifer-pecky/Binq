import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllPosts from './componets/AllPosts';
import OnePost from './componets/OnePost';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AllPosts />} />
        <Route path="/:slug" element={<OnePost />} />
      </Routes>
    </>
  );
}

export default App;
