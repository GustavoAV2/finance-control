"use client";
import React, { useState, useEffect } from "react";
import { TransactionType } from "../components/TransactionType";
import { transformEnumToTransactionTypes, intToTransactionTypeEnum } from "../components/TransactionTypesEnum";

interface HistoryComponentProps {
  transactions: any[];
}

const HistoryComponent: React.FC<HistoryComponentProps> = ({ transactions }) => {
  const [transactionsSelected, setTransactionsSelected] = useState<any[]>(transactions);
  const [transactionTypes] = useState<TransactionType[]>(transformEnumToTransactionTypes());
  const [transactionType, setTransactionType] = useState<TransactionType>(new TransactionType("1", "Todos"));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "type") {
      const type = transactionTypes.find((x) => x.Id === value);
      if (value == "1"){
        setTransactionsSelected(transactions);
      }

      if (type != null) {
        setTransactionType(type);
        const filteredTransactions = transactions.filter((x) => x.TypeId == type.Id);
        setTransactionsSelected(filteredTransactions);
      }
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="mr-4">
        <label className="block text-sm font-medium mb-1">Type</label>

        <select
          name="type" value={transactionType.Id} onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded" required
        >
          <option key="1" value="1">
            Todos
          </option>
          
          {transactionTypes.map((type) => (
            <option key={type.Id} value={type.Id}>
              {type.Descricao}
            </option>
          ))}
        </select>
      </div>

      <div id="transactions" className="flex-col mt-4">
        {transactionsSelected.length > 0 ? (
          transactionsSelected.map((transaction) => (
            <div key={transaction.Id} className="border p-4 mb-2 w-96 hover:border-teal-500">
              <p>
                <strong>Tipo:</strong> {intToTransactionTypeEnum(transaction.TypeId)?.toString()}
              </p>
              <p className="text-xl text-center">
                <strong>Valor: R$</strong> {transaction.Debt}
              </p>
              <hr className="mb-1" />
              <p>
                <strong>Descrição:</strong> {transaction.Description}
              </p>
              <p>
                <strong>Data:</strong>
              </p>
            </div>
          ))
        ) : (
          <p>Nenhuma transação encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryComponent;
