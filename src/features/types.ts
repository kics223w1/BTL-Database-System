export type Restaurant = {
  res_id: string;
  res_name: string;
  hotline: number;
  province: string;
  district: string;
  ward: string;
  address_number: string;
  table_count: number;
  total_slot: number;
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
  account_id: string;
  staff_id: string;
  identification: string;
  staff_name: string;
  gender: number;
  date_of_birth: string;
  manager_id: string | null;
  province: string;
  district: string;
  ward: string;
  address_number: string;
  res_id: string;
};

export type StaffForAdding = {
  identification: string;
  name: string;
  gender: number;
  date_of_birth: string;
  manager_id: string | null;
  province: string;
  district: string;
  ward: string;
  address_number: string;
  res_id: string;
  email: string;
  phone_number: string;
  accID: string;
};

export type StaffForUpdating = {
  id: string;
  identification: string;
  name: string;
  gender: number;
  date_of_birth: string;
  manager_id: string | null;
  province: string;
  district: string;
  ward: string;
  address_number: string;
  res_id: string;
  accID: string;
};

export type Banner = {};
