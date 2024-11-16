import { Color } from "../configs/types";

export const changePlayer = (turn: Color): Color => {
    return turn === 'white' ?  'black' : 'white';
}

// calculate piece coordinates from piece's location data:
export const getX = (pieceLocation: string) => {
    const location: number = parseInt(pieceLocation);
    return (Math.floor(location / 10) - 1) *100 / 8;
}

export const getY = (pieceLocation: string) => {
    const location: number = parseInt(pieceLocation);
    return ((location % 10) - 1) *100 / 8;
}