import { createSlice } from "@reduxjs/toolkit/react";

type settingsType = {
   flipBoard: boolean;
   showBoardNotation: boolean;
   showDB: boolean;
   showInfoBar: boolean;
   showModal: boolean;
   showPlayerInfoBar: boolean;
   showSettings: boolean;
   showStatusPanel: boolean;
}

const initialState: settingsType = {
   flipBoard: false,
   showBoardNotation: true,
   showDB: true,
   showInfoBar: true,
   showModal: false,
   showPlayerInfoBar: false,
   showSettings: false,
   showStatusPanel: true,
}

export const settingsSlice = createSlice({
   name: "settings",
   initialState,
   reducers: {
      setFlipBoard: (state, action) => {
         state.flipBoard = action.payload;
      },
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
      setShowPlayerInfoBar: (state, action) => {
         state.showPlayerInfoBar = action.payload;
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
   setFlipBoard,
   setShowBoardNotation,
   setShowDB,
   setShowInfoBar,
   setShowModal,
   setShowPlayerInfoBar,
   setShowSettings,
   setShowStatusPanel, 
} = settingsSlice.actions;

export default settingsSlice.reducer;