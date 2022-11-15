export interface UserType {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AccountType {
  accNumber: string;
  type: string;
  user_id: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TransactionType {
  id: string;
  sender: string;
  receiver: string;
  type: "deposit" | "withdrawal";
  description: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}
