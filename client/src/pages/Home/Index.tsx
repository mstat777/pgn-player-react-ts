import './Home.scss';
import { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { initializeSquares, initializePieces } from '../../store/slices/chessSet';
import Modal from '../../components/Modal/Index';
import ChessSet from '../../components/ChessSet/Index';
import Notation from '../../components/Notation/Index';
import StatusPanel from '../../components/StatusPanel/Index';
import InfoBar from '../../components/InfoBar/Index';
import SettingsList from '../../components/SettingsList/Index';
import DBList from '../../components/DBList/Index';
import NavigationPanel from '../../components/NavigationPanel/Index';

export default function Home(){
   const dispatch = useAppDispatch();
   const { 
      showDB,
      showInfoBar,
      showModal, 
      showStatusPanel
   } = useAppSelector((state) => state.settings);
   const pieceRef = useRef<Array<HTMLDivElement | null>>([]);

   useEffect(() => {
      dispatch(initializeSquares());
      dispatch(initializePieces());
   },[]);

   return ( 
      <main className="home">
         <section className="home_section">
            <ChessSet ref={pieceRef} />

            <Notation ref={pieceRef} />

            <section className="right_section">
               { showInfoBar && 
                  <InfoBar /> }

               <NavigationPanel ref={pieceRef} />

               { showStatusPanel && 
                  <StatusPanel />
               }
            </section>
         </section>

         { showModal &&      
            <Modal 
               children={showDB ? <DBList /> : <SettingsList />}
            /> 
         }
      </main>
   );
}