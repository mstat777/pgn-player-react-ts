import './ChessSet.scss';
import { useEffect, useState, forwardRef, MutableRefObject } from 'react';
import { useAppSelector } from '../../store/hooks';
import ChessPiece from './ChessPiece/Index';
import { Color } from '../../configs/types';
import Loading from '../Loading/Index';
import { getX, getY } from '../../utils/commonFunctions';

//type ForwardedRef = MutableRefObject<(HTMLDivElement | null)[]>;

const ChessSet = forwardRef((props, ref) => {
    const { squares, pieces } = useAppSelector((state) => state.chessSet);
    const { moveNb } = useAppSelector((state) => state.pgnData);

    //console.log(moveNb.length);
    const piecesLength = pieces.white.length + pieces.black.length;

    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

    const pieceRef = ref as MutableRefObject<(HTMLDivElement | null)[]>;

    useEffect(() => {
        if (squares.length && piecesLength ) {
            setIsDataLoaded(true);
        }
    },[squares.length, piecesLength]);

    return ( 
        !isDataLoaded ? 
            <Loading /> :

        <div className="chess_set">
            <div className="chessboard">
                {squares?.map((square, i) => 
                    <div 
                        className={`square ${square.color}`}
                        key={i}
                    >
                    </div>
                )}
            </div>

            <div className="pieces">
                { Object.keys(pieces).map((side, indexSide) => 
                        pieces[side as keyof typeof pieces].map((piece, i) =>
                            piece.location &&
                            <ChessPiece 
                                ref={(el) => //{
                                    pieceRef.current[i + (indexSide*16)] = el
                                    //console.log(el); }
                                }
                                color={side as Color}
                                type={piece.type} 
                                left={`${getX(piece.location[0][0])}%`}
                                bottom={`${getY(piece.location[0][0])}%`}
                                key={i}
                            />
                        )
                    )
                }
            </div>
        </div>
    );
});

export default ChessSet;