import { createSlice } from '@reduxjs/toolkit';

const tableDataSlice = createSlice({
  name: 'pageNumber',
  initialState: {
    page: 1,
    tagsPerPage: 10,
    order: "desc",
  },
  reducers: {
    setPage: (state, action) => {
      return {...state, page: action.payload}
      
    },
    setTagsPerPage: (state, action) => {
      return {...state, tagsPerPage: action.payload}
    },
    setOrder: (state, action) => {
      return {...state, order: action.payload}
    },
  },
  selectors: {
    getPage: state => state.page,
    getTagsPerPage: state => state.tagsPerPage,
    getOrder: state => state.order,
  }
});

export const { setPage, setTagsPerPage, setOrder } = tableDataSlice.actions;

export const { getPage, getTagsPerPage, getOrder } = tableDataSlice.selectors;

export default tableDataSlice.reducer;