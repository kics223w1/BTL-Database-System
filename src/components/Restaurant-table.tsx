import React, { FC, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Restaurant } from "../features/types";

const columns: GridColDef[] = [
  { field: "res_id", headerName: "res_id", width: 200 },
  {
    field: "res_name",
    headerName: "res_name",
    width: 200,
  },
  {
    field: "hotline",
    headerName: "hotline",
    width: 200,
  },
  {
    field: "province",
    headerName: "province",
    width: 100,
  },
  {
    field: "district",
    headerName: "district",
    width: 300,
  },
  {
    field: "ward",
    headerName: "ward",
    width: 200,
  },
  {
    field: "address_number",
    headerName: " address_number",
    width: 200,
  },
  {
    field: "table_count",
    headerName: "table_count",
    width: 200,
  },
  {
    field: "total_slot",
    headerName: "total_slot",
    width: 200,
  },
];

type RestaurantTableProps = {
  restaurants: Restaurant[];
};

const convertRestaurantsToRows = (restaurants: Restaurant[]) => {
  return restaurants.map((restaurant) => {
    return {
      id: restaurant.res_id,
      res_id: restaurant.res_id,
      res_name: restaurant.res_name,
      hotline: restaurant.hotline,
      province: restaurant.province,
      district: restaurant.district,
      ward: restaurant.ward,
      address_number: restaurant.address_number,
      table_count: restaurant.table_count,
      total_slot: restaurant.total_slot,
    };
  });
};

const RestaurantTable: FC<RestaurantTableProps> = ({ restaurants }) => {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    const newRows = convertRestaurantsToRows(restaurants);
    setRows(newRows);
  }, [restaurants.length]);

  return (
    <div className="w-full h-[90vh] flex flex-col justify-center py-14 px-20">
      <div className="w-full h-full overflow-auto">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default RestaurantTable;
