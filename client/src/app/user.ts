interface Category {
  name: string;
}

export interface User {
  _id: number;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  accounts: any;
  incomeCategories: Category[];
  expenseCategories: Category[];
}
