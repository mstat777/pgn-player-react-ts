import { store } from "../store/store";
import { setAreMovesLoaded, setStatusTxt} from "../store/slices/game";
import { setPieceData } from "../store/slices/chessSet";
import { MoveNbWithLocation, SetPiece } from "../configs/interfaces";
import { getLocationByRoundNb } from "./commonFunctions";
import { getDataForwardMove } from "./getDataForwardMove";
import { castling } from "./castling";

export const loadMoves = (movesLength: number) => {
   for (let moveNb = 0; moveNb < movesLength; moveNb++) {
      console.log("moveNb = ", moveNb);
      const state = store.getState();

      //const { whiteMoves, blackMoves } = state.pgnData;
      const pieces = state.chessSet.pieces;

      //console.log("whiteMoves.length = ", whiteMoves.length);
      //console.log("blackMoves.length = ", blackMoves.length);

      const roundNb = Math.floor(moveNb/2);
      const playerTurn = moveNb % 2 === 0 ? 'white' : 'black';
      const playerToWait = moveNb % 2 === 0 ? 'black' : 'white';
      console.log("roundNb = ", roundNb);
      console.log("playerTurn = ", playerTurn);
      console.log("playerToWait = ", playerToWait);
      //console.log(pieces);

      // get the piece and the new location to be moved to:
      let { idPiece, newLocation, capture, enPassant, promotion, castlingLong, castlingShort } = playerTurn === "white" ?
         getDataForwardMove(playerTurn, roundNb) :
         getDataForwardMove(playerTurn, roundNb);

      // if CASTLING
      if (castlingLong || castlingShort) {
         //console.log("castling");
         const { kingLocation, rookLocation } = castling(castlingShort, castlingLong, playerTurn, true);
         //console.log({ kingLocation, rookLocation });
         let rookId = castlingLong ? 0 : 7;

         // check if king's move location is added to the locations register (No need to check for the rook)
         const kingLocationsMoveNums: string[] = [];
         pieces[playerTurn][4].location.map((loc) => {
            //console.log(Object.keys(loc)[0]);
            kingLocationsMoveNums.push(Object.keys(loc)[0]);
         });

         // If king move location is not added, then add it
         if (!kingLocationsMoveNums.includes((roundNb+1).toString())){
            let kingMoveAndLocation: MoveNbWithLocation = {};
            kingMoveAndLocation[roundNb+1] = kingLocation;
            let rookMoveAndLocation: MoveNbWithLocation = {};
            rookMoveAndLocation[roundNb+1] = rookLocation;
            // change king's location
            store.dispatch(setPieceData({
               color: playerTurn, 
               id: 4, 
               location: [kingMoveAndLocation]
            }));
            // change rook's location
            store.dispatch(setPieceData({
               color: playerTurn, 
               id: rookId, 
               location: [rookMoveAndLocation]
            }));
         }
      }
      // else if an ordinary move
      else if (idPiece >= 0) {
         //console.log("idPiece = ", idPiece);
         // if CAPTURE, find & deactivate the captured piece in redux store:
         if (capture) {
            console.log("capture");
            if (!enPassant) {
               for (let i = 0; i < 16; i++) {
                  if (pieces[playerToWait][i].deactivated === 1000){
                     // get the current round location of the piece
                     const lastLocation = getLocationByRoundNb(pieces[playerToWait][i].location, roundNb+1);
                     //console.log("lastLocation = ",lastLocation);
                     // except for the EN PASSANT case, the captured piece is found on the newLocation
                     if (lastLocation === newLocation) {
                        //console.log("lastLocation = ", lastLocation);
                        //console.log("pieces[playerToWait][i].location = ", pieces[playerToWait][i].location);
                        //console.log("newLocation = ", newLocation);
                        //console.log(playerToWait, i, false);
                        store.dispatch(setPieceData({
                           color: playerToWait, 
                           id: i, 
                           location: [],
                           deactivated: roundNb+1
                        }));
                        break;
                     } 
                  }
               }
            } else { // EN PASSANT
               for (let i = 8; i < 16; i++) {
                  if (pieces[playerToWait][i].deactivated === 1000){
                     // get the current round location of the piece
                     const lastLocation = getLocationByRoundNb(pieces[playerToWait][i].location, roundNb+1);
                     //console.log("lastLocation = ",lastLocation);
                     // EN PASSANT case: the captured piece is found on the 4th or 5th rank
                     if (
                        lastLocation.charAt(0) === newLocation.charAt(0) && // on the same file
                        ((playerToWait === 'white' &&
                        lastLocation.charAt(1) === '4') ||
                        (playerToWait === 'black' &&
                        lastLocation.charAt(1) === '5'))
                     ) {
                        //console.log("lastLocation = ", lastLocation);
                        //console.log("pieces[playerToWait][i].location = ", pieces[playerToWait][i].location);
                        //console.log("newLocation = ", newLocation);
                        //console.log(playerToWait, i, false);
                        store.dispatch(setPieceData({
                           color: playerToWait, 
                           id: i, 
                           location: [],
                           deactivated: roundNb+1
                        }));
                        break;
                     } 
                  }
               }
            }
         }

         // check if the move location is added to the locations register
         const pieceLocationsMoveNums: string[] = [];
         pieces[playerTurn][idPiece].location.map((loc) => {
               //console.log(Object.keys(loc)[0]);
               pieceLocationsMoveNums.push(Object.keys(loc)[0]);
         });
         //console.log(pieces[playerTurn][idPiece].location);
         //console.log(pieceLocationsMoveNums);
         //console.log((currentRound+1).toString());
         // If the move location is not added, then add it
         if (!pieceLocationsMoveNums.includes((roundNb+1).toString())){
            let pieceMoveAndLocation: MoveNbWithLocation = {};
            pieceMoveAndLocation[roundNb+1] = newLocation;
            const data: SetPiece = {
               color: playerTurn, 
               id: idPiece, 
               location: [pieceMoveAndLocation]
            }
            if (promotion) {
               data.type = promotion;
            }
            store.dispatch(setPieceData(data));
         }
      } else { // idPiece === -1, it is 'undefined'
         store.dispatch(setStatusTxt("Error: idPiece is 'undefined'!"));
      }
   }
   //store.dispatch(setAllPiecesActive());
   store.dispatch(setAreMovesLoaded(true));
}