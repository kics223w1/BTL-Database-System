import { DataGrid, GridColDef, useGridApiRef } from "@mui/x-data-grid";
import React, { FC, useEffect } from "react";
import { Bill, Promotion } from "../features/types";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import toast from "react-hot-toast";

const columns: GridColDef[] = [
  { field: "promotion_id", headerName: "promotion_id", width: 200 },
  { field: "promotion_name", headerName: "promotion_name", width: 200 },
  { field: "promotion_type", headerName: "promotion_type", width: 200 },
  { field: "start_time", headerName: "start_time", width: 200 },
  { field: "end_time", headerName: "end_time", width: 200 },
  { field: "reduced_price", headerName: "reduced_price", width: 200 },
  { field: "reduced_percent", headerName: "reduced_percent", width: 200 },
];

const convertRows = (promotions: Promotion[]) => {
  return promotions.map((promotion: Promotion) => {
    return {
      id: promotion.promotion_id,
      promotion_id: promotion.promotion_id,
      promotion_name: promotion.promotion_name,
      promotion_type: promotion.promotion_type,
      start_time: promotion.start_time,
      end_time: promotion.end_time,
      reduced_price: promotion.reduced_price,
      reduced_percent: promotion.reduced_percent,
    };
  });
};

type Props = {
  selectedBill: Bill | undefined;
};

const CustomerPromotions: FC<Props> = ({ selectedBill }) => {
  const [promotions, setPromotions] = React.useState<Promotion[]>([]);
  const [rows, setRows] = React.useState<any[]>([]);
  const [selectedPromotion, setSelectedPromotion] = React.useState<
    Promotion | undefined
  >(undefined);

  const apiRef = useGridApiRef();

  useEffect(() => {
    if (!selectedBill) {
      setPromotions([]);
      setRows([]);
      setSelectedPromotion(undefined);
      apiRef.current?.setRowSelectionModel([]);
      return;
    }

    handleFetchDishes();
  }, [selectedBill]);

  const handleFetchDishes = async () => {
    if (!selectedBill) {
      return;
    }

    setSelectedPromotion(undefined);
    apiRef.current?.setRowSelectionModel([]);

    const response = await axios.get(
      `${BACKEND_URL}/promo?bill_id=${selectedBill.bill_id}`
    );
    const obj: { data: Promotion[]; success: boolean } | undefined =
      await response.data;

    if (!obj) {
      toast.error("Something went wrong!");
      setPromotions([]);
      setRows([]);
      return;
    }

    if (!obj.success) {
      toast.error(`${obj.data}`);
      setPromotions([]);
      setRows([]);
      return;
    }

    const dishes = obj.data;
    setPromotions(dishes);
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
        const newSelectedPromotions = promotions.flatMap(
          (promotion: Promotion) => {
            return indexes.includes(promotion.promotion_id) ? [promotion] : [];
          }
        );
        if (newSelectedPromotions.length === 0) {
          setSelectedPromotion(undefined);
          return;
        }
        setSelectedPromotion(
          newSelectedPromotions[newSelectedPromotions.length - 1]
        );
      }}
      checkboxSelection
    />
  );
};

export default CustomerPromotions;
