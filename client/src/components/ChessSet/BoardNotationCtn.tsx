export default function BoardNotationCtn({type}: {type: string}){
    let fileNames = 'ABCDEFGH';
    let rankNames = '87654321';

    return (
        <div className="files_ctn">
            {type === 'files' ?
                fileNames.split('').map((el, i) => 
                    <span key={i}>{el}</span>
                ) :
                rankNames.split('').map((el, i) => 
                    <span key={i}>{el}</span>
                ) 
            }
        </div>
    )
}