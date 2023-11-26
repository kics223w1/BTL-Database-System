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

export type Discount = {
  discount_id: string;
  name: string;
  value: number;
};

export type Staff = {
  staff_id: string;
  identification: string;
  name: string;
  gender: string;
  dob: string;
  role: string;
  manager_id: string;
  province: string;
  district: string;
  ward: string;
  number: string;
  res_id: string;
};

export type Banner = {};
