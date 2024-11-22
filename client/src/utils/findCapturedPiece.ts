import { IChessPiece } from "../configs/interfaces"
import { getPieceLastLocation } from "./commonFunctions";

// return the array's index number of the piece to be removed/restored
export const findCapturedPiece = (location: string, array: IChessPiece[]): number => {
    let index: number = -1;
    array.forEach((piece, i) => {
        const lastLocation = getPieceLastLocation(piece.location);
        if (lastLocation === location) {
            index = i;
        }
    });
    if (array[0].color === "black") {
        index += 16;
    }
    return index;
}