// components/TransactionPopup.tsx
import React, { useState, useEffect } from 'react';
import { TransactionType } from './TransactionType';
import { intToTransactionTypeEnum, TransactionTypeEnum } from './TransactionTypesEnum';

interface TransactionPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const TransactionPopup: React.FC<TransactionPopupProps> = ({ isOpen, onClose }) => {
  const [transaction, setTransaction] = useState({
    title: '',
    amount: 0,
    debt: 0,
    type: "Health", // Default value
  });
  const [transactionTypes, setTransactionTypes] = useState<TransactionType[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Fetch transaction types on open
      fetch('/api/transactions-type')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          const types = data.reduce((acc: TransactionType[], type: { Id: string; Descricao: string }) => {
            acc.push({ Id: type.Id, Descricao: type.Descricao });
            return acc;
          }, []);
          setTransactionTypes(types);
          console.log(types);
        });
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTransaction(prev => ({
      ...prev,
      [name]: name === 'amount' || name === 'debt' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: transaction.title,
        value: transaction.amount,
        debt: transaction.debt,
        typeId: transaction.type,
      }),
    })
      .then(response => response.json())
      .then(() => {
        console.log('Transaction Submitted:', transaction);
        onClose(); // Close the popup after submission
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg z-50">
        <h2 className="text-2xl mb-4">Add Transaction</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={transaction.title}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Debt</label>
            <input
              type="number"
              name="debt"
              value={transaction.debt}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              name="type"
              value={intToTransactionTypeEnum(parseInt(transaction.type))}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
              required
            >
              {transactionTypes.map((type) => (
                <option key={type.Id} value={type.Id}>
                  {type.Descricao}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-white p-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionPopup;
