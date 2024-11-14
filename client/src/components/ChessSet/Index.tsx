import './ChessSet.scss';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import ChessPiece from './ChessPiece/Index';
import { Color } from '../../configs/types';
import Loading from '../Loading/Index';

export default function ChessSet(){
    const { squares, pieces } = useAppSelector((state) => state.chessSet);

    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (squares.length && pieces.white.length && pieces.black.length) {
            setIsDataLoaded(true);
        }
    },[squares.length, pieces.white.length, pieces.black.length]);

    // calculate piece coordinates from piece's location data:
    const getX = (pieceLocation: number) => (Math.floor(pieceLocation / 10) - 1) *100 / 8;
    const getY = (pieceLocation: number) => ((pieceLocation % 10) - 1) *100 / 8;

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
                { Object.keys(pieces).map((side) => 
                        pieces[side as keyof typeof pieces].map((piece, i) =>
                            <ChessPiece 
                                color={side as Color}
                                type={piece.type} 
                                left={`${getX(piece.location)}%`}
                                top={`${getY(piece.location)}%`}
                                key={i}
                            />
                        )
                    )
                }
            </div>
        </div>
    );
}