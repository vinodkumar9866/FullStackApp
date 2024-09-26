import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  username: "",
  userId: "",
  fullName: "",
  phone: "",
  email: "",
};
const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser(state, action) {
      state.username = action.payload.username;
      state.userId = action.payload._id;
      state.fullName = action.payload.fullname;
      state.phone = action.payload.phone;
      state.email = action.payload.email;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
