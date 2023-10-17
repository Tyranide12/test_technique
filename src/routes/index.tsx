import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Acceuil from '../views/Acceuil';

const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route path="/" element={<Acceuil />} />
    </React.Fragment>
  )
);

export default router;