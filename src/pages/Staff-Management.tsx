import React, { useEffect, useState } from "react";
import { Restaurant, Staff } from "../features/types";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import { DataGrid, GridColDef, useGridApiRef } from "@mui/x-data-grid";
import ConfirmDialog from "../components/dialogs/confirm-dialog";
import AddStaffDialog from "../components/dialogs/add-staff-dialog";
import UpdateStaffDialog from "../components/dialogs/update-staff-dialog";
import toast from "react-hot-toast";
import { TextField } from "@mui/material";

const columns: GridColDef[] = [
  { field: "staff_id", headerName: "staff_id", width: 200 },
  {
    field: "identification",
    headerName: "identification",
    width: 200,
  },
  {
    field: "staff_name",
    headerName: "staff_name",
    width: 200,
  },
  {
    field: "gender",
    headerName: "gender",
    width: 100,
  },
  {
    field: "date_of_birth",
    headerName: "date_of_birth",
    width: 300,
  },
  {
    field: "manager_id",
    headerName: "manager_id",
    width: 200,
  },
  {
    field: "province",
    headerName: " province",
    width: 200,
  },
  {
    field: "district",
    headerName: "district",
    width: 200,
  },
  {
    field: "ward",
    headerName: "ward",
    width: 200,
  },
  {
    field: "address_number",
    headerName: "address_number",
    width: 200,
  },
  {
    field: "res_id",
    headerName: "res_id",
    width: 200,
  },
  {
    field: "account_id",
    headerName: "account_id",
    width: 200,
  },
];

const convertStaffsToRows = (staffs: Staff[]) => {
  return staffs.flatMap((staff: Staff, index: number) => {
    return [
      {
        id: index,
        staff_id: staff.staff_id,
        identification: staff.identification,
        staff_name: staff.staff_name,
        gender: staff.gender ? "Male" : "Female",
        date_of_birth: staff.date_of_birth,
        manager_id: staff.manager_id,
        province: staff.province,
        district: staff.district,
        ward: staff.ward,
        address_number: staff.address_number,
        res_id: staff.res_id,
        account_id: staff.account_id,
      },
    ];
  });
};

