import React from "react";

type Props = {
    nick: string;
    letters: string;
    locked: boolean;
}

const CreateSlot = (Props: Props) => {
    let letters = Props.letters.toUpperCase();
    const lettersJSX: JSX.Element[] = [];

    if (letters.includes('?')) {
        letters.replace(/\?/g, '').split('').forEach((letter, index) => {
            lettersJSX.push(<div className="letter" key={letter + index + letter}><span></span></div>);
        });

        return (
            <div className="slot">
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
            <div className={`slot hit${Props.locked ? "" : " expired"}`}>
                <div className={Props.locked ? "padlock" : ""}></div>
                <div className="animHit"></div>
                <div className="nick">{Props.nick}</div>
                <div className="letters">
                    {lettersJSX}
                </div>
            </div>
        );
    }
}

export default CreateSlot;