import './Home.scss';
import ChessSet from '../../components/ChessSet/Index';
import CommandPanel from '../../components/CommandPanel/Index';
import { useState } from 'react';

export default function Home(){
    const [pgnText, setPgnText] = useState<string>('');
    const pgnTextMaxLength = 2500;

    return ( 
        <main className="home">
            <section className="home_section">
                <ChessSet />

                <section className="notation_section">
                    <CommandPanel />

                    <div className="notation">
                        <textarea
                            //value={pgnText}
                            placeholder="put your PGN data here..."
                            rows={8}
                            maxLength={pgnTextMaxLength}
                        ></textarea>
                    </div>
                </section>

            </section>
        </main>
    );
}