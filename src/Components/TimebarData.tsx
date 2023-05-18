import React from "react";

type Props = {
    CurrentPoints: number;
    Goal: number;
    Level: number;
    Color: "Gold" | "SkyBlue";
}

const TimebarData = (Props: Props) => {
    return (
        <div className={Props.Color === "Gold" ? "infosMeta animGoal" : "infosMeta"} id="wordpointtotal">
            <span className="meta">
                <p id="GOAL">GOAL</p>
                <strong id="goalNumber">{Props.CurrentPoints}/{Props.Goal}</strong>
            </span>
            <span className="level">
                <p id="level">LEVEL</p>
                <strong id="topLevelNumber">{Props.Level}</strong>
            </span>
        </div>
    )
}

export default TimebarData;