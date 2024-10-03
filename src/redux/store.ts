import { configureStore } from '@reduxjs/toolkit';
import feedbackFormsReducer from './feedbackFormsSlice';
import userDetailReducer from './usersSlice'

const store = configureStore({
  reducer: {
    feedbackForms: feedbackFormsReducer,
    userDetails: userDetailReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
