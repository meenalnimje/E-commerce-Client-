import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import cartReducer from "./cartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  categoryReducer,
  cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],

  // below line is helpful when we have to disable the redux otherwise whatever we do in redux it will be visible to others
});

export const persistor = persistStore(store);
// for redux-persist we have to do changes only in store.js and index.ja
