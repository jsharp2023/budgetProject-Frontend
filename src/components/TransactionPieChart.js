import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['green', 'red', 'gold'];

const TransactionPieChart = ({ transactions }) => {
  // Calculate totals for each category
  const data = [
    { name: 'Income', value: transactions.filter(t => t.category === 'Income').reduce((acc, t) => acc + t.amount, 0) },
    { name: 'Expense', value: transactions.filter(t => t.category === 'Expense').reduce((acc, t) => acc + t.amount, 0) },
    { name: 'Saving', value: transactions.filter(t => t.category === 'Saving').reduce((acc, t) => acc + t.amount, 0) },
  ];

  return (
    <PieChart width={1000} height={400}>
      <Pie
        data={data}
        cx={300}
        cy={175}
        labelLine={false}
        label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default TransactionPieChart;

