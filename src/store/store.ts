import { configureStore } from '@reduxjs/toolkit';
import { tagApiSlice } from './tagApiSlice/tagApiSlice';
import pageSliceReducer from './tableDataSlice/slice'

const store = configureStore({
  reducer: {
    pageSlice: pageSliceReducer,
    [tagApiSlice.reducerPath]: tagApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tagApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export default store;


