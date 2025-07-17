export interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: string;
  date: Date;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  type: "income" | "expense";
  color: string;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  dedLine: Date;
}
