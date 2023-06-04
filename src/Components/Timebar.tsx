import React, { useEffect, useRef } from "react";
import tempoFinal from '../Sounds/tempo_final.mp3';

type Props = {
    TimePercentage: number;
    TotalLocks: number;
    ExpiredLocks: number;
    TransitionDuration: string;
    SyncLettersSetter: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
    LevelFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

const Timebar = (Props: Props) => {

    const endTimeSound = new Audio(tempoFinal);

    const locks: JSX.Element[] = [];
    const expiredLocks = Props.TotalLocks - Props.ExpiredLocks;

    const timeClass = useRef<HTMLSpanElement>(null);
    const timeExitRef = useRef<HTMLDivElement>(null);

    // for (let i = 0; i < Props.TotalLocks; i++) {
    //     let lockClass = "mark";
    //     if (i >= expiredLocks) lockClass += " end";
    //     locks.push(
    //         <div className={lockClass} style={{ left: `${100 * (i + 1) / (Props.TotalLocks + 1)}%` }} key={`TimeMark${i}`}></div>
    //     );
    // }

    useEffect(() => {
        if (timeClass.current) timeClass.current.style.width = `0%`;
        setTimeout(async () => {
            if (timeClass.current) {
                timeClass.current.className = "endTime";
            }
        }, (parseInt(Props.TransitionDuration.replace('ms', '')) - 20000))

        setTimeout(async () => {
            if (timeExitRef.current) {
                endTimeSound.play();
                timeExitRef.current.className = "time timeExit";
                Props.SyncLettersSetter(<span id='syncSwitch'>SYNCING LAST HITS</span>);
                setTimeout(() => {
                    Props.LevelFinished(true);
                }, 3000)
            }
        }, parseInt(Props.TransitionDuration.replace('ms', '')));
    }, [])

    return (
        <div className="time" id="syncTimerExit" ref={timeExitRef}>
            <i className="icon"></i>
            <div id="timebar">
                <span style={{ width: `${Props.TimePercentage}%`, transitionDuration: Props.TransitionDuration }} className="" ref={timeClass}></span>
                {locks}
            </div>
        </div>
    )
}

export default Timebar;