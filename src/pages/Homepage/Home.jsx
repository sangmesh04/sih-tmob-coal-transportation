import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Body from '../../components/body/Body';
import { Routes, Route } from "react-router-dom";
import RoutePage from '../RoutePage/RoutePage';

const Home = () => {
  return (
    <><Navbar />
    <Routes>
          <Route path="*" element={<Body />} />
          <Route path="routes" element={<RoutePage />} />
    </Routes>
    </>
  );
}

export default Home;