const StaffManagement = () => {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const [rows, setRows] = useState<any[]>([]);
  const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
  const [isAddStaffDialogVisible, setIsAddStaffDialogVisible] = useState(false);
  const [isUpdateStaffDialogVisible, setIsUpdateStaffDialogVisible] =
    useState(false);
  const [isLoadingGetStaffs, setIsLoadingGetStaffs] = useState(false);

  const [selectedStaff, setSelectedStaff] = useState<Staff | undefined>(
    undefined
  );

  const apiRef = useGridApiRef();

  useEffect(() => {
    const setup = async () => {
      const [responseStaff, responseRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/staff`),
        axios.get(`${BACKEND_URL}/restaurant`),
      ]);

      const objStaff: { data: Staff[]; success: boolean } | undefined =
        responseStaff.data;
      const newStaffs =
        objStaff && objStaff.data && objStaff.data.length > 0
          ? objStaff.data
          : [];

      const objRes: { data: Restaurant[]; success: boolean } | undefined =
        responseRes.data;
      const newRestaurants = objRes && objRes.data ? objRes.data : [];

      setStaffs(newStaffs);
      setRestaurants(newRestaurants);

      apiRef.current.setRowSelectionModel([]);
      setSelectedStaff(undefined);
    };
    setup();
  }, []);

  useEffect(() => {
    const newRows = convertStaffsToRows(staffs);
    setRows(newRows);

    apiRef.current.setRowSelectionModel([]);
    setSelectedStaff(undefined);
  }, [staffs]);

  const handleGetStaffs = async () => {
    setIsLoadingGetStaffs(true);

    const response = await axios.get(`${BACKEND_URL}/staff`);

    setIsLoadingGetStaffs(false);

    const obj: { data: Staff[]; success: boolean } | undefined = response.data;
    const newStaffs = obj ? obj.data : [];
    const newRows = convertStaffsToRows(staffs);

    setStaffs(newStaffs);
    setRows(newRows);

    apiRef.current.setRowSelectionModel([]);
    setSelectedStaff(undefined);
  };

  const handleDeleteStaff = async () => {
    if (!selectedStaff) {
      toast.error("Please select a staff to delete!");
      return;
    }
    const response = await axios.delete(
      `${BACKEND_URL}/staff?staff_id=${selectedStaff.staff_id}`
    );

    const obj: { data: string; success: boolean } | undefined = response.data;
    if (!obj) {
      toast.error("Something went wrong!");
      return;
    }

    if (obj.success) {
      toast.success(
        `${obj.data} successfully, Please hit "Refresh" to refresh!`
      );
      return;
    }

    toast.error(`${obj.data}`);
  };

  return (
    <div className="flex flex-col w-full h-full overflow-auto justify-center py-14 px-32 gap-10">
      <div className="flex flex-col gap-5 w-full h-[600px] overflow-auto">
        <span className="text-lg font-bold">Staff table</span>
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
            const staffIDs = indexes.map((index: any) => rows[index].staff_id);
            const newSelectedStaffs = staffs.flatMap((staff: Staff) => {
              return staffIDs.includes(staff.staff_id) ? [staff] : [];
            });
            if (newSelectedStaffs.length > 0) {
              setSelectedStaff(newSelectedStaffs[newSelectedStaffs.length - 1]);
            } else {
              setSelectedStaff(undefined);
            }
          }}
          checkboxSelection
        />
      </div>
      <div className="flex items-center justify-center w-full gap-5">
        <button
          className="bg-orange-400 hover:bg-orange-400/90 p-2 w-[250px] rounded"
          onClick={() => {
            setIsAddStaffDialogVisible(true);
          }}
        >
          Insert new staff
        </button>
        <button
          className="bg-orange-400 hover:bg-orange-400/90 p-2 w-[250px] rounded"
          onClick={() => {
            setIsUpdateStaffDialogVisible(true);
          }}
        >
          Update selected staff
        </button>

        <button
          className="bg-orange-400 hover:bg-orange-400/90 p-2 w-[250px] rounded"
          onClick={() => {
            setIsConfirmDialogVisible(true);
          }}
        >
          Delete selected staff
        </button>

        <button
          className="bg-orange-400 hover:bg-orange-400/90 p-2 w-[250px] rounded"
          onClick={handleGetStaffs}
        >
          {isLoadingGetStaffs ? "Loading..." : "Refresh"}
        </button>
      </div>
      <Bottom />
      {selectedStaff && (
        <ConfirmDialog
          isOpen={isConfirmDialogVisible}
          title={`Are you sure you want to delete ${selectedStaff.staff_name} with ID: ${selectedStaff.staff_id} ?`}
          description="This action cannot be undone."
          handleAgree={async () => {
            await handleDeleteStaff();

            setIsConfirmDialogVisible(false);
          }}
          handleDisagree={() => {
            setIsConfirmDialogVisible(false);
          }}
          handleClose={() => {
            setIsConfirmDialogVisible(false);
          }}
        />
      )}
      <AddStaffDialog
        restaurant={restaurants}
        staffs={staffs}
        selectedStaff={undefined}
        isOpen={isAddStaffDialogVisible}
        handleClose={() => {
          setIsAddStaffDialogVisible(false);
        }}
        handleAgree={() => {
          setIsAddStaffDialogVisible(false);
        }}
      />
      {selectedStaff && (
        <UpdateStaffDialog
          restaurant={restaurants}
          staffs={staffs}
          selectedStaff={selectedStaff}
          isOpen={isUpdateStaffDialogVisible}
          handleClose={() => {
            setIsUpdateStaffDialogVisible(false);
          }}
          handleAgree={() => {
            setIsUpdateStaffDialogVisible(false);
          }}
        />
      )}
    </div>
  );
};

const Bottom = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [fromAge, setFromAge] = useState(18);
  const [toAge, setToAge] = useState(25);
  const [isLoading, setIsLoading] = useState(false);

  const handleFindStaffs = async () => {
    setIsLoading(true);

    const response = await axios.get(`${BACKEND_URL}/staff_age`, {
      params: {
        agemin: fromAge,
        agemax: toAge,
      },
    });

    setIsLoading(false);

    const obj: { data: Staff[]; success: boolean } | undefined = response.data;
    if (!obj) {
      setRows([]);
      toast.error("Something went wrong!");
      return;
    }

    if (obj.success) {
      const newRows = convertStaffsToRows(obj.data);
      setRows(newRows);
      return;
    }

    setRows([]);
    toast.error(`${obj.data}`);
  };

  return (
    <div className="flex flex-col gap-5 w-full h-[600px] mt-10 border-t border-gray-200 py-10">
      <span className="text-lg font-bold">PROCEDURE staff_age_in_range</span>
      <div className="flex items-baseline gap-5">
        <TextField
          label="From age"
          value={fromAge}
          type="number"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setFromAge(Number(e.target.value));
          }}
        />

        <TextField
          label="To age"
          value={toAge}
          type="number"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setToAge(Number(e.target.value));
          }}
        />

        <button
          className={`bg-orange-400 py-2 rounded w-[440px] px-4 hover:bg-orange-400/90`}
          onClick={handleFindStaffs}
        >
          {isLoading ? "Loading..." : "Find staffs"}
        </button>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
      />
    </div>
  );
};

export default StaffManagement;
