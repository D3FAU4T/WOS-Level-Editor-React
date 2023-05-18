import React from "react";

type Props = {
    TimePercentage: number;
    TotalLocks: number;
    ExpiredLocks: number;
    TransitionDuration: string;
}

const Timebar = (Props: Props) => {
    const locks: JSX.Element[] = [];
    const expiredLocks = Props.TotalLocks - Props.ExpiredLocks;

    for (let i = 0; i < Props.TotalLocks; i++) {
        let lockClass = "mark";
        if (i >= expiredLocks) lockClass += " end";
        locks.push(
            <div className={lockClass} style={{ left: `${100 * (i + 1) / (Props.TotalLocks + 1)}%` }} key={`TimeMark${i}`}></div>
        );
    }

    return (
        <div id="timebar">
            <span style={{ width: `${Props.TimePercentage}%`, transitionDuration: Props.TransitionDuration }} className=""></span>
            {locks}
        </div>
    )
}

export default Timebar;