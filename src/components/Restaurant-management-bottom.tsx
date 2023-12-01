import React, { FC } from "react";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import { Restaurant } from "../features/types";

type RestaurantManagementBottomProps = {
  restaurants: Restaurant[];
};

const RestaurantManagementBottom: FC<RestaurantManagementBottomProps> = ({
  restaurants,
}) => {
  const [month, setMonth] = React.useState<number>(1);
  const [year, setYear] = React.useState<number>(2023);

  const [resID, setResID] = React.useState<string>("");
  const [yearRevenue, setYearRevenue] = React.useState<number>(2023);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoadingRevenue, setIsLoadingRevenue] =
    React.useState<boolean>(false);

  const handleGetBestSeller = async () => {
    if (month <= 0 || year <= 0) {
      toast.error("Month and year must be greater than 0!");
      return;
    }

    setIsLoading(true);
    const response = await axios.get(`${BACKEND_URL}/best_seller`, {
      params: {
        month: month,
        year: year,
      },
    });

    setIsLoading(false);

    const obj: { data: string; success: boolean } | undefined = response.data;

    if (!obj) {
      toast.error("Something went wrong!");
      return;
    }

    if (obj.success) {
      toast.success(`${obj.data}`, {
        duration: 6000,
      });
      return;
    }

    toast.error(`${obj.data}`, {
      duration: 2000,
    });
  };

  const handleGetRevenue = async () => {
    if (year <= 0) {
      toast.error("Year must be greater than 0!");
      return;
    }

    const isResIDValid = restaurants.some(
      (restaurant) => restaurant.res_id === resID
    );
    if (!isResIDValid) {
      toast.error("Restaurant ID is not valid!");
      return;
    }

    setIsLoadingRevenue(true);
    const response = await axios.get(`${BACKEND_URL}/revenue`, {
      params: {
        res_id: resID,
        year: yearRevenue,
      },
    });

    setIsLoadingRevenue(false);

    const obj: { data: string; success: boolean } | undefined = response.data;

    if (!obj) {
      toast.error("Something went wrong!");
      return;
    }

    if (obj.success) {
      toast.success(`${obj.data}`, {
        duration: 6000,
      });
      return;
    }

    toast.error(`${obj.data}`, {
      duration: 2000,
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-baseline gap-5">
        <TextField
          label="At month"
          value={month}
          type="number"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setMonth(Number(e.target.value));
          }}
        />

        <TextField
          label="At year"
          value={year}
          type="number"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setYear(Number(e.target.value.trim()));
          }}
        />

        <button
          className={`bg-orange-400 py-2 rounded w-80 hover:bg-orange-400/90`}
          onClick={handleGetBestSeller}
        >
          {isLoading ? "Loading..." : "Get best seller"}
        </button>
      </div>

      <div className="flex items-baseline gap-5">
        <TextField
          label="Enter restaurant ID"
          defaultValue={""}
          fullWidth
          variant="standard"
          onChange={(e) => {
            setResID(e.target.value);
          }}
        />

        <TextField
          label="At year"
          value={yearRevenue}
          type="number"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setYearRevenue(Number(e.target.value.trim()));
          }}
        />

        <button
          className={`bg-orange-400 py-2 rounded w-80 hover:bg-orange-400/90`}
          onClick={handleGetRevenue}
        >
          {isLoadingRevenue ? "Loading..." : "Get revenue"}
        </button>
      </div>
    </div>
  );
};

export default RestaurantManagementBottom;
