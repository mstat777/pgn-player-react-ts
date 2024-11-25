import './SwitchBtn.scss';

type Props = {
    state: boolean;
    onClick: () => void;
}

export default function SwitchBtn({state, onClick}: Props){
    return (
        <button 
            className={`switch_btn ${state ? 'toggled' : ''}`}
            onClick={onClick}
        >
            <div className={`thumb`}></div>
        </button>
    )
}