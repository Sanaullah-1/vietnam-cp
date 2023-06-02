import { createSlice } from "@reduxjs/toolkit";

// pure function 
export const tradingAccountsSlice = createSlice({
    name: "user",
    initialState: {
        liveAccounts: null,
        demoAccounts: null
    },
    reducers: {
        liveAccountsLoaded: (state, action) => {
            let newState = action.payload;
            return {
                ...state,
                liveAccounts: newState
            };
        },
        demoAccountsLoaded: (state, action) => {
            let newState = action.payload;
            return {
                ...state,
                demoAccounts: newState
            };
        },
        demoAccountAdded: (state, action) => {
            const newState = { ...state };
            newState.demoAccounts = [
                ...state.demoAccounts,
                action.payload
            ];
            return newState
        },
        liveAccountAdded: (state, action) => {
            const updatedAccounts = structuredClone(state.liveAccounts);
            updatedAccounts.push(action.payload);

            return {
                ...state,
                liveAccounts: updatedAccounts
            };
        },

    }

})

export const { liveAccountsLoaded, demoAccountsLoaded, demoAccountAdded, liveAccountAdded } = tradingAccountsSlice.actions;
export default tradingAccountsSlice.reducer;