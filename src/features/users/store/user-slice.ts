import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterParams: {
    filterBy: 'REGISTERED',
    currentPage: 1,
    perPage: 25,
    search: '',
    orderBy: 'createdAt',
    order: 'desc'
  }
};
export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateFilterParams: (state, action) => {
      return { ...state, filterParams: action.payload };
    }
  }
});

export const { updateFilterParams } = userSlice.actions;
export default userSlice.reducer;
