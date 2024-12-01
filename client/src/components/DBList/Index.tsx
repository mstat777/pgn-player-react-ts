import './DBList.scss';
import db from '../../assets/resources/db.json';
import DBListItem from './DBListItem/Index';

export default function DBList() {
   const famousGames: string[] = Object.values(db)[0]['famous-games'];
   const famousPlayers = Object.entries(Object.values(db)[0]['famous-players']);
   console.log(famousGames);
   console.log(famousPlayers);

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
         </ul>
      </section>
   )
}