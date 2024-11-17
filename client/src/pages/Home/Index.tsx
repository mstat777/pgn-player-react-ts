import './Home.scss';
import ChessSet from '../../components/ChessSet/Index';
import Notation from '../../components/Notation/Index';
import { useEffect, useState, useRef } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { initializeSquares, initializePieces } from '../../store/slices/chessSet';
import StatusPanel from '../../components/StatusPanel/Index';
import InfoBar from '../../components/InfoBar/Index';

export default function Home(){
    const dispatch = useAppDispatch();
    
    const pieceRef = useRef<Array<HTMLDivElement | null>>([]);

    const [statusTxt, setStatusTxt] = useState<string>('');

    useEffect(() => {
        dispatch(initializeSquares());
        dispatch(initializePieces());
    },[]);

    return ( 
        <main className="home">
            <section className="home_section">

                <div className="infobar_chessset_ctn">
                    <InfoBar />

                    <ChessSet ref={pieceRef}/>
                </div> 

                <div className="notation_status_ctn">
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