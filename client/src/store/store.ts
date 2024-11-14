import { PayloadAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import gameReducer from './slices/game';
import pgnDataReducer from './slices/pgnData';
import chessSetReducer from './slices/chessSet';

const appReducer = combineReducers({
    game: gameReducer,
    pgnData: pgnDataReducer,
    chessSet: chessSetReducer
});

const rootReducer = (state: any, action: PayloadAction) => {
    if (action.type === 'RESET_PGN') {
        // exclude 'game' & 'chessSet' from being reset
        const { game, chessSet } = state;
        state = { game, chessSet };
    }
    return appReducer(state, action);
}

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            // allow non-serializable data to be stored (ChessPiece class instances)
            serializableCheck: {
                ignoredPaths: ['chessSet.pieces'],
            }
        })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
//export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;