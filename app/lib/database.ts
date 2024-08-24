// lib/database.ts
import Database from 'better-sqlite3';

const db = new Database('finance.db');

// Função para inserir uma transação
export const insertTransaction = (description: string, debt: number, typeId: number) => {
  const stmt = db.prepare(`
    INSERT INTO expenseRecord (Description, Debt, TypeId)
    VALUES (?, ?, ?)
  `);
  return stmt.run(description, debt, typeId);
};

// Função para obter transações por tipo
export const getTransactionsByType = (typeId: number) => {
  const stmt = db.prepare(`
    SELECT * FROM expenseRecord
    WHERE TypeId = ?
  `);
  return stmt.all(typeId);
};

// Função para obter todos os tipos de transações
export const getAllTransactionTypes = () => {
  const stmt = db.prepare(`
    SELECT * FROM typeTransaction
  `);
  return stmt.all();
};

// Função para adicionar um novo tipo de transação
export const addTransactionType = (descricao: string) => {
  const stmt = db.prepare(`
    INSERT INTO typeTransaction (Descricao)
    VALUES (?)
  `);
  return stmt.run(descricao);
};
