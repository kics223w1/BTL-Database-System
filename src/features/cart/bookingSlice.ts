import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  booking: {
    tables: 0,
    date: "",
  },
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBooking: (state, action) => {
      state.booking = action.payload;
    },
  },
});

export const selectBooking = ({ booking }) => booking;

export const { setBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
