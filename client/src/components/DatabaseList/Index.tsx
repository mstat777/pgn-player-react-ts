import './DatabaseList.scss';
import { useState } from 'react';
import db from '../../assets/resources/db.json';
import { useAppDispatch } from '../../store/hooks';
import { setShowModal } from '../../store/slices/settings';
import { setPgnTxt } from '../../store/slices/pgnData';

export default function DatabaseList() {
   const dispatch = useAppDispatch();

   const [showGames, setShowGames] = useState<boolean>(false);
   const [showPlayers, setShowPlayers] = useState<boolean>(false);
   const [showPlayerGames, setShowPlayerGames] = useState<boolean>(false);

   const famousGames: string[] = Object.values(db)[0]['famous-games'];
   const famousPlayers = Object.entries(Object.values(db)[0]['famous-players']);
   console.log(famousPlayers);

   const initialize = () => {
      setShowGames(false);
      setShowPlayers(false);
      setShowPlayerGames(false);
   }

   const getPgnFileData = async (fileName: string) => {
      const data = await (await fetch(`db/famous-games/${fileName}.pgn`)).text();
      //console.log(data);
      dispatch(setPgnTxt(data));
   }

   return (
      <section className="db">
         <h2>database</h2>

         <ul className="list">
            <li>
               <button
                  onClick={() => setShowGames(!showGames)}
               >
                  Famous Games
               </button>

               { showGames && 
                  <ul className="sublist">
                     {famousGames.map((game, i) => 
                        <li key={i}>
                           <button
                              onClick={() => {
                                 initialize();
                                 dispatch(setShowModal(false));
                                 getPgnFileData(game);
                              }}
                           >
                              {game}
                           </button>
                        </li>
                     )}
                  </ul>
               }
            </li>

            <li>
               <button
                  onClick={() => setShowPlayers(!showPlayers)}
               >
                  Famous Players
               </button>

               { showPlayers && 
                  <ul className="sublist">
                     {famousPlayers.map((player, i) => 
                        <li key={i}>
                           <button
                              onClick={() => setShowPlayerGames(!showPlayerGames)}
                           >
                              {player[0]}
                           </button>

                           { showPlayerGames && 
                              <ul className="sublist">
                                 <li>
                                    <button
              
                                    >
                                       {Object.keys(player[1])[0]}
                                    </button>

                                    <ul className="subsublist">
                                       {Object.values(player[1])[0].map((game, i) => 
                                          <li key={i}>
                                             <button
                                                onClick={() => setShowPlayerGames(!showPlayerGames)}
                                             >
                                                {game}
                                             </button>
                                          </li>
                                       )}
                                    </ul>
                                 </li>
                                 
                              </ul>
                           }
                        </li>
                     )}
                  </ul>
               }
            </li>
         </ul>
      </section>
   )
}