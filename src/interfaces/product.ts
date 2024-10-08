export interface IRating {
  rate: number;
  count: number;
}

export interface IProduct {
  _id: string;
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: IRating;
}
