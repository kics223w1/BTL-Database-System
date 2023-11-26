import React, { useEffect, useState } from "react";
import { Staff } from "../features/types";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import ConfirmDialog from "../components/dialogs/confirm-dialog";
import AddStaffDialog from "../components/dialogs/add-staff-dialog";

const convertStaffsToRows = (staffs: Staff[]) => {
  return staffs.flatMap((staff: Staff, index: number) => {
    return [
      {
        id: index,
        staff_id: staff.staff_id,
        identification: staff.identification,
        name: staff.name,
        gender: staff.gender,
        dob: new Date(),
        role: staff.role,
        manager_id: staff.manager_id,
        province: staff.province,
        district: staff.district,
        ward: staff.ward,
        number: staff.number,
        res_id: staff.res_id,
      },
    ];
  });
};

const Admin = () => {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [selectedStaffs, setSelectedStaffs] = useState<Staff[]>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
  const [isAddStaffDialogVisible, setIsAddStaffDialogVisible] = useState(false);

  useEffect(() => {
    const setup = async () => {
      const { data } = await axios.get(`${BACKEND_URL}/staffs`);
      const newStaffs = data ? data.staffs : [];

      setStaffs(newStaffs);
    };
    setup();
  }, []);

  useEffect(() => {
    const newRows = convertStaffsToRows(staffs);
    setRows(newRows);
  }, [staffs]);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
    { field: "staff_id", headerName: "Staff ID", width: 100 },
    {
      field: "identification",
      headerName: "Identification",
      width: 140,
      editable: true,
    },
    {
      field: "name",
      headerName: "name",
      width: 140,
      editable: true,
    },
    {
      field: "gender",
      headerName: "gender",
      width: 100,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Male", "Female"],
    },
    {
      field: "dob",
      headerName: "Date of Birth",
      type: "date",
      width: 140,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 160,
      editable: true,
      type: "singleSelect",
      valueOptions: ["receptionist", "cashier"],
    },
    {
      field: "manager_id",
      headerName: "Manager ID",
      width: 100,
      editable: true,
    },
    {
      field: "res_id",
      headerName: "Restaurant ID",
      width: 140,
      editable: true,
    },
    {
      field: "province",
      headerName: "Province",
      width: 100,
      editable: true,
    },
    {
      field: "district",
      headerName: "District",
      width: 100,
      editable: true,
    },
    {
      field: "ward",
      headerName: "Ward",
      width: 100,
      editable: true,
    },
    {
      field: "number",
      headerName: "Number",
      width: 100,
      editable: true,
    },
  ];

  return (
    <>
      <div className="w-full h-[90vh] flex items-center justify-center py-10 px-10">
        <div className="flex flex-col gap-4 w-full h-full">
          <DataGrid
            rows={rows}
            columns={columns}
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
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
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
            checkboxSelection
          />
          <div className="flex items-center justify-center w-full gap-5">
            <button
              className="bg-orange-600 hover:bg-orange-400 p-4 rounded"
              onClick={() => {
                setIsConfirmDialogVisible(true);
              }}
            >
              Delete selected staffs
            </button>
            <button
              className="bg-orange-600 hover:bg-orange-400 p-4 rounded"
              onClick={() => {
                setIsAddStaffDialogVisible(true);
              }}
            >
              Add new staff
            </button>
          </div>
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
