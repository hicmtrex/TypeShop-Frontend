import { Product } from '../components/product-card';

export interface Ordertypes {
  _id: string;
  user: string;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  cartItems: Product[];
  totalPrice: number;
  isPaid: boolean;
  createdAt: Date;
}

export type ReviewTypes = {
  _id: string;
  createdAt: Date;
  rating: number;
  comment: string;
  name: string;
  user: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: Date;
};

export type AddressTypes = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};
