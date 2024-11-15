import { Color } from "../configs/types";

export const setPlayerTurn = (turn: Color): Color => {
    return turn === 'white' ?  'black' : 'white';
}