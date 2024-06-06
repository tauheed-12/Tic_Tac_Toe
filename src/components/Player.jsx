import { useState } from "react"

export default function Player({ name, symbol, isActive, onChangeName }) {
    const [isEditing, setIsEditing] = useState(false);
    const [pname, setPName] = useState(name)
    function handleEditClick() {
        setIsEditing((isEditing) => !isEditing);
        if (isEditing) {
            onChangeName(symbol, pname)
        }
    }

    let playerName = <span className="player-name">{pname}</span>;
    if (isEditing) {
        playerName = <input type="text" required value={pname} onChange={(event) => setPName(event.target.value)} />
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}