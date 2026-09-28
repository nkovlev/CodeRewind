import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import authReducer from "./slices/authSlice";
import githubReducer from "./slices/githubSlice";

// На сервере нет sessionStorage, поэтому подставляем заглушку
const createNoopStorage = () => ({
    getItem: async () => null,
    setItem: async (_key: string, value: string) => value,
    removeItem: async () => {},
});

const storage =
    typeof window !== "undefined"
        ? createWebStorage("session") // sessionStorage; для localStorage: "local"
        : createNoopStorage();

const rootReducer = combineReducers({
    auth: authReducer,
    github: githubReducer,
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "github"],
};

export const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;