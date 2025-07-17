export enum CATEGORY_TYPE {
  INC = "income",
  EXP = "expense",
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
