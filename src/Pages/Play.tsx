import '../CSS/Editor.css';
import React, { useEffect, useState } from "react";
import GoalBar from '../Components/GoalBar';
import Topbar from '../Components/Topbar';
import { LevelData, Slot, TopbarMode } from '../Interfaces/LevelData';
import Letters from '../Components/Letters';
import Fantastic from '../Components/Fantastic';
import CreateColumn from '../Components/CreateColumn';
import LanguageSetting from '../Components/LanguageSetting';
import {
    calculateStars,
    getCountOfFoundedWords,
    getCurrentPoints,
    getTotalPoints,
    getTotalWordsOfTheLevel,
    getWordsOfTheLevel,
    makePassingPoints
} from '../Components/Functions';
import Timebar from '../Components/Timebar';

type Props = {
    MetaData: LevelData;
    LevelFinished: boolean;
    SetLevelFinished: React.Dispatch<React.SetStateAction<boolean>>;
    PageChanger: (page: string) => void;
    SetLevelData: React.Dispatch<React.SetStateAction<LevelData>>;
    TopBarData: {
        guesser: string,
        word: string,
        mode: TopbarMode,
    };
}

const Play = (Props: Props) => {

    const [syncingText, setSyncingText] = useState<JSX.Element | null>(null);

    const resize = () => {
        const contentTop = document.getElementById("contentTop");
        const fantastic = document.getElementById("Fantastic");

        if (contentTop && fantastic) {
            const maxWidth = contentTop.clientWidth;
            const maxHeight = contentTop.clientHeight;
            const width = window.innerWidth;
            const height = window.innerHeight;
            const isMax = width >= maxWidth! && height >= maxHeight!;
            const scale = Math.min(width / maxWidth!, height / maxHeight!);
            contentTop.style.transform = isMax ? '' : 'scale(' + scale + ')';
            fantastic.style.transform = isMax ? '' : 'scale(' + scale + ')';
        }
    }

    const updateSlotLock = (state: boolean, index: number) => {
        (["column1", "column2", "column3"] as unknown as [keyof typeof Props.MetaData]).forEach((column) => {
            const columnData = Props.MetaData[column] as Slot[];
            const slot = columnData.find((slot) => slot.index === index);
            if (slot) slot.locked = state;
        });

        Props.SetLevelData({ ...Props.MetaData });
    }

    // SYNCING WORDS PART
    // const handleSyncChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.checked) Props.ChangeSyncState(<span id='syncSwitch'>SYNCING LAST HITS</span>);
    //     else Props.ChangeSyncState(null);
    // }

    useEffect(() => {
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    return (
        <div>
            <div id="root1">
                <div id="contentTop" style={{ transform: "scale(0.3)" }}>
                    <div className="content">
                        <div className="room fade-enter fade-enter-active">
                            <header>
                                <span className="wos"></span>
                                <div className="word" id="topbarWordHit">
                                    <div className="contentFeedback">
                                        <Topbar TopBarData={Props.TopBarData} />
                                    </div>
                                    <div className="contentAnagram">
                                        <div>
                                            <div className="lastHits" id="syncingTxt">{syncingText}</div>
                                            <div className={`containerLetters${syncingText === null ? "" : " lettersExit"}`} id="syncSetter">
                                                <p id="formWords">FORM WORDS WITH THE LETTERS BELOW</p>
                                                <Letters
                                                    Letters={getWordsOfTheLevel(Props.MetaData).split(' ').pop()!.replace(/\?/g, '')}
                                                    FakeLetters={Props.MetaData.fakeLetters}
                                                    HiddenLetters={Props.MetaData.hiddenLetters}
                                                    Reveal={Props.MetaData.reveal}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="actionsHeader alignRight">
                                    <GoalBar
                                        CurrentPoints={getCurrentPoints(Props.MetaData)}
                                        FoundedWords={getCountOfFoundedWords(Props.MetaData) + 1}
                                        TotalWords={getTotalWordsOfTheLevel(Props.MetaData)}
                                        Goal={makePassingPoints(Props.MetaData, getTotalPoints(Props.MetaData))}
                                        MetaData={Props.MetaData}
                                    />
                                    <div style={{ color: "#782cca" }}>aa</div>
                                    <div className="exitSound">
                                        <div className="close" title="Language and UI" id="languageSettingBtn"></div>
                                        <button className="config" title="Settings" id="configSetting"></button>
                                    </div>
                                </div>
                            </header>
                            <div className="middle">
                                <Timebar
                                    TimePercentage={Props.MetaData.timebar.timerPercentage}
                                    TotalLocks={Props.MetaData.timebar.locks.total}
                                    ExpiredLocks={Props.MetaData.timebar.locks.expired}
                                    SyncLettersSetter={setSyncingText}
                                    LevelFinished={Props.SetLevelFinished}
                                    TransitionDuration='117000ms'
                                />
                                <div className="answer" id="answerslots">
                                    <CreateColumn MetaData={Props.MetaData} Column={Props.MetaData.column1} StartingIndex={0} SlotLockUpdater={updateSlotLock} />
                                    <CreateColumn MetaData={Props.MetaData} Column={Props.MetaData.column2} StartingIndex={Props.MetaData.column1.length} SlotLockUpdater={updateSlotLock} />
                                    <CreateColumn MetaData={Props.MetaData} Column={Props.MetaData.column3} StartingIndex={Props.MetaData.column1.length + Props.MetaData.column2.length} SlotLockUpdater={updateSlotLock} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="qrcode">
                        <span>
                            <button className="copyToClipboard" id="copyToClipboard">Copy to clipboard</button>
                        </span>
                        <i></i>
                        <div>
                            <p id="QR1">SCAN THE QR CODE TO JOIN THE GAME</p>
                            <p id="QR2">ENJOY EXTRA FEATURES!</p>
                        </div>
                    </div>
                </div>
                <div className="popup popup-enter-active awards" id="setting" hidden>
                    <div className="contentPopup" style={{ transform: "scale(0.297732)" }} id="configPopup">
                        <button className="close" title="Close" id="settingClose"></button>
                        <h3 id="settingLang">Settings</h3>
                        <div className="word-mode">
                            <h4 id="easyMode">Easy Mode</h4>
                            <p id="easyModeText">Don't know how to use JSON? Turn on easy mode and use the UI to customize</p>
                            <span className="onoff">
                                <input id="wordMode" title="Easy Mode Switch" type="checkbox" />
                                <label htmlFor="wordMode"></label>
                            </span>
                        </div>
                        <div className="addCommands" id="bottomConfig">
                            <h4 id="JSONconfig">JSON Config</h4>
                            <p id="JSONtxt">Paste the JSON configuration in order to update the board. Example format below.</p>
                            <textarea className="" id="jsoninput"></textarea>
                            <label className="error"></label>
                        </div>
                        <div className="sounds" id="thirdRow"></div>
                        <div className="sounds" id="fourthRow"></div>
                    </div>
                </div>
                {/* <!-- New Language Button --> */}
                <LanguageSetting ChangeSyncState={setSyncingText} />
                <Fantastic
                    Hidden={!Props.LevelFinished}
                    TotalWords={getTotalWordsOfTheLevel(Props.MetaData)}
                    CurrentLevel={parseInt(Props.MetaData.level)}
                    FoundedWords={getCountOfFoundedWords(Props.MetaData)}
                    PageChanger={Props.PageChanger}
                    SkippedLevels={
                        // calculateStars(
                        //     getTotalPoints(Props.MetaData),
                        //     getCurrentPoints(Props.MetaData),
                        //     parseInt(Props.MetaData.level)
                        // )
                        3
                    }
                />
            </div>
        </div>
    );
}

export default Play;