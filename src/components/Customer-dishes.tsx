import { DataGrid, GridColDef, useGridApiRef } from "@mui/x-data-grid";
import React, { FC, useEffect } from "react";
import { Bill, Dish, DishInBill } from "../features/types";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import toast from "react-hot-toast";

const columns: GridColDef[] = [
  { field: "dish_id", headerName: "dish_id", width: 200 },
  { field: "dish_name", headerName: "dish_name", width: 200 },
  { field: "dish_count", headerName: "dish_count", width: 200 },
  { field: "current_price", headerName: "current_price", width: 200 },
];

const convertRows = (dishes: DishInBill[]) => {
  return dishes.map((dish) => {
    return {
      id: dish.dish_id,
      dish_id: dish.dish_id,
      dish_name: dish.dish_name,
      dish_count: dish.dish_count,
      current_price: dish.current_price,
    };
  });
};

type Props = {
  selectedBill: Bill | undefined;
};

const CustomerDishes: FC<Props> = ({ selectedBill }) => {
  const [dishes, setDishes] = React.useState<DishInBill[]>([]);
  const [rows, setRows] = React.useState<any[]>([]);
  const [selectedDish, setSelectedDish] = React.useState<
    DishInBill | undefined
  >(undefined);

  const apiRef = useGridApiRef();

  useEffect(() => {
    if (!selectedBill) {
      setDishes([]);
      setRows([]);
      setSelectedDish(undefined);
      apiRef.current?.setRowSelectionModel([]);
      return;
    }

    handleFetchDishes();
  }, [selectedBill]);

  const handleFetchDishes = async () => {
    if (!selectedBill) {
      return;
    }

    setSelectedDish(undefined);
    apiRef.current?.setRowSelectionModel([]);

    const response = await axios.get(
      `${BACKEND_URL}/dish_included?bill_id=${selectedBill.bill_id}`
    );
    const obj: { data: DishInBill[]; success: boolean } | undefined =
      await response.data;

    if (!obj) {
      toast.error("Something went wrong!");
      setDishes([]);
      setRows([]);
      return;
    }

    if (!obj.success) {
      toast.error(`${obj.data}`);
      setDishes([]);
      setRows([]);
      return;
    }

    const dishes = obj.data;
    setDishes(dishes);
    setRows(convertRows(dishes));
  };

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      apiRef={apiRef}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 20 },
        },
      }}
      pageSizeOptions={[5, 10, 20, 50, 100]}
      onRowSelectionModelChange={(indexes: any) => {
        const newSelectedDishes = dishes.flatMap((dish: DishInBill) => {
          return indexes.includes(dish.dish_id) ? [dish] : [];
        });
        if (newSelectedDishes.length === 0) {
          setSelectedDish(undefined);
          return;
        }
        setSelectedDish(newSelectedDishes[newSelectedDishes.length - 1]);
      }}
      checkboxSelection
    />
  );
};

export default CustomerDishes;
