import { createSlice } from "@reduxjs/toolkit/react";

type settingsType = {
    showBoardNotation: boolean;
    showDB: boolean;
    showInfoBar: boolean;
    showModal: boolean;
    showSettings: boolean;
    showStatusPanel: boolean;
}

const initialState: settingsType = {
    showBoardNotation: true,
    showDB: true,
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
        setShowDB: (state, action) => {
            state.showDB = action.payload;
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
    setShowDB,
    setShowInfoBar,
    setShowModal,
    setShowSettings,
    setShowStatusPanel, 
} = settingsSlice.actions;

export default settingsSlice.reducer;