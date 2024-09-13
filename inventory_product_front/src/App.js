import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewInventoryProduct from './components/NewInventoryProduct/NewInventoryProduct';
import DeliverInventory from './components/DeliverInventory/DeliverInventory';

const NewInventoryProductPage = () => {
  return <NewInventoryProduct />;
};

const DeliverInventoryPage = () => {
  return <DeliverInventory />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewInventoryProductPage />} />
        <Route path="/deliver_inventory" element={<DeliverInventoryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
