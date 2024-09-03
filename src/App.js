import React, { useState, useEffect } from 'react';
import SignUp from './components/SignUp';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import axios from 'axios';
import './App.css';
import TransactionPieChart from './components/TransactionPieChart';
import MyCalendar from './components/Calendar';
import Login from './components/Login/Login';

function App() {
  // State for transactions, total amount, and user name
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const [view, setView] = useState('signup'); // 'signup' or 'login'
  const [userName, setUserName] = useState('');

  // Handle login success
  const handleLoginSuccess = (name) => {
    setUserName(name);
  };

    // Handle sign-up success
    const handleSignUpSuccess = (name) => {
      setUserName(name);
      setView('login');
    };

  // Fetch transactions after successful login
  useEffect(() => {
    if (userName) {
      axios.get('http://localhost:3000/api/transaction/get-incomes')
        .then(response => {
          console.log('Fetched transactions:', response.data);
          setTransactions(response.data);
          calculateTotal(response.data);
        })
        .catch(error => console.error('Error fetching transactions:', error));
    }
  }, [userName]);

  // Calculate total amount
  const calculateTotal = (transactions) => {
    const totalAmount = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    setTotal(totalAmount);
  };

  // Add a new transaction
  const addTransaction = (transaction) => {
    axios.post('http://localhost:3000/api/transaction/add-income', transaction)
      .then(response => {
        console.log('Added transaction:', response.data);
        const updatedTransactions = [...transactions, response.data];
        setTransactions(updatedTransactions);
        calculateTotal(updatedTransactions);
      })
      .catch(error => console.error('Error adding transaction:', error));
  };

  // Delete a transaction
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
      {!userName ? (
                view === 'signup' ? (
                    <SignUp onSignUpSuccess={handleSignUpSuccess} />
                ) : (
                    <Login onLoginSuccess={handleLoginSuccess} />
                )
            ) : (
                <>
          <h2>Welcome, {userName}!</h2>
          <MyCalendar />
          <AddTransaction addTransaction={addTransaction} />
          <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} />
          <h2>Total: ${total.toFixed(2)}</h2>
          <TransactionPieChart transactions={transactions} />
        </>
      )}
      <button onClick={() => setView(view === 'signup' ? 'login' : 'signup')}>
    {view === 'signup' ? 'Already have an account? Login' : 'Need an account? Sign Up'}
</button>


    </div>
    
  );
}

export default App;


