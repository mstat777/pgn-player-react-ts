import './CommandPanel.scss';

export default function CommandPanel(){

    return ( 
        <div className="command_panel">
            <div className="functions-btn">
                <button type="button" id="loadBtn">load</button>
                
                <button type="button" id="clearBtn">clear</button>
            </div>

            <div className="nav-btn">
                <button type="button" id="toStartBtn">
                    <i className="fa-solid fa-backward-fast"></i>
                </button>

                <button type="button" id="previousMoveBtn">
                    <i className="fa-solid fa-caret-left"></i>
                </button>

                <button type="button" id="nextMoveBtn">
                    <i className="fa-solid fa-caret-right"></i>
                </button>

                <button type="button" id="toEndBtn">
                    <i className="fa-solid fa-forward-fast"></i>
                </button>
            </div>
        </div>
    );
}