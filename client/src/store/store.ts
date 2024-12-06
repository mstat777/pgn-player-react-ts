import { PayloadAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import pgnDataReducer from './slices/pgnData';
import chessSetReducer from './slices/chessSet';
import settingsReducer from './slices/settings';

const appReducer = combineReducers({
   pgnData: pgnDataReducer,
   chessSet: chessSetReducer,
   settings: settingsReducer
});

const rootReducer = (state: any, action: PayloadAction) => {
   if (action.type === 'RESET_PGN') {
      //console.log("RESET_PGN called!");
      // exclude 'game' & 'chessSet' from being reset
      const { chessSet, settings } = state;
      state = { chessSet, settings };
      //console.log(state);
   } else if (action.type === 'RESET_GAME') {
      //console.log("RESET_GAME called!");
      state = {};
   }
   return appReducer(state, action);
}

export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({
         // allow non-serializable data to be stored (ChessPiece class instances)
         serializableCheck: {
            ignoredPaths: ['chessSet.pieces', 'pgnData.tags'],
            //ignoredActions: ['pgnData/setPgnData'],
            ignoredActionPaths: ['payload.tags']
         }
      })
});

export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
//export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;