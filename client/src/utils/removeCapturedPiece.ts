import { IChessPiece } from "../configs/interfaces"

// return the array's index number of the piece to be removed from the board
export const removeCapturedPiece = (location: string, array: IChessPiece[]): number => {
    let index: number = -1;
    array.forEach((piece, i) => {
        //console.log("removeCapturedPiece.location = ",piece.location);
        //console.log("location = ",location);
        if (piece.active === true)
        if (piece.location === location && piece.active === true) {
            index = i;
        }
    });
    if (array[0].color === "black") {
        index += 16;
    }
    return index;
}