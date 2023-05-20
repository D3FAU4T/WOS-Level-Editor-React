import React from "react";
import { LevelData } from "../Interfaces/LevelData";

type Props = {
    nick: string;
    letters: string;
    locked: boolean;
    index: number;
    MetaData: LevelData;
    SlotUpdater: (state: boolean, index: number) => void;
}

const CreateSlot = (Props: Props) => {
    let letters = Props.letters.toUpperCase();
    const lettersJSX: JSX.Element[] = [];

    const handleMouseOver = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if ((e.currentTarget.firstChild as HTMLDivElement).className === "padlock") return;
        if ((e.currentTarget.firstChild as HTMLDivElement).className !== "padlock") {
            e.currentTarget.className = "slot hit";
            (e.currentTarget.firstChild as HTMLDivElement).className = "padlock";
            (e.currentTarget.firstChild as HTMLDivElement).style.display = "flex";
        }
    }

    const handleMouseOut = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        [...Props.MetaData.column1, ...Props.MetaData.column2, ...Props.MetaData.column3]
        .forEach((slot, index) => {
            if (e.currentTarget.id.includes(index.toString())) {
                if (slot.locked) return;
                if ((e.currentTarget.firstChild as HTMLDivElement).className === "padlock") {
                    e.currentTarget.className = "slot hit expired";
                    (e.currentTarget.firstChild as HTMLDivElement).className = "";
                    (e.currentTarget.firstChild as HTMLDivElement).style.display = "none";
                }
            }
        });        
    }

    const handlePadlockClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        [...Props.MetaData.column1, ...Props.MetaData.column2, ...Props.MetaData.column3]
            .forEach((slot, index) => {
                let ourSlot = document.getElementById(`OurSlot${index}`);
                let ourLock = document.getElementById(`OurLock${index}`);

                if (e.currentTarget.parentElement?.id.includes(index.toString())) {
                    if (slot.locked) {
                        Props.SlotUpdater(false, index);
                        ourLock!.className = "";
                        ourSlot!.className = "slot hit expired";
                    }

                    else {
                        Props.SlotUpdater(true, index);
                        ourLock!.className = "padlock";
                        ourSlot!.className = "slot hit";
                    }
                }
            });
    }

    if (letters.includes('?')) {
        letters.replace(/\?/g, '').split('').forEach((letter, index) => {
            lettersJSX.push(<div className="letter" key={letter + index + letter}><span></span></div>);
        });

        return (
            <div className="slot" id={`OurSlot${Props.index}`}>
                <div className="nick"></div>
                <div className="letters">
                    {lettersJSX}
                </div>
            </div>
        );

    } else {
        letters.split('').forEach((letter, index) => {
            lettersJSX.push(<div className="letter" key={letter + index + letter}><span>{letter}</span></div>);
        });

        return (
            <div className={`slot hit${Props.locked ? "" : " expired"}`} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} id={`OurSlot${Props.index}`}>
                <div className={Props.locked ? "padlock" : ""} id={`OurLock${Props.index}`} onClick={handlePadlockClick}></div>
                <div className="animHit"></div>
                <div className="nick" contentEditable suppressContentEditableWarning>{Props.nick}</div>
                <div className="letters">
                    {lettersJSX}
                </div>
            </div>
        );
    }
}

export default CreateSlot;