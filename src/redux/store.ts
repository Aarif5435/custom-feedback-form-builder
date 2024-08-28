import { configureStore } from '@reduxjs/toolkit';
import feedbackFormsReducer from './feedbackFormsSlice';

const store = configureStore({
  reducer: {
    feedbackForms: feedbackFormsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
