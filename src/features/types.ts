export type Restaurant = {
  res_id: string;
  name: string;
  table_count: number;
  hotline: string;
  province: string;
  district: string;
  ward: string;
  number: string;
};

export type Dish = {
  dish_id: string;
  name: string;
  price: number;
  image: string;
  type: string;
};

export type Banner = {};
