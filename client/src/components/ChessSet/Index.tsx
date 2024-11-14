import './ChessSet.scss';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { initializePieces } from '../../utils/initializePieces';
import ChessPiece from './ChessPiece/Index';
import { Color } from '../../configs/types';

export default function ChessSet(){
    const { squares, pieces } = useAppSelector((state) => state.chessSet);
/*
    const initialPosition: string[] = [ 
        'rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook',
        'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn',
        'rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'
    ];*/

    // calculate piece coordinates from piece's location data:
    const getX = (pieceLocation: number) => (Math.floor(pieceLocation / 10) - 1) *100 / 8;
    const getY = (pieceLocation: number) => ((pieceLocation % 10) - 1) *100 / 8;

    return ( 
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