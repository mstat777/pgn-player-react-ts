import './Home.scss';
import ChessSet from '../../components/ChessSet/Index';
import Notation from '../../components/Notation/Index';
import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { initializeSquares, initializePieces } from '../../store/slices/chessSet';
import StatusPanel from '../../components/StatusPanel/Index';

export default function Home(){
    const dispatch = useAppDispatch();
    //const { moveNb } = useAppSelector((state) => state.pgnData);
    
    const pieceRef = useRef<Array<HTMLDivElement | null>>([]);

    const [statusTxt, setStatusTxt] = useState<string>('');

    useEffect(() => {
        dispatch(initializeSquares());
        dispatch(initializePieces());
    },[]);

    return ( 
        <main className="home">
            <section className="home_section">
                <ChessSet ref={pieceRef}/>
                
                <div>
                    <Notation 
                        ref={pieceRef}
                        setStatusTxt={setStatusTxt}
                    />

                    <StatusPanel 
                        statusTxt={statusTxt}
                        setStatusTxt={setStatusTxt}
                    />
                </div>

            </section>
        </main>
    );
}