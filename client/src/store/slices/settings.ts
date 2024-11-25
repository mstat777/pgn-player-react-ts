import { createSlice } from "@reduxjs/toolkit/react";

type settingsType = {
    showBoardNotation: boolean;
    showInfoBar: boolean;
    showModal: boolean;
    showSettings: boolean;
    showStatusPanel: boolean;
}

const initialState: settingsType = {
    showBoardNotation: true,
    showInfoBar: true,
    showModal: false,
    showSettings: false,
    showStatusPanel: true,
}

export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setShowBoardNotation: (state, action) => {
            state.showBoardNotation = action.payload;
        },
        setShowInfoBar: (state, action) => {
            state.showInfoBar = action.payload;
        },
        setShowModal: (state, action) => {
            state.showModal = action.payload;
        },
        setShowSettings: (state, action) => {
            state.showSettings = action.payload;
        },
        setShowStatusPanel: (state, action) => {
            state.showStatusPanel = action.payload;
        },
        
    }
});

export const {
    setShowBoardNotation,
    setShowInfoBar,
    setShowModal,
    setShowSettings,
    setShowStatusPanel, 
} = settingsSlice.actions;

export default settingsSlice.reducer;