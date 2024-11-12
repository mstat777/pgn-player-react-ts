import { configureStore } from "@reduxjs/toolkit";
import gameReducer from './slices/game';
import pgnDataReducer from './slices/pgnData';
import chessboardReducer from './slices/chessboard';

export const store = configureStore({
    reducer: {
        game: gameReducer,
        pgnData: pgnDataReducer,
        chessboard: chessboardReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;