export enum CATEGORY_TYPE {
  INC = "income",
  EXP = "expense",
}

export enum RADIO_COLORS {
  INCOME = "peer-checked:bg-green-500",
  EXPENSE = "peer-checked:bg-red-500",
  CATEGORY = "peer-checked:bg-blue-500",
}

export type Category = {
  id: number;
  title: string;
  type: CATEGORY_TYPE;
};

export type Transaction = {
  id: number;
  amount: number;
  date: Date;
  category: Category;
  description?: string;
};

export type RawTransaction = Omit<Transaction, "date"> & {
  date: string;
};
