import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice.js';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import postSlice from './postSlice.js';
import socketSlice from './socketSlice.js';
import chatSlice from './chatSlice.js';
import RTNSlice from './RTNSlice.js';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer=combineReducers({
    auth:authSlice,
    post:postSlice,
    socketio:socketSlice,
    chat:chatSlice,
    realTimeNotification:RTNSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store;