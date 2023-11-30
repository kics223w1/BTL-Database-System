import React, { useEffect, useState } from "react";
import { Restaurant, Staff } from "../features/types";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ConfirmDialog from "../components/dialogs/confirm-dialog";
import AddStaffDialog from "../components/dialogs/add-staff-dialog";

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

const Admin = () => {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const [rows, setRows] = useState<any[]>([]);
  const [selectedStaffs, setSelectedStaffs] = useState<Staff[]>([]);
  const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
  const [isAddStaffDialogVisible, setIsAddStaffDialogVisible] = useState(false);
  const [isLoadingGetStaffs, setIsLoadingGetStaffs] = useState(false);

  useEffect(() => {
    const setup = async () => {
      const [responseStaff, responseRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/staff`),
        axios.get(`${BACKEND_URL}/restaurant`),
      ]);

      const objStaff: { data: Staff[]; success: boolean } | undefined =
        responseStaff.data;
      const newStaffs = objStaff ? objStaff.data : [];

      const objRes: { data: Restaurant[]; success: boolean } | undefined =
        responseRes.data;
      const newRestaurants = objRes ? objRes.data : [];

      setStaffs(newStaffs);
      setRestaurants(newRestaurants);
    };
    setup();
  }, []);

  useEffect(() => {
    const newRows = convertStaffsToRows(staffs);
    setRows(newRows);
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
  };

  return (
    <>
      <div className="w-full h-[90vh] flex flex-col justify-center gap-2 py-14 px-20">
        <div className="w-full h-full min- overflow-auto">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 20 },
              },
            }}
            pageSizeOptions={[5, 10, 20, 50, 100]}
            onRowSelectionModelChange={(indexes: any) => {
              const staffIDs = indexes.map(
                (index: any) => rows[index].staff_id
              );
              const newSelectedStaffs = staffs.flatMap((staff: Staff) => {
                return staffIDs.includes(staff.staff_id) ? [staff] : [];
              });
              setSelectedStaffs(newSelectedStaffs);
            }}
            checkboxSelection
          />
        </div>
        <div className="flex items-center justify-center w-full gap-5">
          <button
            className="bg-orange-600 hover:bg-orange-400 p-2 w-[250px] rounded"
            onClick={() => {
              setIsAddStaffDialogVisible(true);
            }}
          >
            Add new staff
          </button>
          <button
            className="bg-orange-600 hover:bg-orange-400 p-2 w-[250px] rounded"
            onClick={() => {
              setIsConfirmDialogVisible(true);
            }}
          >
            Update selected staff
          </button>

          <button
            className="bg-orange-600 hover:bg-orange-400 p-2 w-[250px] rounded"
            onClick={() => {
              setIsConfirmDialogVisible(true);
            }}
          >
            Delete selected staffs
          </button>

          <button
            className="bg-orange-600 hover:bg-orange-400 p-2 w-[250px] rounded"
            onClick={handleGetStaffs}
          >
            {isLoadingGetStaffs ? "Loading..." : "Get staffs"}
          </button>
        </div>
      </div>
      <ConfirmDialog
        isOpen={isConfirmDialogVisible}
        title={`Are you sure you want to delete ${selectedStaffs.length} ${
          selectedStaffs.length > 1 ? "staffs" : "staff"
        }?`}
        description="This action cannot be undone."
        handleAgree={() => {
          setIsConfirmDialogVisible(false);
        }}
        handleDisagree={() => {
          setIsConfirmDialogVisible(false);
        }}
        handleClose={() => {
          setIsConfirmDialogVisible(false);
        }}
      />
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
    </>
  );
};

export default Admin;
