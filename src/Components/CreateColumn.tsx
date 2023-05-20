import React from "react";
import CreateSlot from "./CreateSlot";
import { LevelData, Slot } from '../Interfaces/LevelData';

type Props = {
    Column: Slot[];
    StartingIndex: number;
    MetaData: LevelData;
    SlotLockUpdater: (state: boolean, index: number) => void;
}

const CreateColumn = (Props: Props) => {
    const slotsJSX: JSX.Element[] = [];

    Props.Column.forEach((slot, index) => {
        slotsJSX.push(<CreateSlot MetaData={Props.MetaData} nick={slot.username} letters={slot.word} locked={slot.locked} index={Props.StartingIndex + index} SlotUpdater={Props.SlotLockUpdater} key={slot.word + slot.index} />);
    })

    return (
        <div className="column">
            {slotsJSX}
        </div>
    );
}

export default CreateColumn;