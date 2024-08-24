"use client"
import React, { useState } from 'react';
import TransactionPopup from './TransactionPopup';

const TransactionButton: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div>
      <button
        onClick={openPopup}
        className="bg-green-500 text-white p-2 rounded"
      >
        Add Transaction
      </button>
      <TransactionPopup isOpen={isPopupOpen} onClose={closePopup} />
    </div>
  );
};

export default TransactionButton;
