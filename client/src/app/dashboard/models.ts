export interface Account {
  transactions: string;
  description: string;
  title: string;
  currency: {
    _id: string;
    name: string;
    symbol: string;
  };
  balance: number;
  _id: string;
}

export interface AddAccount {
  title: string;
  description: string;
  currency: {
    _id: string;
    name: string;
    symbol: string;
  };
}

export interface ReturnType {
  message: string;
  account: Account;
  field?: string;
}

export interface EditAccount {
  title: string;
  description: string;
  currency: {
    _id: string;
    name: string;
    symbol: string;
  };
}

export interface Params {
  userId: string;
  accountId: string;
}

export interface Currency {
  _id: string;
  name: string;
  symbol: string;
}

export interface Category {
  _id?: string;
  title: string;
  type: 'expense' | 'income';
}

export interface Transaction {
  _id?: string;
  type: 'expense' | 'income';
  title: string;
  receivalDate: string;
  categories: string[];
  amount: number;
  payee: string;
  description: string;
}
