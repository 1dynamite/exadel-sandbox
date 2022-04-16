export interface Transaction {
  title: string;
  receivalDate: string;
  category: {
    categoryId: string;
    title: string;
    type: string;
  };
  amount: Number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
