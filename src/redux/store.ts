import { configureStore } from '@reduxjs/toolkit';
import authReducer from "@/redux/feautres/auth.slice";
import messageReducer from "@/redux/feautres/message.slice";

const reducer = {
  auth: authReducer,
  message: messageReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;