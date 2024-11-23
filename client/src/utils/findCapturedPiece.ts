import { IChessPiece } from "../configs/interfaces"
import { getPieceLocationByRoundNb } from "./commonFunctions";

// return the array's index number of the piece to be removed/restored
export const findCapturedPiece = (location: string, array: IChessPiece[], roundNb: number): number => {
    let index: number = -1;
    console.log("location = ",location);
    array.forEach((piece, i) => {
        const lastLocation = getPieceLocationByRoundNb(piece.location, roundNb+1);
        console.log("lastLocation = ",lastLocation);
        if (lastLocation === location) {
            index = i;
            console.log("found!!!");
        }
    });
    if (array[0].color === "black") {
        index += 16;
    }
    console.log("index = ",index);
    return index;
}