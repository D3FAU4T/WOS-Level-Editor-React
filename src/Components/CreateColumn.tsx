import React from "react";
import CreateSlot from "./CreateSlot";
import { Slot } from '../Interfaces/LevelData';

type Props = {
    Column: Slot[];
}

const CreateColumn = (Props: Props) => {
    const slotsJSX: JSX.Element[] = [];

    Props.Column.forEach(slot => {
        slotsJSX.push(<CreateSlot nick={slot.username} letters={slot.word} locked={slot.locked} key={slot.word + slot.index} />);
    })

    return (
        <div className="column">
            {slotsJSX}
        </div>
    );
}

export default CreateColumn;