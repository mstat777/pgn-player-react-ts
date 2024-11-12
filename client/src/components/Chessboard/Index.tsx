import './Chessboard.scss';
import { useAppSelector, useAppDispatch } from '../../store/hooks';

export default function Chessboard(){
    const squares = useAppSelector((state) => state.chessboard.squares);

    return ( 
        <div className="chessboard">
            {squares?.map((square, i) => 
                <div 
                    className={`square ${square.color}`}
                    key={i}
                >
                </div>
            )}
        </div>
    );
}