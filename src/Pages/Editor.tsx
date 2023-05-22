import '../CSS/Editor.css';
import React, { useEffect, useState } from "react";
import Letters from '../Components/Letters';
import CreateColumn from '../Components/CreateColumn';
import Setting from '../Components/Setting';
import { LevelData, Slot } from '../Interfaces/LevelData';
import Timebar from '../Components/Timebar';
import GoalBar from '../Components/GoalBar';
import {
    getCountOfFoundedWords,
    getCurrentPoints,
    getTotalPoints,
    getTotalWordsOfTheLevel,
    getWordsOfTheLevel,
    makePassingPoints
} from '../Components/Functions';
import LanguageSetting from '../Components/LanguageSetting';
import Topbar from '../Components/Topbar';

const level: LevelData = {
    "lang": "English",
    "fakeLetters": "",
    "hiddenLetters": "",
    "reveal": true,
    "level": "1",
    "timebar": {
        "timerPercentage": 100,
        "locks": {
            "total": 3,
            "expired": 0
        }
    },
    "column1": [
        { "word": "coned", "username": "chantell_nz", "locked": false, "index": 0 },
        { "word": "demon", "username": "draconis256_", "locked": false, "index": 1 },
        { "word": "denim", "username": "chantell_nz", "locked": false, "index": 2 },
        { "word": "medic", "username": "arch_a_tri", "locked": false, "index": 3 }
    ],
    "column2": [
        { "word": "mince", "username": "arch_a_tri", "locked": false, "index": 4 },
        { "word": "mined", "username": "d3fau4t", "locked": false, "index": 5 },
        { "word": "coined", "username": "arch_a_tri", "locked": false, "index": 6 },
        { "word": "income", "username": "chantell_nz", "locked": false, "index": 7 }
    ],
    "column3": [
        { "word": "minced", "username": "d3fau4t", "locked": false, "index": 8 },
        { "word": "demonic", "username": "draconis256_", "locked": false, "index": 9 }
    ]
}

const Editor = () => {

    const [json, setJson] = useState<LevelData>(level);
    const [words, setWords] = useState<string>(getWordsOfTheLevel(level));
    const [syncingText, setSyncingText] = useState<JSX.Element | null>(null);

    const resize = () => {
        const contentTop = document.getElementById("contentTop");
        const configPopup = document.getElementById("configPopup");
        const languagePopup = document.getElementById("languagePopup");

        if (contentTop && configPopup && languagePopup) {
            const maxWidth = contentTop.clientWidth;
            const maxHeight = contentTop.clientHeight;
            const width = window.innerWidth;
            const height = window.innerHeight;
            const isMax = width >= maxWidth! && height >= maxHeight!;
            const scale = Math.min(width / maxWidth!, height / maxHeight!);
            contentTop.style.transform = isMax ? '' : 'scale(' + scale + ')';
            configPopup.style.transform = isMax ? '' : 'scale(' + scale + ')';
            languagePopup.style.transform = isMax ? '' : 'scale(' + scale + ')';
        }
    }

    const openSettings = () => {
        const settings = document.getElementById("setting");
        if (settings) {
            settings.hidden = false;
            setTimeout(() => settings.className = "popup awards popup-enter-done", 300);
        }
    }

    const openLanguageSettings = () => {
        const languageSettings = document.getElementById("languageSetting");
        if (languageSettings) {
            languageSettings.hidden = false;
            setTimeout(() => languageSettings.className = "popup awards popup-enter-done", 300);
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
                        <div className="room fade-enter-done">
                            <header>
                                <span className="wos"></span>
                                <div className="word">
                                    <Topbar TopBarData={{
                                        guesser: "Guesser",
                                        word: "Word",
                                        mode: 'Completed'
                                    }} Blink />
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
                                        <div className="close" title="Language and UI" id="languageSettingBtn" onClick={openLanguageSettings}></div>
                                        <button className="config" title="Settings" id="configSetting" onClick={openSettings}></button>
                                    </div>
                                </div>
                            </header>
                            <div className="middle">
                                {/* <Timebar
                                    TimePercentage={json.timebar.timerPercentage}
                                    TotalLocks={json.timebar.locks.total}
                                    ExpiredLocks={json.timebar.locks.expired}
                                    SyncLettersSetter={setSyncingText}
                                    TransitionDuration="0ms"
                                /> */}
                                {/* Original --> TransitionDuration="117000ms" */}
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
                            <button className="copyToClipboard" id="copyToClipboard">Submit for a Custom Level</button>
                        </span>
                        <i></i>
                        <div>
                            <p id="QR1">SCAN THE QR CODE TO JOIN THE GAME</p>
                            <p id="QR2">ENJOY EXTRA FEATURES!</p>
                        </div>
                    </div>
                </div>
                <Setting
                    UseEasyMode={false}
                    SetLevelNumber={parseInt(json.level)}
                    SetJSON={json} SetParentJSONFunction={setJson}
                    SetWords={words} SetParentWordsFunction={setWords}
                    SetTotalLocks={json.timebar.locks.total}
                    SetExpiredLocks={json.timebar.locks.expired}
                    Reveal={json.reveal}
                    SetTime={json.timebar.timerPercentage}
                    SetFakeLetters={json.fakeLetters}
                    SetHiddenLetters={json.hiddenLetters}
                />
                {/* <!-- New Language Button --> */}
                <LanguageSetting ChangeSyncState={setSyncingText} />
            </div>
        </div>
    );
}

export default Editor;