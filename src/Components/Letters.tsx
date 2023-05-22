import React, { memo } from "react";
import { wordPoint, shuffler, normalizeLetter } from "./Functions";

type Props = {
    Letters: string;
    FakeLetters: string;
    HiddenLetters: string;
    Reveal: boolean;
}

const Letters = (Props: Props) => {
    const letterJSX: JSX.Element[] = [];
    const fakes = Props.FakeLetters.toUpperCase().split('');
    const hiddens = Props.HiddenLetters.toUpperCase().split('');
    const letters = shuffler((Props.Letters.toUpperCase() + Props.FakeLetters.toUpperCase()).split(''));

    letters.forEach((letter, index) => {
        if (Props.Reveal) {
            if (fakes.includes(letter)) {
                letterJSX.push(
                    <div className="letter shuffle" key={letter + index}>
                        <ul>
                            <li className="invalid">{normalizeLetter(letter)}<span>{wordPoint(normalizeLetter(letter))}</span></li>
                            <li className="">e<span>1</span></li>
                        </ul>
                    </div>
                );
            }

            else if (hiddens.includes(letter)) {
                letterJSX.push(
                    <div className="letter shuffle" key={letter + index}>
                        <ul>
                            <li className="question">{normalizeLetter(letter)}<span>{wordPoint(normalizeLetter(letter))}</span></li>
                            <li className="">e<span>1</span></li>
                        </ul>
                    </div>
                );
            }

            else {
                letterJSX.push(
                    <div className="letter shuffle" key={letter + index}>
                        <ul>
                            <li className="">{normalizeLetter(letter)}<span>{wordPoint(normalizeLetter(letter))}</span></li>
                            <li className="">e<span>1</span></li>
                        </ul>
                    </div>
                );
            }
        }

        else {

            if (fakes.includes(letter)) {
                letterJSX.push(
                    <div className="letter shuffle" key={letter + index}>
                        <ul>
                            <li className="">{normalizeLetter(letter)}<span>{wordPoint(normalizeLetter(letter))}</span></li>
                            <li className="">e<span>1</span></li>
                        </ul>
                    </div>
                );
            }

            else if (hiddens.includes(letter)) {
                letterJSX.push(
                    <div className="letter shuffle" key={letter + index}>
                        <ul>
                            <li className="question">?<span></span></li>
                            <li className="">e<span>1</span></li>
                        </ul>
                    </div>
                );
            }

            else {
                letterJSX.push(
                    <div className="letter shuffle" key={letter + index}>
                        <ul>
                            <li className="">{normalizeLetter(letter)}<span>{wordPoint(normalizeLetter(letter))}</span></li>
                            <li className="">e<span>1</span></li>
                        </ul>
                    </div>
                );
            }
        }
    });

    return (
        <div>
            <div className="letters">
                {letterJSX}
            </div>
        </div>
    );
}

export default memo(Letters);