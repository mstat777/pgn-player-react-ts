import './DBList.scss';
import db from '../../assets/resources/db.json';
import DBListItem from './DBListItem/Index';

export default function DBList() {
   const famousGames: string[] = Object.values(db)[0]['famous-games'];
   const famousPlayers = Object.entries(Object.values(db)[0]['famous-players']);
   const openingsWhite = Object.entries(Object.values(db)[0]['openings-white']);
   const openingsBlack = Object.entries(Object.values(db)[0]['openings-black']);

   return (
      <section className="db">
         <h2>database</h2>

         <ul className="list">
            <li>
               <DBListItem 
                  name="Famous Games"
                  itemsArr={famousGames} 
               />
            </li>

            <li>
               <DBListItem 
                  name="Famous Players"
                  itemsArr={famousPlayers} 
               />
            </li>

            <li>
               <DBListItem 
                  name="Openings White"
                  itemsArr={openingsWhite} 
               />
            </li>

            <li>
               <DBListItem 
                  name="Openings Black"
                  itemsArr={openingsBlack} 
               />
            </li>
         </ul>
      </section>
   )
}