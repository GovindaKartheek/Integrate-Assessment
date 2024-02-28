
import React from 'react';
import TransactionTable from './components/pages/TransactionTable';
import './App.css'

const App = () => {
  return (
    <div>
      <h1>Etherscan Transaction Viewer</h1>
      <TransactionTable />
    </div>
  );
};

export default App;
