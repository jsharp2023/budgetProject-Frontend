import React, { useState, useEffect } from 'react';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import axios from 'axios';
import './App.css'
import TransactionPieChart from './components/TransactionPieChart';

function App() {
  //stores the transaction and total amount
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
//grabs from the backend
  useEffect(() => {
    axios.get('http://localhost:3000/api/transaction/get-incomes')
      .then(response => {
        console.log('Fetched transactions:', response.data);
        //fetched transaction and adds total
        setTransactions(response.data);
        calculateTotal(response.data);
      })
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  const calculateTotal = (transactions) => {
    const totalAmount = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    setTotal(totalAmount);
  };

  const addTransaction = (transaction) => {
    axios.post('http://localhost:3000/api/transaction/add-income', transaction)
      .then(response => {
        console.log('Added transaction:', response.data);
        const updatedTransactions = [...transactions, response.data.payload];
        console.log(updatedTransactions)
        setTransactions(updatedTransactions);
        calculateTotal(updatedTransactions);
      })
      .catch(error => console.error('Error adding transaction:', error));
  };

  const deleteTransaction = (id) => {
    axios.delete(`http://localhost:3000/api/transaction/delete-income/${id}`)
      .then(response => {
        console.log('Deleted transaction:', response.data);
        const updatedTransactions = transactions.filter(transaction => transaction._id !== id);
        setTransactions(updatedTransactions);
        calculateTotal(updatedTransactions);
      })
      .catch(error => console.error('Error deleting transaction:', error));
  };

  return (
    <div className="App">
      <h1>Budget Tracker</h1>
      <AddTransaction addTransaction={addTransaction} />
      <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} />
      <h2>Total: ${total.toFixed(2)}</h2>
      <TransactionPieChart transactions={transactions} />
    </div>
  );
}

export default App;

