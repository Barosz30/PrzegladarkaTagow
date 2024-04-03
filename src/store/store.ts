import { configureStore } from '@reduxjs/toolkit';
import { tagApiSlice } from './tagApiSlice/tagApiSlice';

const store = configureStore({
  reducer: {
    [tagApiSlice.reducerPath]: tagApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tagApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
