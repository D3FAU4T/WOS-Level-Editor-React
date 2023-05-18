import React from "react";

type Props = {
    CurrentPoints: number;
    Goal: number;
    Level: number;
}

const TimebarData = (Props: Props) => {
    return (
        <div>
            <div className="infosMeta animGoal" id="wordpointtotal">
                <span className="meta">
                    <p id="GOAL">GOAL</p>
                    <strong id="goalNumber">{Props.CurrentPoints}/{Props.Goal}</strong>
                </span>
                <span className="level">
                    <p id="level">LEVEL</p>
                    <strong id="topLevelNumber">{Props.Level}</strong>
                </span>
            </div>
        </div>
    )
}

export default TimebarData;