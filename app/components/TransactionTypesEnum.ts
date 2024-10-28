import { TransactionType } from "./TransactionType";

export enum TransactionTypeEnum {
  Health = "2",
  Study = "3",
  Transport = "4",
  Leisure = "5",
  Food = "6",
  Home = "7"
}

export function intToTransactionTypeEnum(value: number): TransactionTypeEnum | undefined {
  const transactionType = Object.values(TransactionTypeEnum).find(
    (type) => type === value.toString()
  );

  return transactionType as TransactionTypeEnum | undefined;
}

export function transformEnumToTransactionTypes(): TransactionType[] {
  return Object.entries(TransactionTypeEnum).map(([key, value]) => {
    return new TransactionType(value, key);
  });
}