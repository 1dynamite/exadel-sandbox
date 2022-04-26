interface Category {
  title: string;
  type: string;
  _id: string;
}

export interface User {
  _id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  accounts: any;
  categories: [Category];
}
