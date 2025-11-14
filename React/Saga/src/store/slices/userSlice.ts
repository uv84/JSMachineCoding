import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User, UserState } from './types';

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  selectedUser: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Action to start fetching users
    fetchUsersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // Action when users are fetched successfully
    fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
    },
    
    // Action when fetching users fails
    fetchUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Action to select a specific user
    selectUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
    
    // Action to clear selected user
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    
    // Action to add a new user
    addUserRequest: (state, _action: PayloadAction<Omit<User, 'id'>>) => {
      state.loading = true;
      state.error = null;
    },
    
    addUserSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.users.push(action.payload);
    },
    
    addUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  selectUser,
  clearSelectedUser,
  addUserRequest,
  addUserSuccess,
  addUserFailure,
} = userSlice.actions;

export const userReducer = userSlice.reducer;