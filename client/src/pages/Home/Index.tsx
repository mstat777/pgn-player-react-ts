import './Home.scss';
import ChessSet from '../../components/ChessSet/Index';
import Notation from '../../components/Notation/Index';
import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { initializeSquares, initializePieces } from '../../store/slices/chessSet';
import Loading from '../../components/Loading/Index';
import StatusPanel from '../../components/StatusPanel/Index';

export default function Home(){
    const dispatch = useAppDispatch();
    //const { squares, pieces } = useAppSelector((state) => state.chessSet);

    const pieceRef = useRef<Array<HTMLDivElement | null>>([]);

    useEffect(() => {
        dispatch(initializeSquares());
        dispatch(initializePieces());
    },[]);

    return ( 
        <main className="home">
            { 
                <section className="home_section">
                    <ChessSet ref={pieceRef}/>
                    
                    <div>
                        <Notation ref={pieceRef}/>
                        <StatusPanel />
                    </div>
                </section>
            }
        </main>
    );
}