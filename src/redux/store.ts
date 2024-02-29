import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import TodoSlice from "./slice/TodoSlice";

export const  store  = configureStore({
  reducer: {
  todo: TodoSlice
  }
})

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = ()=> useDispatch<AppDispatch>()