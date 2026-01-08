import {configureStore} from '@reduxjs/toolkit';
import {authSlice} from '../Store/authslice'

export const Store = configureStore({
    reducer:{
        auth:authSlice,
    }
})