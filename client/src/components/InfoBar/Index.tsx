import './InfoBar.scss';
import { useAppSelector } from '../../store/hooks';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export default function InfoBar() {
    const tags = useAppSelector((state) => state.pgnData.tags);
    const [showDetails, setShowDetails] = useState<boolean>(false);

    return (
        !Object.keys(tags as Object).length ? 
        null :
        tags && 
        <div className="infobar">
            <button 
                className="collapse_btn"
                onClick={() => setShowDetails(!showDetails)}
            >
                { !showDetails &&
                    <FontAwesomeIcon icon={faChevronDown} /> }
                { showDetails &&
                    <FontAwesomeIcon icon={faChevronUp} /> }
            </button>
            { !showDetails &&
                <div className="infobar_details">
                    <p className="tag">
                        <span className="value">{tags['white']}</span>
                        <span>vs</span>
                        <span className="value">{tags['black']}</span>
                        <span>:</span>
                        <span className="value">{tags['result']}</span>
                    </p>
                </div>
            }
            { showDetails &&
                <div className="infobar_data_ctn">
                    <p className="tag">
                        <span className="key">White:</span>
                        <span className="value">{tags['white']}</span>
                        <span className="key">, ELO:</span>
                        <span className="value">{tags['whiteelo']}</span>
                    </p>

                    <p className="tag">
                        <span className="key">Black:</span>
                        <span className="value">{tags['black']}</span>
                        <span className="key">, ELO:</span>
                        <span className="value">{tags['blackelo']}</span>
                    </p>

                    <p className="tag">
                        <span className="key">Result:</span>
                        <span className="value">{tags['result']}</span>
                    </p>

                    <p className="tag">
                        <span className="key">Date:</span>
                        <span className="value">{tags['date']}</span>
                    </p>

                    <p className="tag">
                        <span className="key">Site:</span>
                        <span className="value">{tags['site']}</span>
                    </p>

                    <p className="tag">
                        <span className="key">Event:</span>
                        <span className="value">{tags['event']}</span>
                    </p>

                    <p className="tag">
                        <span className="key">Round:</span>
                        <span className="value">{tags['round']}</span>
                    </p>
                </div>
            }
        </div>
    )
}