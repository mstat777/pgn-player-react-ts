import './Main.scss';
import Chessboard from '../../components/Chessboard/Index';
import CommandPanel from '../../components/CommandPanel/Index';

export default function Main(){

    return ( 
        <main className="main">
            <section className="main_section">
                <Chessboard />

                <section className="notation_section">
                    <CommandPanel />

                    <div className="notation">
                        <textarea></textarea>
                    </div>
                </section>

            </section>
        </main>
    );
}