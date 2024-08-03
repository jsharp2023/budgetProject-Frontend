import React from 'react';
//makes the list of nums
const TransactionList = ({ transactions, deleteTransaction }) => {
  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction._id}>
            {transaction.title}: ${transaction.amount} - {transaction.category}
            <button onClick={() => deleteTransaction(transaction._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
