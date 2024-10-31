// lib/db.js
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const query = (text: string, params: any) => pool.query(text, params);

// Função para inserir uma transação
export const insertTransaction = (description: string, debt: number, typeId: number) => {
  return query(`
    INSERT INTO expenseRecord (Description, Debt, TypeId)
    VALUES (?, ?, ?)
  `, [description, debt, typeId]);
};

// Função para obter transações por tipo
export const getTransactionsByType = (typeId: string) => {
  return query(`
    SELECT * FROM expenseRecord
    WHERE TypeId = ?
  `, [typeId]);
};

// Função para obter todos os tipos de transações
export const getAllTransactions = () => {
  return query(`
    SELECT * FROM expenseRecord
  `, []);
};

// Função para obter todos os tipos de transações
export const deleteAllTransactions = () => {
  return query(`
    DELETE FROM expenseRecord
  `, []);
};


// Função para adicionar um novo tipo de transação
export const addTransactionType = (descricao: string) => {
  return query(`
    INSERT INTO typeTransaction (Descricao)
    VALUES (?)
  `, [descricao]);
};


export const getAllTransactionType = () => {
  return query(`
    SELECT * FROM typeTransaction
  `, []);
};

