import '../CSS/Editor.css';
import React, { useEffect, useState } from "react";
import TimebarLine from '../Components/TimebarLine';
import TimebarData from '../Components/TimebarData';
import Letters from '../Components/Letters';
import CreateColumn from '../Components/CreateColumn';
import Setting from '../Components/Setting';
import Fantastic from '../Components/Fantastic';
import { LevelData } from '../Interfaces/LevelData';
import { getTotalWordsOfTheLevel, getWordsOfTheLevel } from '../Components/Functions';

const level: LevelData = {
    "lang": "English",
    "fakeLetters": "yj",
    "hiddenLetters": "c",
    "reveal": false,
    "level": "1",
    "timebar": {
        "timerPercentage": 100,
        "locks": {
            "total": 5,
            "expired": 0
        }
    },
    "column1": [
        {
            "word": "bail?",
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

    const [words, setWords] = useState(getWordsOfTheLevel(level));
    const [fakeLetters, setFakeLetters] = useState(level.fakeLetters);
    const [hiddenLetters, setHiddenLetters] = useState(level.hiddenLetters);
    const [reveal, setReveal] = useState(level.reveal);

    const resize = () => {
        const contentTop = document.getElementById("contentTop");
        const configPopup = document.getElementById("configPopup");

        if (contentTop && configPopup) {
            const maxWidth = contentTop.clientWidth;
            const maxHeight = contentTop.clientHeight;
            const width = window.innerWidth;
            const height = window.innerHeight;
            const isMax = width >= maxWidth! && height >= maxHeight!;
            const scale = Math.min(width / maxWidth!, height / maxHeight!);
            contentTop.style.transform = isMax ? '' : 'scale(' + scale + ')';
            configPopup.style.transform = isMax ? '' : 'scale(' + scale + ')';
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
                                                <Letters Letters={words.split(' ').pop()!} FakeLetters={fakeLetters} HiddenLetters={hiddenLetters} Reveal={reveal}  />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="actionsHeader alignRight">
                                    <div className="metas">
                                        <TimebarLine TotalWords={getTotalWordsOfTheLevel(level)} FoundedWords={11} />
                                        <TimebarData CurrentPoints={69} Goal={176} Level={parseInt(level.level)} />
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
                                    <div id="timebar">
                                        <span style={{ width: "82%", transitionDuration: "117000ms" }} className=""></span>
                                        <div className="mark" style={{ left: "12%" }}></div>
                                        <div className="mark" style={{ left: "28%" }}></div>
                                        <div className="mark" style={{ left: "45%" }}></div>
                                        <div className="mark" style={{ left: "62%" }}></div>
                                        <div className="mark" style={{ left: "78%" }}></div>
                                    </div>
                                </div>
                                <div className="answer" id="answerslots">
                                    <CreateColumn Column={level.column1} />
                                    <CreateColumn Column={level.column2} />
                                    <CreateColumn Column={level.column3} />
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
                SetWords={words} SetWordParentFunction={setWords}
                SetParentFakeLetters={setFakeLetters} SetParentHiddenLetters={setHiddenLetters}
                Reveal={reveal} SetParentReveal={setReveal} />
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