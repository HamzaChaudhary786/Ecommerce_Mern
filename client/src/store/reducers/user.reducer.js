import { createSlice } from '@reduxjs/toolkit';
const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    allUsers: [],
  },
  reducers: {
    setLogin: (state, action) => {
      state.userData = action.payload.user;
      // state.token = action.payload.token;
      // localStorage.setItem('userData', JSON.stringify(state.userData));
      // localStorage.setItem('token', state.token);
    },
    setLogout: (state) => {
      state.userData = null;
    },

    setAllUsers: (state, action) => {

      state.allUsers = action.payload.allUsers;

    }
  },
});

export const { setLogin, setLogout, setAllUsers } = userSlice.actions;
export default userSlice.reducer;
