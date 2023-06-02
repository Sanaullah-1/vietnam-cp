import { configureStore } from '@reduxjs/toolkit';
import tradingAccountsSlice from './slices/tradingAccountsSlice';
import userReducer from './slices/userSlice';
export default configureStore({
    reducer: {
        user: userReducer,
        tradingAccounts: tradingAccountsSlice
    }
})