import './Notation.scss';
import { useState, Dispatch, SetStateAction, forwardRef, MutableRefObject, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardFast, faCaretLeft, faCaretRight, faForwardFast } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { initializePieces, initializeSquares, setPieceData } from '../../store/slices/chessSet';
import { Color } from '../../configs/types';
import { MoveNbWithLocation } from '../../configs/interfaces';
import { getDataForwardMove } from '../../utils/getDataForwardMove';
import { getDataBackwardMove } from '../../utils/getDataBackwardMove';
import { formatPgnData, validatePgnData } from '../../utils/pgnDataFunctions';
import { changePlayer, getX, getY, getLocationByRoundNb } from '../../utils/commonFunctions';
import { findCapturedPiece } from '../../utils/findCapturedPiece';
import { castling } from '../../utils/castling';

type Props = {
    setStatusTxt: Dispatch<SetStateAction<string>>;
}

const Notation = forwardRef(({setStatusTxt}: Props, ref) => {
    const dispatch = useAppDispatch();

    const { whiteMoves, blackMoves } = useAppSelector((state) => state.pgnData);

    const pieces = useAppSelector((state) => state.chessSet.pieces);
    const pieceRef = ref as MutableRefObject<(HTMLDivElement | null)[]>;
    console.log(pieces);
    const pgnErrors = useAppSelector((state) => state.pgnData.errors);

    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    //const [piecesLeft, setPiecesLeft] = useState<number>(32); // pieces left of both players
    const [currentMove, setCurrentMove] = useState<number>(-1);
    //const [currentRound, setCurrentRound] = useState<number>(0);
    const [playerTurn, setPlayerTurn] = useState<Color>("white");
    const [playerToWait, setPlayerToWait] = useState<Color>("black");
    //const [isValidMove, setIsValidMove] = useState<boolean>(true);
    //const [errors, setErrors] = useState<string[]>([]);
    const [isArrowLeftDown, setIsArrowLeftDown] = useState<boolean>(false);
    const [isArrowRightDown, setIsArrowRightDown] = useState<boolean>(false);

    const [pgnTxt, setPgnTxt] = useState<string>('');
    const pgnTxtMaxLength = 2500;

    const [isPlayingForward, setIsPlayingForward] = useState<boolean>(true);

    // play the move if Move number changed
    useEffect(() => {
        console.log("currentMove = ", currentMove);
        if (currentMove >= 0) {
            isPlayingForward ? moveForward() : moveBackward();
        }
    },[currentMove, isPlayingForward]);

    addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === "ArrowLeft" && !isArrowLeftDown) {
            e.stopPropagation();
            handlePreviousMove();
            setIsArrowLeftDown(true);
        }
        if (e.key === "ArrowRight" && !isArrowRightDown) {
            e.stopPropagation();
            handleNextMove();
            setIsArrowRightDown(true);
        }
    });
    addEventListener('keyup', (e: KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
            setIsArrowLeftDown(false);
        }
        if (e.key === "ArrowRight") {
            setIsArrowRightDown(false);
        }
    });

    const initialize = () => {
        console.clear();
        setCurrentMove(-1);
        setIsPlayingForward(true);
        setPlayerTurn("white");
        setPlayerToWait("black");
        dispatch({type: 'RESET_GAME'}); // reset Redux pgnData slice
        dispatch(initializeSquares());
        dispatch(initializePieces());
    }

    const handleClear = () => {
        if (pgnTxt) {
            initialize();
            setPgnTxt(''); // clear input data
            setStatusTxt("PGN data cleared.")
            // reset to initial piece's IMAGE positions
            Object.keys(pieces).map((side, indexSide) => 
                pieces[side as keyof typeof pieces].map((piece, i) => {
                    let ref = pieceRef.current[i + (indexSide*16)];
                    if (ref && piece.location) {
                        ref.style.left = `${getX(piece.location[0][0])}%`;
                        ref.style.bottom = `${getY(piece.location[0][0])}%`;
                        ref.style.opacity = '1';
                    }
                })
            )
        }
    }

    const handleLoad = () => {
        if (pgnTxt) {
            initialize();
            validatePgnData(formatPgnData(pgnTxt));
        } else {
            setStatusTxt('Nothing is entered!');
            console.log('Nothing is entered!');
        }
    }

    const handleNextMove = () => {
        console.log(pgnErrors);
        console.log("isGameOver = ",isGameOver);
        console.log(whiteMoves.length);
        console.log("isPlayingForward = ", isPlayingForward);
        console.log("currentMove = ", currentMove);
        if (!whiteMoves.length) {
            setStatusTxt("Please press the 'LOAD' button.");
            return;
        } else if (!pgnErrors.length && !isGameOver) {
            console.log("isPlayingForward = ", isPlayingForward);
            console.log("currentMove = ", currentMove);
            if (isPlayingForward) {
                if (currentMove >= 0) {
                    setPlayerTurn(changePlayer(playerTurn));
                    console.log("playerTurn = ", playerTurn);
                    setPlayerToWait(changePlayer(playerToWait));
                    //console.log("playerToWait = ", playerToWait);
                }
                setCurrentMove(currentMove +1); 
            } else {
                //currentMove < 0 && setCurrentMove(currentMove +1); 
                setIsPlayingForward(true);
            }
        }
    }

    const handlePreviousMove = () => {
        //console.log(pgnErrors);
        console.log("currentMove = ",currentMove);
        if (!whiteMoves.length) {
            setStatusTxt("Please press the 'LOAD' button.");
            return;
        } else if (!pgnErrors.length && currentMove >= 0) {
            console.log("isPlayingForward = ", isPlayingForward);
            console.log("currentMove = ",currentMove);
            if (!isPlayingForward) {
                if (currentMove > 0) {
                    setPlayerTurn(changePlayer(playerTurn));
                    console.log("playerTurn = ", playerTurn);
                    setPlayerToWait(changePlayer(playerToWait));
                    //console.log("playerToWait = ", playerToWait);
                    setCurrentMove(currentMove -1); 
                }
            } else {
                setIsPlayingForward(false);
            }
        }
    }

    const moveForward = () => {
        console.clear();
        //console.log(pieces);
        console.log("moveForward");
        console.log("round = " + Math.floor(currentMove/2) + " move = " + currentMove);

        let currentRound = Math.floor(currentMove/2);

        // check for GAME OVER
        if (currentMove >= 0 &&
            (playerTurn === "white" && 
            !whiteMoves[currentRound]) || 
            (playerTurn === "black" && 
            !blackMoves[currentRound]))
        {
            setStatusTxt("Game is over.");
            setIsGameOver(true);
            return;
        }

        // get the piece and the new location to be moved to:
        let { idPiece, newLocation, capture, castlingLong, castlingShort } = playerTurn === "white" ?
            getDataForwardMove(whiteMoves[currentRound], playerTurn, currentRound) :
            getDataForwardMove(blackMoves[currentRound], playerTurn, currentRound);
        
        // if CASTLING
        if (castlingLong || castlingShort) {
            console.log("castling");
            const { kingLocation, rookLocation } = castling(castlingShort, castlingLong, playerTurn, isPlayingForward);
            console.log({ kingLocation, rookLocation });
            let rookId = castlingLong ? 0 : 7;

            // check if king's move location is added to the locations register
            // no need to check for the rook
            const kingLocationsMoveNums: string[] = [];
            pieces[playerTurn][4].location.map((loc) => {
                //console.log(Object.keys(loc)[0]);
                kingLocationsMoveNums.push(Object.keys(loc)[0]);
            });

            // If king move location is not added, then add it
            if (!kingLocationsMoveNums.includes((currentRound+1).toString())){
                let kingMoveAndLocation: MoveNbWithLocation = {};
                kingMoveAndLocation[currentRound+1] = kingLocation;
                let rookMoveAndLocation: MoveNbWithLocation = {};
                rookMoveAndLocation[currentRound+1] = rookLocation;
                // change king's location
                dispatch(setPieceData({
                    side: playerTurn, 
                    id: 4, 
                    location: [kingMoveAndLocation],
                    active: true
                }));
                // change rook's location
                dispatch(setPieceData({
                    side: playerTurn, 
                    id: rookId, 
                    location: [rookMoveAndLocation],
                    active: true
                }));
            }

            // move the king's & rook's images
            let idKingImage = 4;
            let idRookImage = castlingLong ? 0 : 7;
            if (playerTurn === "black") {
                idKingImage += 16;
                idRookImage += 16;
            }
            const kingImageRef = pieceRef.current[idKingImage];
            const rookImageRef = pieceRef.current[idRookImage];
            if (kingImageRef && rookImageRef) {
                kingImageRef.style.left = `${getX(kingLocation)}%`;
                kingImageRef.style.bottom = `${getY(kingLocation)}%`;
                rookImageRef.style.left = `${getX(rookLocation)}%`;
                rookImageRef.style.bottom = `${getY(rookLocation)}%`;
            } 
            else {
                console.log("Error with king's & rook's images!");
            }
        }
        // if NOT castling
        else if (idPiece >= 0) {
            console.log("idPiece = ", idPiece);
            // if CAPTURE, find & reactivate the captured piece in redux store:
            if (capture) {
                console.log("capture");
                for (let i = 0; i < 16; i++) {
                    // get the current round location of the piece
                    const lastLocation = getLocationByRoundNb(pieces[playerToWait][i].location, currentRound+1);
                    console.log("lastLocation = ",lastLocation);
                    // captured piece is found on the newLocation
                    if (lastLocation === newLocation) {
                        console.log("lastLocation = ", lastLocation);
                        //console.log("pieces[playerToWait][i].location = ", pieces[playerToWait][i].location);
                        //console.log("newLocation = ", newLocation);
                        console.log(playerToWait, i, false);
                        dispatch(setPieceData({
                            side: playerToWait, 
                            id: i, 
                            location: [],
                            active: false
                        }));
                        break;
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
            if (!pieceLocationsMoveNums.includes((currentRound+1).toString())){
                let pieceMoveAndLocation: MoveNbWithLocation = {};
                pieceMoveAndLocation[currentRound+1] = newLocation;
                dispatch(setPieceData({
                    side: playerTurn, 
                    id: idPiece, 
                    location: [pieceMoveAndLocation],
                    active: true
                }));
            }

            // move the piece's image
            let idImage = idPiece;
            if (playerTurn === "black") {
                idImage += 16;
            }
            const pieceImageRef = pieceRef.current[idImage];
            if (pieceImageRef) {
                pieceImageRef.style.left = `${getX(newLocation)}%`;
                pieceImageRef.style.bottom = `${getY(newLocation)}%`;
            }
        } else { // idPiece === -1, it is 'undefined'
            setStatusTxt("Error: idPiece is 'undefined'!");
        }
    }

    const moveBackward = () => {
        console.clear();
        console.log("moveBackward");
        console.log("round = " + Math.floor(currentMove/2) + " move = " + currentMove);
        // check if the GAME BEGINNING reached
        if (currentMove < 0) {
            setStatusTxt("The very beginning reached.");
            return;
        }

        let currentRound = Math.floor(currentMove/2);
        console.log("playerTurn = ", playerTurn);
        // get the piece and the new location to be moved to:
        let { idPiece, currentLocation, newLocation, capture, castlingLong, castlingShort } = playerTurn === "white" ?
            getDataBackwardMove(whiteMoves[currentRound], playerTurn, currentRound) :
            getDataBackwardMove(blackMoves[currentRound], playerTurn, currentRound);
        
        // if CASTLING
        if (castlingLong || castlingShort) {
            console.log("castling");
            const { kingLocation, rookLocation } = castling(castlingShort, castlingLong, playerTurn, isPlayingForward);

            console.log({ kingLocation, rookLocation });
            let kingMoveAndLocation: MoveNbWithLocation = {};
            kingMoveAndLocation[currentRound] = kingLocation;
            let rookMoveAndLocation: MoveNbWithLocation = {};
            rookMoveAndLocation[currentRound] = rookLocation;
            
            // move the king's & rook's images
            let idKingImage = 4;
            let idRookImage = castlingLong ? 0 : 7;
            if (playerTurn === "black") {
                idKingImage += 16;
                idRookImage += 16;
            }
            const kingImageRef = pieceRef.current[idKingImage];
            const rookImageRef = pieceRef.current[idRookImage];
            if (kingImageRef && rookImageRef) {
                kingImageRef.style.left = `${getX(kingLocation)}%`;
                kingImageRef.style.bottom = `${getY(kingLocation)}%`;
                rookImageRef.style.left = `${getX(rookLocation)}%`;
                rookImageRef.style.bottom = `${getY(rookLocation)}%`;
            } 
            else {
                console.log("Error with king's & rook's images!");
            }
        }
        // if NOT castling
        else if (idPiece >= 0) {
            console.log("idPiece = ", idPiece);
            // if CAPTURE, find & desactivate the captured piece in redux store:
            if (capture) {
                for (let i = 0; i < 16; i++) {
                    // captured piece is found on the newLocation
                    let lastLocation = getLocationByRoundNb(pieces[playerToWait][i].location, currentRound+1);
                    //console.log(lastLocation);
                    //console.log(currentLocation);
                    if (lastLocation === currentLocation) {
                        //console.log("playerToWait = ",playerToWait);
                        //console.log("i = ",i);
                        // reactivate the captured piece
                        dispatch(setPieceData({
                            side: playerToWait, 
                            id: i, 
                            location: [],
                            active: true
                        }));
                        break;
                    } 
                }

                // make REAPPEAR captured piece's image 
                let idImage = idPiece;
                if (playerToWait === "black") {
                    idImage += 16;
                }
                console.log("removedSide = ",playerToWait);
                const removeFromArray = [...pieces[`${playerToWait}`]];
                const removedIndex: number = findCapturedPiece(currentLocation, removeFromArray, currentRound);
                console.log("removedIndex = ",removedIndex);
                console.log(pieceRef.current[removedIndex]);
            }
            // move the piece's image
            let idImage = idPiece;
            if (playerTurn === "black") {
                idImage += 16;
            }
            const pieceImageRef = pieceRef.current[idImage];
            if (pieceImageRef) {
                pieceImageRef.style.left = `${getX(newLocation)}%`;
                pieceImageRef.style.bottom = `${getY(newLocation)}%`;
            }
        } else { // idPiece is 'undefined'
            setStatusTxt("Error: idPiece is 'undefined'!");
        }
    }

    return ( 
        (pieces.white.length && pieces.black.length) &&
        <section className="notation_section">

            <div className="command_panel">
                <div className="functions_btn">
                    <button 
                        id="loadBtn"
                        onClick={handleLoad}
                    >load</button>

                    <button 
                        id="clearBtn"
                        onClick={handleClear}
                    >clear</button>
                </div>

                <div className="nav_btn">
                    <button id="toStartBtn">
                        <FontAwesomeIcon icon={faBackwardFast}/>
                    </button>

                    <button 
                        id="previousMoveBtn"
                        onClick={handlePreviousMove}
                    >
                        <FontAwesomeIcon icon={faCaretLeft}/>
                    </button>

                    <button 
                        id="nextMoveBtn"
                        onClick={handleNextMove}
                    >
                        <FontAwesomeIcon icon={faCaretRight}/>
                    </button>

                    <button id="toEndBtn">
                        <FontAwesomeIcon icon={faForwardFast}/>
                    </button>
                </div>
            </div>

            <div className="notation">
                <textarea
                    value={pgnTxt}
                    onChange={(e) => setPgnTxt(e.target.value)}
                    placeholder="put your PGN data here..."
                    rows={4}
                    maxLength={pgnTxtMaxLength}
                ></textarea>
            </div>
        </section>
    );
});

export default Notation;