import { Color } from "../configs/types";
import { IChessPiece, MoveNbWithLocation } from "../configs/interfaces";

export const capitalize = (str: string) => {
    let result = str.charAt(0).toUpperCase() + str.slice(1);
    return result;
}

export const changePlayer = (turn: Color): Color => {
    let result: Color = turn === 'white' ?  'black' : 'white';
    return result;
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

// convert chess board square notation to numeric value
// replaces letters (a, b, c...) by numbers (1, 2, 3...) in 'a3', 'b6', etc...
// will be used for the square locations
export const chessNotationToNumeric = (chessNotation: string): string => {
    return (chessNotation.charCodeAt(0) - 96) + chessNotation.charAt(1);
}

// find the last location from a specific move number 
export const getLocationByRoundNb = (locationArray: MoveNbWithLocation[], roundNb: number): string => {
    let resultIndex: number = -1;
    const rounds: number[] = [];
    locationArray.map(loc => {
        //console.log(parseInt(Object.keys(loc)[0]));
        rounds.push(parseInt(Object.keys(loc)[0]));
    });
    //console.log(rounds);
    for (let i = rounds.length-1; i >= 0; i--){
        //console.log("rounds[i] = ",rounds[i]);
        //console.log("roundNb = ",roundNb);
        if (rounds[i] <= roundNb) {
            resultIndex = i;
            break;
        }
    }
    //console.log("resultIndex = ", resultIndex);
    if (resultIndex === undefined) {
        throw new Error("Error: getLocationByRoundNb!")
    }
    //console.log("result = ", Object.values(locationArray[resultIndex])[0]);
    return (Object.values(locationArray[resultIndex])[0]);
    /*return ({
        roundNb: 
        location: Object.values(locationArray[resultIndex])[0]
    });*/
}

// find a capturing pawn's index
export const getCapturingPawnId = (file: string, targetLocation: string, playerTurn: Color, roundNb: number, piecesData: IChessPiece[]): number => {
    let resultId: number = -1;
    let rank: number = playerTurn === 'white' ? 
        parseInt(targetLocation.charAt(1))-1 :
        parseInt(targetLocation.charAt(1))+1
    let pawnLocation: string = file + rank.toString();
    console.log("pawnLocation = ",pawnLocation);

    for (let i = 8; i < piecesData.length; i++){
        console.log(getLocationByRoundNb(piecesData[i].location, roundNb));
        console.log(chessNotationToNumeric(pawnLocation));
        if (getLocationByRoundNb(piecesData[i].location, roundNb) === chessNotationToNumeric(pawnLocation)) {
            resultId = i;
            console.log("found!");
            console.log("resultId = ",resultId);
            break;
        }
    };

    return resultId;
}