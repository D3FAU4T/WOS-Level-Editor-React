import '../CSS/Editor.css';
import React, { useEffect, useState } from "react";
import TimebarLine from '../Components/TimebarLine';
import TimebarData from '../Components/TimebarData';
import Letters from '../Components/Letters';
import CreateColumn from '../Components/CreateColumn';
import Setting from '../Components/Setting';
import Fantastic from '../Components/Fantastic';
import { LevelData } from '../Interfaces/LevelData';
import { getCountOfFoundedWords, getTotalWordsOfTheLevel, getWordsOfTheLevel } from '../Components/Functions';
import Timebar from '../Components/Timebar';

const level: LevelData = {
    "lang": "English",
    "fakeLetters": "",
    "hiddenLetters": "",
    "reveal": false,
    "level": "1",
    "timebar": {
        "timerPercentage": 100,
        "locks": {
            "total": 5,
            "expired": 1
        }
    },
    "column1": [
        {
            "word": "bail",
            "username": "d3fau4t",
            "locked": false,
            "index": 0
        },
        {
            "word": "ball",
            "username": "d3fau4t",
            "locked": false,
            "index": 1
        },
        {
            "word": "bill",
            "username": "d3fau4t",
            "locked": false,
            "index": 2
        },
        {
            "word": "blab",
            "username": "d3fau4t",
            "locked": false,
            "index": 3
        }
    ],
    "column2": [
        {
            "word": "call",
            "username": "d3fau4t",
            "locked": false,
            "index": 4
        },
        {
            "word": "ilia",
            "username": "d3fau4t",
            "locked": false,
            "index": 5
        },
        {
            "word": "alibi",
            "username": "d3fau4t",
            "locked": false,
            "index": 6
        },
        {
            "word": "cilia",
            "username": "d3fau4t",
            "locked": false,
            "index": 7
        }
    ],
    "column3": [
        {
            "word": "iliac",
            "username": "d3fau4t",
            "locked": false,
            "index": 8
        },
        {
            "word": "lilac",
            "username": "d3fau4t",
            "locked": false,
            "index": 9
        },
        {
            "word": "biblical",
            "username": "d3fau4t",
            "locked": true,
            "index": 10
        }
    ]
}

const Editor = () => {

    const [json, setJson] = useState<LevelData>(level);
    const [words, setWords] = useState<string>(getWordsOfTheLevel(level));

    const resize = () => {
        const contentTop = document.getElementById("contentTop");
        const configPopup = document.getElementById("configPopup");
        // const contentPopupFantastic = document.getElementById("contentPopupFantastic");

        if (contentTop && configPopup) {
            const maxWidth = contentTop.clientWidth;
            const maxHeight = contentTop.clientHeight;
            const width = window.innerWidth;
            const height = window.innerHeight;
            const isMax = width >= maxWidth! && height >= maxHeight!;
            const scale = Math.min(width / maxWidth!, height / maxHeight!);
            contentTop.style.transform = isMax ? '' : 'scale(' + scale + ')';
            configPopup.style.transform = isMax ? '' : 'scale(' + scale + ')';
            // if (contentPopupFantastic) {
            // contentPopupFantastic.style.transform = isMax ? '' : 'scale(' + scale + ')';
            // }
        }
    }

    const openSettings = () => {
        const settings = document.getElementById("setting");
        if (settings) {
            settings.hidden = false;
            setTimeout(() => settings.className = "popup awards popup-enter-done", 300);
        }
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
                                    <div className="contentFeedback" id="topbar">
                                        <div className="levelCompleted">
                                            <span id="congratulations">CONGRATULATIONS!</span>
                                            <p id="levelCompleted">LEVEL COMPLETED!</p>
                                        </div>
                                    </div>
                                    <div className="contentAnagram">
                                        <div>
                                            <div className="lastHits" id="syncingTxt"></div>
                                            <div className="containerLetters" id="syncSetter">
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
                                    <div className="metas">
                                        <TimebarLine
                                            TotalWords={getTotalWordsOfTheLevel(json)}
                                            FoundedWords={getCountOfFoundedWords(json) + 1}
                                        />
                                        <TimebarData CurrentPoints={69} Goal={176} Level={parseInt(json.level)} />
                                    </div>
                                    <div style={{ color: "#782cca" }}>aa</div>
                                    <div className="exitSound">
                                        <div className="close" title="Language and UI" id="languageSettingBtn"></div>
                                        <button className="config" title="Settings" id="configSetting" onClick={openSettings}></button>
                                    </div>
                                </div>
                            </header>
                            <div className="middle">
                                <div className="time">
                                    <i className="icon"></i>
                                    <Timebar
                                        TimePercentage={json.timebar.timerPercentage}
                                        TotalLocks={json.timebar.locks.total}
                                        ExpiredLocks={json.timebar.locks.expired}
                                        TransitionDuration="0ms"
                                    />
                                    {/* Original --> TransitionDuration="117000ms" */}
                                </div>
                                <div className="answer" id="answerslots">
                                    <CreateColumn Column={json.column1} />
                                    <CreateColumn Column={json.column2} />
                                    <CreateColumn Column={json.column3} />
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
                <div className="popup popup-enter-active awards" id="languageSetting" hidden>
                    <div className="contentPopup" style={{ transform: "scale(0.297732)" }} id="languagePopup">
                        <button className="close" title="Close" id="languageSettingClose"></button>
                        <h3 id="langUI">Language and UI</h3>
                        <div className="sounds" id="firstRow">
                            <span>
                                <h4 id="LangLanguage">Language</h4>
                                <span className="vol">
                                    <button className="down" title="Previous" id="languageDown"></button>
                                    <p id="languageNumber">English</p>
                                    <button className="up" title="Next" id="languageUp"></button>
                                </span>
                            </span>
                        </div>
                        <div className="word-mode">
                            <h4 id="syncTxt">Synchronization</h4>
                            <p id="syncSubTxt">Triggers the "Syncing last hits" instead of letters</p>
                            <br />
                            <span className="onoff">
                                <input id="sync" title="Enable sync" type="checkbox" />
                                <label htmlFor="sync"></label>
                            </span>
                        </div>
                        <div></div>
                    </div>
                </div>
                <Fantastic Hidden />
            </div>
        </div>
    );
}

export default Editor;