import { createSlice, configureStore } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: {} },
  reducers: {
    setdata: (state, action) => {
      state.user = action.payload;
    },
  },
});
const store = configureStore({
  reducer: userSlice.reducer,
});
export const { setdata } = userSlice.actions;

export default store;
