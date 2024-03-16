export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type SearchProductParams = {
  currentPage: string;
};

export interface ProductSliceState {
  items: Product[];
  status: Status;
}
