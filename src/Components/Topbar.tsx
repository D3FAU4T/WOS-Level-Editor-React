import React from "react";
import { TopbarMode } from "../Interfaces/LevelData";

type Props = {
    Blink?: boolean;
    TopBarData: {
        guesser: string,
        word: string,
        mode: TopbarMode,
    }
}

const Topbar = (Props: Props) => {

    const hit: JSX.Element = (
        <div className="hit feedback-enter feedback-enter-active">
            <div>
                <span className="nick">{Props.TopBarData.guesser.toUpperCase()} </span>
                <span>FOUND</span>
            </div>
            <p>"{Props.TopBarData.word.toUpperCase()}"</p>
        </div>
    );

    const noHit: JSX.Element = (
        <div className="notHit">
            <span className={Props.Blink ? "blink" : ""}>BE THE FIRST ONE TO<br />FIND AN ANAGRAM!</span>
        </div>
    );

    const completed: JSX.Element = (
        <div className="levelCompleted">
            <span id="congratulations">CONGRATULATIONS!</span>
            <p id="levelCompleted">LEVEL COMPLETED!</p>
        </div>
    );

    const oneFake: JSX.Element = (
        <div className="notHit">
            <span className={Props.Blink ? "invalid blink" : "invalid"}>ATTENTION! THERE IS A<br />
                <strong className="red">FAKE LETTER</strong>
            </span>
        </div>
    );

    const oneFakeAndOneHidden: JSX.Element = (
        <div className="notHit">
            <span className={Props.Blink ? "hidden blink" : "hidden"}>BEWARE OF THE <strong className="red">FAKE LETTER</strong>
                <br />AND THE <strong className="yellow">HIDDEN LETTER!</strong>
            </span>
        </div>
    );

    const twoFakesAndOneHidden: JSX.Element = (
        <div className="notHit">
            <span className={Props.Blink ? "hidden blink" : "hidden"}>ATTENTION! <strong className="red">TWO FAKE LETTERS</strong>
                <br />AND <strong className="yellow">ONE HIDDEN!</strong>
            </span>
        </div>
    );

    const twoFakesAndTwoHidden: JSX.Element = (
        <div className="notHit">
            <span className={Props.Blink ? "hidden blink" : "hidden"}>ATTENTION! <strong className="red">TWO FAKE LETTERS</strong>
                <br />AND <strong className="yellow">TWO HIDDEN!</strong>
            </span>
        </div>
    );

    const twoFakesAndThreeHidden: JSX.Element = (
        <div className="notHit">
            <span className={Props.Blink ? "hidden blink" : "hidden"}>ATTENTION! <strong className="red">TWO FAKE LETTERS</strong>
                <br />AND <strong className="yellow">THREE HIDDEN!</strong>
            </span>
        </div>
    );

    const hidden: JSX.Element = (
        <div className="notHit">
            <span className={Props.Blink ? "blink" : ""}>IT'S GETTING HARDER! THE<br />ANSWERS ARE NOW HIDDEN!</span>
        </div>
    );

    return (
        <div className="contentFeedback" id="topbar">
            {
                Props.TopBarData.mode === "Hit" ? hit :
                    Props.TopBarData.mode === "No Hit" ? noHit :
                        Props.TopBarData.mode === "Completed" ? completed :
                            Props.TopBarData.mode === "1 fake" ? oneFake :
                                Props.TopBarData.mode === "1 fake & 1 hidden" ? oneFakeAndOneHidden :
                                    Props.TopBarData.mode === "2 fakes & 1 hidden" ? twoFakesAndOneHidden :
                                        Props.TopBarData.mode === "2 fakes & 2 hidden" ? twoFakesAndTwoHidden :
                                            Props.TopBarData.mode === "2 fakes & 3 hidden" ? twoFakesAndThreeHidden :
                                                hidden
            }
        </div>
    );
}

export default Topbar;