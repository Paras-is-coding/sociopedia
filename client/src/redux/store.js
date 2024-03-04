import {configureStore} from '@reduxjs/toolkit'
import authReducer from './features/authSlice.js'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'auth',
    storage,
  }
const persistedReducer = persistReducer(persistConfig, authReducer)


export const store = configureStore({
    reducer:persistedReducer
})

export const persistor = persistStore(store); 