import '../CSS/Editor.css';
import React, { useEffect, useState } from "react";
import GoalBar from '../Components/GoalBar';
import Topbar from '../Components/Topbar';
import { LevelData, Slot } from '../Interfaces/LevelData';
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

type Props = {
    MetaData: LevelData;
    PageChanger: (page: string) => void;
}

const Play = (Props: Props) => {

    const [json, setJson] = useState<LevelData>(Props.MetaData);
    const [levelFinished, setLevelFinished] = useState<boolean>(false);
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
        (["column1", "column2", "column3"] as unknown as [keyof typeof json]).forEach((column) => {
            const columnData = json[column] as Slot[];
            const slot = columnData.find((slot) => slot.index === index);
            if (slot) slot.locked = state;
        });
        setJson({ ...json });
    }

    // SYNCING WORDS PART
    // const handleSyncChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.checked) Props.ChangeSyncState(<span id='syncSwitch'>SYNCING LAST HITS</span>);
    //     else Props.ChangeSyncState(null);
    // }

    useEffect(() => {
        setTimeout(() => {
            setLevelFinished(true);
        }, 3000)

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
                                        <Topbar Mode='No Hit' />
                                    </div>
                                    <div className="contentAnagram">
                                        <div>
                                            <div className="lastHits" id="syncingTxt">{syncingText}</div>
                                            <div className={`containerLetters${syncingText === null ? "" : " lettersExit"}`} id="syncSetter">
                                                <p id="formWords">FORM WORDS WITH THE LETTERS BELOW</p>
                                                <Letters
                                                    Letters={getWordsOfTheLevel(json).split(' ').pop()!.replace(/\?/g, '')}
                                                    FakeLetters={json.fakeLetters}
                                                    HiddenLetters={json.hiddenLetters}
                                                    Reveal={json.reveal}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="actionsHeader alignRight">
                                    <GoalBar
                                        CurrentPoints={getCurrentPoints(json)}
                                        FoundedWords={getCountOfFoundedWords(json) + 1}
                                        TotalWords={getTotalWordsOfTheLevel(json)}
                                        Goal={makePassingPoints(json, getTotalPoints(json))}
                                        MetaData={json}
                                    />
                                    <div style={{ color: "#782cca" }}>aa</div>
                                    <div className="exitSound">
                                        <div className="close" title="Language and UI" id="languageSettingBtn"></div>
                                        <button className="config" title="Settings" id="configSetting"></button>
                                    </div>
                                </div>
                            </header>
                            <div className="middle">
                                <div className="time" id="syncTimerExit">
                                    <i className="icon"></i>
                                    <div id="timebar">
                                        <span className="" style={{ width: "100%", transitionDuration: "117000ms" }} id="timebarPercentage"></span>
                                        <div className="mark" style={{ left: "12%" }}></div>
                                        <div className="mark" style={{ left: "28%" }}></div>
                                        <div className="mark" style={{ left: "45%" }}></div>
                                        <div className="mark" style={{ left: "62%" }}></div>
                                        <div className="mark" style={{ left: "78%" }}></div>
                                    </div>
                                </div>
                                <div className="answer" id="answerslots">
                                    <CreateColumn MetaData={json} Column={json.column1} StartingIndex={0} SlotLockUpdater={updateSlotLock} />
                                    <CreateColumn MetaData={json} Column={json.column2} StartingIndex={json.column1.length} SlotLockUpdater={updateSlotLock} />
                                    <CreateColumn MetaData={json} Column={json.column3} StartingIndex={json.column1.length + json.column2.length} SlotLockUpdater={updateSlotLock} />
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
                    Hidden={!levelFinished}
                    TotalWords={getTotalWordsOfTheLevel(json)}
                    CurrentLevel={parseInt(json.level)}
                    FoundedWords={getCountOfFoundedWords(json)}
                    PageChanger={Props.PageChanger}
                    SkippedLevels={
                        calculateStars(
                            getTotalPoints(json),
                            getCurrentPoints(json),
                            parseInt(json.level)
                        )
                    }
                />
            </div>
        </div>
    );
}

export default Play;