import './Home.scss';
import ChessSet from '../../components/ChessSet/Index';
import Notation from '../../components/Notation/Index';
import { useEffect, useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { initializeSquares, initializePieces } from '../../store/slices/chessSet';
import Modal from '../../components/Modal/Index';
import StatusPanel from '../../components/StatusPanel/Index';
import InfoBar from '../../components/InfoBar/Index';

export default function Home(){
    const dispatch = useAppDispatch();
    const { 
        showInfoBar,
        showModal, 
        showStatusPanel
     } = useAppSelector((state) => state.settings);
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

                <Notation 
                    ref={pieceRef}
                    setStatusTxt={setStatusTxt}
                />

                <div className="infobar_status_ctn">
                    { showInfoBar && 
                        <InfoBar /> }

                    { showStatusPanel && 
                        <StatusPanel 
                            statusTxt={statusTxt}
                            setStatusTxt={setStatusTxt}
                        />
                    }
                </div>
            </section>

            { showModal && 
                <Modal />
            }
        </main>
    );
}