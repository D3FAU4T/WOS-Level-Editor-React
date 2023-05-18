import React from "react";
import TimebarData from "./TimebarData";
import TimebarLine from "./TimebarLine";
import { LevelData } from "../Interfaces/LevelData";

type Props = {
    MetaData: LevelData;
    CurrentPoints: number;
    Goal: number;
    TotalWords: number;
    FoundedWords: number;
}

const GoalBar = (Props: Props) => {
    return (
        <div className="metas">
            <TimebarLine
                TotalWords={Props.TotalWords}
                FoundedWords={Props.FoundedWords}
                CurrentPoints={Props.CurrentPoints}
                Goal={Props.Goal}
                Color={Props.CurrentPoints >= Props.Goal ? "Gold" : "SkyBlue"}
            />
            <TimebarData
                CurrentPoints={Props.CurrentPoints}
                Goal={Props.Goal}
                Level={parseInt(Props.MetaData.level)}
                Color={Props.CurrentPoints >= Props.Goal ? "Gold" : "SkyBlue"}
            />
        </div>
    );
}

export default GoalBar;