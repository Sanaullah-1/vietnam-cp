import { createSlice } from "@reduxjs/toolkit";

// pure function 
export const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        userLoaded: (state, action) => {
            let newState = action.payload;
            return newState;
        },

    }

})

export const { userLoaded } = userSlice.actions;
export default userSlice.reducer;