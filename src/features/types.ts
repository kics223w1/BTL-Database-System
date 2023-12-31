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

export type Promotion = {
  promotion_id: string;
  promotion_name: string;
  promotion_type: string;
  start_time: string;
  end_time: string;
  reduced_price: number | null;
  reduced_percent: number | null;
};

export type Dish = {
  dish_id: string;
  dish_name: string;
  price: number;
  dish_img: string;
  dish_type: string;
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
  identification: string | null;
  name: string | null;
  gender: number | null | string;
  date_of_birth: string | null;
  manager_id: string | null;
  province: string | null;
  district: string | null;
  ward: string | null;
  address_number: string | null;
  res_id: string | null;
  accID: string | null;
};

export type Table = {
  res_id: string;
  table_id: string;
  slot_count: number;
};

export type ReservedTable = {
  reservation_id: string;
  res_id: string;
  table_id: string;
};

export type Customer = {
  cus_id: string;
  cus_name: string;
  phone_num: string;
  account_id: string;
  loyalty_point: number;
};

export type CustomerPay = Customer & { Total: number };

export type Account = {
  account_id: string;
  account_password: string;
};

export type Bill = {
  bill_id: string;
  bill_datetime: string;
  pay_status: boolean;
  table_id: string;
  res_id: string;
  cus_id: string;
  total_cost: number;
};

export type DishInBill = {
  bill_id: string;
  dish_id: string;
  dish_count: number;
  current_price: number;
  dish_name: string;
};

export type BillToCreate = {
  bill_id: string;
  bill_datetime: string;
  table_id: string;
  res_id: string;
  cus_id: string;
};

export type PayLoadReservation = {
  reservation_id: string;
  slot_count: number;
  date_time: string; // E.g 2023-10-22 07:08:08.000
  cus_id: string;
  res_id: string;
  table_id: string;
};
