import React, { useState } from 'react';
//adding the new amount
const AddTransaction = ({ addTransaction }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Income'); // Default to 'Income'
//submit num
  const handleSubmit = (event) => {
    event.preventDefault();
    let parsedAmount = parseFloat(amount);
//check num valid
    if (isNaN(parsedAmount)) {
      alert("Amount must be a valid number");
      return;
    }

    // Adjust the amount based on category
    if (category === 'Expense') {
      parsedAmount = -Math.abs(parsedAmount); // Ensure the amount is negative
    }

    const newTransaction = { title, amount: parsedAmount, category };

    console.log('Adding transaction:', newTransaction);
    
    addTransaction(newTransaction);
    //resets the field
    setTitle('');
    setAmount('');
    setCategory('Income'); // Reset to default category
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTransaction;
