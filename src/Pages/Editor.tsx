import '../CSS/Editor.css';
import React, { useEffect } from "react";
import TimebarLine from '../Components/TimebarLine';
import TimebarData from '../Components/TimebarData';
import Letters from '../Components/Letters';
import CreateColumn from '../Components/CreateColumn';
import { getTotalWordsOfTheLevel } from '../Components/Functions';
import { LevelData } from '../Interfaces/LevelData';

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
    const contentTop = document.getElementById("contentTop");

    const resize = () => {
        if (contentTop) {
            const maxWidth = contentTop.clientWidth;
            const maxHeight = contentTop.clientHeight;
            const width = window.innerWidth;
            const height = window.innerHeight;
            const isMax = width >= maxWidth! && height >= maxHeight!;
            const scale = Math.min(width / maxWidth!, height / maxHeight!);
            contentTop.style.transform = isMax ? '' : 'scale(' + scale + ')';
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
                                                <Letters Letters='biblical' FakeLetters={level.fakeLetters} HiddenLetters={level.hiddenLetters} Reveal={level.reveal} />
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
                                        <button className="config" title="Settings" id="configSetting"></button>
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
                <div>
                    <div className="popup wdone popup-enter-done" hidden>
                        <div className="brilho"></div>
                        <div className="contentPopup" style={{ transform: "scale(0.234405)" }}>
                            <div className="welldone">
                                <div className="header">
                                    <h3>FANTASTIC!</h3>
                                    <h5>SKIP <strong>3 LEVELS!</strong></h5>
                                </div>
                                <div className="middle">
                                    <div className="level">
                                        <span>
                                            <h6>LEVEL</h6>
                                            <strong>28</strong>
                                        </span>
                                    </div>
                                    <div className="center">
                                        <div className="lottie"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 290" width="800"
                                            height="290" style={{ width: "100%", height: "100%", transform: "translate3d(0px, 0px, 0px)" }}
                                            preserveAspectRatio="xMidYMid meet">
                                            <defs>
                                                <clipPath id="__lottie_element_389">
                                                    <rect width="800" height="290" x="0" y="0"></rect>
                                                </clipPath>
                                                <clipPath id="__lottie_element_391">
                                                    <path d="M0,0 L275,0 L275,275 L0,275z"></path>
                                                </clipPath>
                                                <clipPath id="__lottie_element_395">
                                                    <path d="M0,0 L275,0 L275,275 L0,275z"></path>
                                                </clipPath>
                                                <clipPath id="__lottie_element_423">
                                                    <path d="M0,0 L275,0 L275,275 L0,275z"></path>
                                                </clipPath>
                                                <clipPath id="__lottie_element_469">
                                                    <path d="M0,0 L275,0 L275,275 L0,275z"></path>
                                                </clipPath>
                                                <clipPath id="__lottie_element_473">
                                                    <path d="M0,0 L275,0 L275,275 L0,275z"></path>
                                                </clipPath>
                                                <clipPath id="__lottie_element_501">
                                                    <path d="M0,0 L275,0 L275,275 L0,275z"></path>
                                                </clipPath>
                                                <clipPath id="__lottie_element_547">
                                                    <path d="M0,0 L275,0 L275,275 L0,275z"></path>
                                                </clipPath>
                                                <clipPath id="__lottie_element_551">
                                                    <path d="M0,0 L275,0 L275,275 L0,275z"></path>
                                                </clipPath>
                                                <clipPath id="__lottie_element_579">
                                                    <path d="M0,0 L275,0 L275,275 L0,275z"></path>
                                                </clipPath>
                                            </defs>
                                            <g clipPath="url(#__lottie_element_389)">
                                                <g style={{ display: "block" }}
                                                    transform="matrix(1.0199999809265137,0,0,1.0199999809265137,539.0465087890625,65.89812469482422)"
                                                    opacity="1">
                                                    <g opacity="1" transform="matrix(1,0,0,1,101.90699768066406,96.61299896240234)">
                                                        <path fill="rgb(42,24,70)" fillOpacity="1"
                                                            d=" M18.115999221801758,-72.1050033569336 C18.115999221801758,-72.1050033569336 25.601999282836914,-49.319000244140625 25.601999282836914,-49.319000244140625 C28.297000885009766,-41.52399826049805 35.483001708984375,-36.12699890136719 43.86800003051758,-36.12699890136719 C43.86800003051758,-36.12699890136719 67.8219985961914,-36.12699890136719 67.8219985961914,-36.12699890136719 C86.38700103759766,-36.12699890136719 94.1729965209961,-12.442000389099121 79.20099639892578,-1.3489999771118164 C79.20099639892578,-1.3489999771118164 59.737998962402344,13.041000366210938 59.737998962402344,13.041000366210938 C53.150001525878906,17.839000701904297 50.15599822998047,26.534000396728516 52.849998474121094,34.62799835205078 C52.849998474121094,34.62799835205078 60.33700180053711,57.415000915527344 60.33700180053711,57.415000915527344 C66.0260009765625,75.10399627685547 45.9640007019043,89.79399871826172 30.691999435424805,79.0009994506836 C30.691999435424805,79.0009994506836 11.229000091552734,64.61000061035156 11.229000091552734,64.61000061035156 C4.640999794006348,59.8129997253418 -4.640999794006348,59.8129997253418 -11.229000091552734,64.61000061035156 C-11.229000091552734,64.61000061035156 -30.691999435424805,78.7020034790039 -30.691999435424805,78.7020034790039 C-45.66400146484375,89.79399871826172 -66.0260009765625,74.8030014038086 -60.33599853515625,57.1150016784668 C-60.33599853515625,57.1150016784668 -52.849998474121094,34.32899856567383 -52.849998474121094,34.32899856567383 C-50.154998779296875,26.534000396728516 -53.150001525878906,17.839000701904297 -59.737998962402344,12.743000030517578 C-59.737998962402344,12.743000030517578 -79.20099639892578,-1.3489999771118164 -79.20099639892578,-1.3489999771118164 C-94.1729965209961,-12.442000389099121 -86.38700103759766,-36.12699890136719 -67.8219985961914,-36.12699890136719 C-67.8219985961914,-36.12699890136719 -43.867000579833984,-36.12699890136719 -43.867000579833984,-36.12699890136719 C-35.483001708984375,-36.12699890136719 -28.297000885009766,-41.52399826049805 -25.601999282836914,-49.319000244140625 C-25.601999282836914,-49.319000244140625 -18.115999221801758,-72.1050033569336 -18.115999221801758,-72.1050033569336 C-12.72599983215332,-89.79399871826172 12.427000045776367,-89.79399871826172 18.115999221801758,-72.1050033569336z">
                                                        </path>
                                                    </g>
                                                    <g opacity="1" transform="matrix(1,0,0,1,101.6729965209961,97.29399871826172)">
                                                        <path strokeLinecap="butt" strokeLinejoin="miter" fillOpacity="0" strokeMiterlimit="10"
                                                            stroke="rgb(177,134,250)" strokeOpacity="1" strokeWidth="2"
                                                            d=" M18.115999221801758,-72.1050033569336 C18.115999221801758,-72.1050033569336 25.60099983215332,-49.319000244140625 25.60099983215332,-49.319000244140625 C28.297000885009766,-41.52399826049805 35.483001708984375,-36.12699890136719 43.867000579833984,-36.12699890136719 C43.867000579833984,-36.12699890136719 67.8219985961914,-36.12699890136719 67.8219985961914,-36.12699890136719 C86.38700103759766,-36.12699890136719 94.1729965209961,-12.442000389099121 79.20099639892578,-1.3489999771118164 C79.20099639892578,-1.3489999771118164 59.73699951171875,13.041000366210938 59.73699951171875,13.041000366210938 C53.150001525878906,17.839000701904297 50.154998779296875,26.534000396728516 52.849998474121094,34.62799835205078 C52.849998474121094,34.62799835205078 60.33700180053711,57.415000915527344 60.33700180053711,57.415000915527344 C66.0250015258789,75.10299682617188 45.9640007019043,89.79399871826172 30.691999435424805,79.0009994506836 C30.691999435424805,79.0009994506836 11.227999687194824,64.61000061035156 11.227999687194824,64.61000061035156 C4.640999794006348,59.8129997253418 -4.640999794006348,59.8129997253418 -11.229000091552734,64.61000061035156 C-11.229000091552734,64.61000061035156 -30.691999435424805,78.7020034790039 -30.691999435424805,78.7020034790039 C-45.66400146484375,89.79399871826172 -66.0260009765625,74.8030014038086 -60.33700180053711,57.1150016784668 C-60.33700180053711,57.1150016784668 -52.849998474121094,34.32899856567383 -52.849998474121094,34.32899856567383 C-50.154998779296875,26.534000396728516 -53.150001525878906,17.839000701904297 -59.737998962402344,12.741999626159668 C-59.737998962402344,12.741999626159668 -79.20099639892578,-1.3489999771118164 -79.20099639892578,-1.3489999771118164 C-94.1729965209961,-12.442000389099121 -86.38700103759766,-36.12699890136719 -67.8219985961914,-36.12699890136719 C-67.8219985961914,-36.12699890136719 -43.867000579833984,-36.12699890136719 -43.867000579833984,-36.12699890136719 C-35.483001708984375,-36.12699890136719 -28.297000885009766,-41.52399826049805 -25.601999282836914,-49.319000244140625 C-25.601999282836914,-49.319000244140625 -18.115999221801758,-72.1050033569336 -18.115999221801758,-72.1050033569336 C-12.72599983215332,-89.79399871826172 12.427000045776367,-89.79399871826172 18.115999221801758,-72.1050033569336z">
                                                        </path>
                                                    </g>
                                                </g>
                                                <g clipPath="url(#__lottie_element_547)" style={{ display: "none" }}>
                                                    <g style={{ display: "none" }}>
                                                        <g>
                                                            <path></path>
                                                        </g>
                                                        <g>
                                                            <path strokeLinecap="butt" strokeLinejoin="miter" fillOpacity="0" strokeMiterlimit="10">
                                                            </path>
                                                        </g>
                                                    </g>
                                                    <g style={{ display: "none" }}>
                                                        <g>
                                                            <path></path>
                                                        </g>
                                                    </g>
                                                    <g style={{ display: "none" }}>
                                                        <g>
                                                            <path></path>
                                                        </g>
                                                        <g>
                                                            <path strokeLinecap="butt" strokeLinejoin="miter" fillOpacity="0" strokeMiterlimit="10">
                                                            </path>
                                                        </g>
                                                    </g>
                                                    <g style={{ display: "none" }}>
                                                        <g>
                                                            <path></path>
                                                        </g>
                                                        <g>
                                                            <path></path>
                                                        </g>
                                                        <g>
                                                            <path></path>
                                                        </g>
                                                    </g>
                                                    <g style={{ display: "none" }}>
                                                        <g>
                                                            <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                strokeMiterlimit="10"></path>
                                                        </g>
                                                    </g>
                                                    <g clipPath="url(#__lottie_element_579)" style={{ display: "none" }}>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path></path>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                    <g clipPath="url(#__lottie_element_551)" style={{ display: "none" }}>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path></path>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                                <g style={{ display: "block" }}
                                                    transform="matrix(1.0199999809265137,0,0,1.0199999809265137,296.1735534667969,49.89812469482422)"
                                                    opacity="1">
                                                    <g opacity="1" transform="matrix(1,0,0,1,101.90699768066406,96.61299896240234)">
                                                        <path fill="rgb(42,24,70)" fillOpacity="1"
                                                            d=" M18.115999221801758,-72.1050033569336 C18.115999221801758,-72.1050033569336 25.601999282836914,-49.319000244140625 25.601999282836914,-49.319000244140625 C28.297000885009766,-41.52399826049805 35.483001708984375,-36.12699890136719 43.86800003051758,-36.12699890136719 C43.86800003051758,-36.12699890136719 67.8219985961914,-36.12699890136719 67.8219985961914,-36.12699890136719 C86.38700103759766,-36.12699890136719 94.1729965209961,-12.442000389099121 79.20099639892578,-1.3489999771118164 C79.20099639892578,-1.3489999771118164 59.737998962402344,13.041000366210938 59.737998962402344,13.041000366210938 C53.150001525878906,17.839000701904297 50.15599822998047,26.534000396728516 52.849998474121094,34.62799835205078 C52.849998474121094,34.62799835205078 60.33700180053711,57.415000915527344 60.33700180053711,57.415000915527344 C66.0260009765625,75.10399627685547 45.9640007019043,89.79399871826172 30.691999435424805,79.0009994506836 C30.691999435424805,79.0009994506836 11.229000091552734,64.61000061035156 11.229000091552734,64.61000061035156 C4.640999794006348,59.8129997253418 -4.640999794006348,59.8129997253418 -11.229000091552734,64.61000061035156 C-11.229000091552734,64.61000061035156 -30.691999435424805,78.7020034790039 -30.691999435424805,78.7020034790039 C-45.66400146484375,89.79399871826172 -66.0260009765625,74.8030014038086 -60.33599853515625,57.1150016784668 C-60.33599853515625,57.1150016784668 -52.849998474121094,34.32899856567383 -52.849998474121094,34.32899856567383 C-50.154998779296875,26.534000396728516 -53.150001525878906,17.839000701904297 -59.737998962402344,12.743000030517578 C-59.737998962402344,12.743000030517578 -79.20099639892578,-1.3489999771118164 -79.20099639892578,-1.3489999771118164 C-94.1729965209961,-12.442000389099121 -86.38700103759766,-36.12699890136719 -67.8219985961914,-36.12699890136719 C-67.8219985961914,-36.12699890136719 -43.867000579833984,-36.12699890136719 -43.867000579833984,-36.12699890136719 C-35.483001708984375,-36.12699890136719 -28.297000885009766,-41.52399826049805 -25.601999282836914,-49.319000244140625 C-25.601999282836914,-49.319000244140625 -18.115999221801758,-72.1050033569336 -18.115999221801758,-72.1050033569336 C-12.72599983215332,-89.79399871826172 12.427000045776367,-89.79399871826172 18.115999221801758,-72.1050033569336z">
                                                        </path>
                                                    </g>
                                                    <g opacity="1" transform="matrix(1,0,0,1,101.6729965209961,97.29399871826172)">
                                                        <path strokeLinecap="butt" strokeLinejoin="miter" fillOpacity="0" strokeMiterlimit="10"
                                                            stroke="rgb(177,134,250)" strokeOpacity="1" strokeWidth="2"
                                                            d=" M18.115999221801758,-72.1050033569336 C18.115999221801758,-72.1050033569336 25.60099983215332,-49.319000244140625 25.60099983215332,-49.319000244140625 C28.297000885009766,-41.52399826049805 35.483001708984375,-36.12699890136719 43.867000579833984,-36.12699890136719 C43.867000579833984,-36.12699890136719 67.8219985961914,-36.12699890136719 67.8219985961914,-36.12699890136719 C86.38700103759766,-36.12699890136719 94.1729965209961,-12.442000389099121 79.20099639892578,-1.3489999771118164 C79.20099639892578,-1.3489999771118164 59.73699951171875,13.041000366210938 59.73699951171875,13.041000366210938 C53.150001525878906,17.839000701904297 50.154998779296875,26.534000396728516 52.849998474121094,34.62799835205078 C52.849998474121094,34.62799835205078 60.33700180053711,57.415000915527344 60.33700180053711,57.415000915527344 C66.0250015258789,75.10299682617188 45.9640007019043,89.79399871826172 30.691999435424805,79.0009994506836 C30.691999435424805,79.0009994506836 11.227999687194824,64.61000061035156 11.227999687194824,64.61000061035156 C4.640999794006348,59.8129997253418 -4.640999794006348,59.8129997253418 -11.229000091552734,64.61000061035156 C-11.229000091552734,64.61000061035156 -30.691999435424805,78.7020034790039 -30.691999435424805,78.7020034790039 C-45.66400146484375,89.79399871826172 -66.0260009765625,74.8030014038086 -60.33700180053711,57.1150016784668 C-60.33700180053711,57.1150016784668 -52.849998474121094,34.32899856567383 -52.849998474121094,34.32899856567383 C-50.154998779296875,26.534000396728516 -53.150001525878906,17.839000701904297 -59.737998962402344,12.741999626159668 C-59.737998962402344,12.741999626159668 -79.20099639892578,-1.3489999771118164 -79.20099639892578,-1.3489999771118164 C-94.1729965209961,-12.442000389099121 -86.38700103759766,-36.12699890136719 -67.8219985961914,-36.12699890136719 C-67.8219985961914,-36.12699890136719 -43.867000579833984,-36.12699890136719 -43.867000579833984,-36.12699890136719 C-35.483001708984375,-36.12699890136719 -28.297000885009766,-41.52399826049805 -25.601999282836914,-49.319000244140625 C-25.601999282836914,-49.319000244140625 -18.115999221801758,-72.1050033569336 -18.115999221801758,-72.1050033569336 C-12.72599983215332,-89.79399871826172 12.427000045776367,-89.79399871826172 18.115999221801758,-72.1050033569336z">
                                                        </path>
                                                    </g>
                                                </g>
                                                <g clipPath="url(#__lottie_element_469)" style={{ display: "none" }}>
                                                    <g style={{ display: "none" }}>
                                                        <g>
                                                            <path></path>
                                                        </g>
                                                        <g>
                                                            <path strokeLinecap="butt" strokeLinejoin="miter" fillOpacity="0" strokeMiterlimit="10">
                                                            </path>
                                                        </g>
                                                    </g>
                                                    <g style={{ display: "none" }}>
                                                        <g>
                                                            <path></path>
                                                        </g>
                                                    </g>
                                                    <g style={{ display: "none" }}>
                                                        <g>
                                                            <path></path>
                                                        </g>
                                                        <g>
                                                            <path strokeLinecap="butt" strokeLinejoin="miter" fillOpacity="0" strokeMiterlimit="10">
                                                            </path>
                                                        </g>
                                                    </g>
                                                    <g style={{ display: "none" }}>
                                                        <g>
                                                            <path></path>
                                                        </g>
                                                        <g>
                                                            <path></path>
                                                        </g>
                                                        <g>
                                                            <path></path>
                                                        </g>
                                                    </g>
                                                    <g style={{ display: "none" }}>
                                                        <g>
                                                            <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                strokeMiterlimit="10"></path>
                                                        </g>
                                                    </g>
                                                    <g clipPath="url(#__lottie_element_501)" style={{ display: "none" }}>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path></path>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                    <g clipPath="url(#__lottie_element_473)" style={{ display: "none" }}>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path></path>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "none" }}>
                                                            <g>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                                <g style={{ display: "block" }}
                                                    transform="matrix(1.0199999809265137,0,0,1.0199999809265137,55.04655456542969,65.89812469482422)"
                                                    opacity="1">
                                                    <g opacity="1" transform="matrix(1,0,0,1,101.90699768066406,96.61299896240234)">
                                                        <path fill="rgb(42,24,70)" fillOpacity="1"
                                                            d=" M18.115999221801758,-72.1050033569336 C18.115999221801758,-72.1050033569336 25.601999282836914,-49.319000244140625 25.601999282836914,-49.319000244140625 C28.297000885009766,-41.52399826049805 35.483001708984375,-36.12699890136719 43.86800003051758,-36.12699890136719 C43.86800003051758,-36.12699890136719 67.8219985961914,-36.12699890136719 67.8219985961914,-36.12699890136719 C86.38700103759766,-36.12699890136719 94.1729965209961,-12.442000389099121 79.20099639892578,-1.3489999771118164 C79.20099639892578,-1.3489999771118164 59.737998962402344,13.041000366210938 59.737998962402344,13.041000366210938 C53.150001525878906,17.839000701904297 50.15599822998047,26.534000396728516 52.849998474121094,34.62799835205078 C52.849998474121094,34.62799835205078 60.33700180053711,57.415000915527344 60.33700180053711,57.415000915527344 C66.0260009765625,75.10399627685547 45.9640007019043,89.79399871826172 30.691999435424805,79.0009994506836 C30.691999435424805,79.0009994506836 11.229000091552734,64.61000061035156 11.229000091552734,64.61000061035156 C4.640999794006348,59.8129997253418 -4.640999794006348,59.8129997253418 -11.229000091552734,64.61000061035156 C-11.229000091552734,64.61000061035156 -30.691999435424805,78.7020034790039 -30.691999435424805,78.7020034790039 C-45.66400146484375,89.79399871826172 -66.0260009765625,74.8030014038086 -60.33599853515625,57.1150016784668 C-60.33599853515625,57.1150016784668 -52.849998474121094,34.32899856567383 -52.849998474121094,34.32899856567383 C-50.154998779296875,26.534000396728516 -53.150001525878906,17.839000701904297 -59.737998962402344,12.743000030517578 C-59.737998962402344,12.743000030517578 -79.20099639892578,-1.3489999771118164 -79.20099639892578,-1.3489999771118164 C-94.1729965209961,-12.442000389099121 -86.38700103759766,-36.12699890136719 -67.8219985961914,-36.12699890136719 C-67.8219985961914,-36.12699890136719 -43.867000579833984,-36.12699890136719 -43.867000579833984,-36.12699890136719 C-35.483001708984375,-36.12699890136719 -28.297000885009766,-41.52399826049805 -25.601999282836914,-49.319000244140625 C-25.601999282836914,-49.319000244140625 -18.115999221801758,-72.1050033569336 -18.115999221801758,-72.1050033569336 C-12.72599983215332,-89.79399871826172 12.427000045776367,-89.79399871826172 18.115999221801758,-72.1050033569336z">
                                                        </path>
                                                    </g>
                                                    <g opacity="1" transform="matrix(1,0,0,1,101.6729965209961,97.29399871826172)">
                                                        <path strokeLinecap="butt" strokeLinejoin="miter" fillOpacity="0" strokeMiterlimit="10"
                                                            stroke="rgb(177,134,250)" strokeOpacity="1" strokeWidth="2"
                                                            d=" M18.115999221801758,-72.1050033569336 C18.115999221801758,-72.1050033569336 25.60099983215332,-49.319000244140625 25.60099983215332,-49.319000244140625 C28.297000885009766,-41.52399826049805 35.483001708984375,-36.12699890136719 43.867000579833984,-36.12699890136719 C43.867000579833984,-36.12699890136719 67.8219985961914,-36.12699890136719 67.8219985961914,-36.12699890136719 C86.38700103759766,-36.12699890136719 94.1729965209961,-12.442000389099121 79.20099639892578,-1.3489999771118164 C79.20099639892578,-1.3489999771118164 59.73699951171875,13.041000366210938 59.73699951171875,13.041000366210938 C53.150001525878906,17.839000701904297 50.154998779296875,26.534000396728516 52.849998474121094,34.62799835205078 C52.849998474121094,34.62799835205078 60.33700180053711,57.415000915527344 60.33700180053711,57.415000915527344 C66.0250015258789,75.10299682617188 45.9640007019043,89.79399871826172 30.691999435424805,79.0009994506836 C30.691999435424805,79.0009994506836 11.227999687194824,64.61000061035156 11.227999687194824,64.61000061035156 C4.640999794006348,59.8129997253418 -4.640999794006348,59.8129997253418 -11.229000091552734,64.61000061035156 C-11.229000091552734,64.61000061035156 -30.691999435424805,78.7020034790039 -30.691999435424805,78.7020034790039 C-45.66400146484375,89.79399871826172 -66.0260009765625,74.8030014038086 -60.33700180053711,57.1150016784668 C-60.33700180053711,57.1150016784668 -52.849998474121094,34.32899856567383 -52.849998474121094,34.32899856567383 C-50.154998779296875,26.534000396728516 -53.150001525878906,17.839000701904297 -59.737998962402344,12.741999626159668 C-59.737998962402344,12.741999626159668 -79.20099639892578,-1.3489999771118164 -79.20099639892578,-1.3489999771118164 C-94.1729965209961,-12.442000389099121 -86.38700103759766,-36.12699890136719 -67.8219985961914,-36.12699890136719 C-67.8219985961914,-36.12699890136719 -43.867000579833984,-36.12699890136719 -43.867000579833984,-36.12699890136719 C-35.483001708984375,-36.12699890136719 -28.297000885009766,-41.52399826049805 -25.601999282836914,-49.319000244140625 C-25.601999282836914,-49.319000244140625 -18.115999221801758,-72.1050033569336 -18.115999221801758,-72.1050033569336 C-12.72599983215332,-89.79399871826172 12.427000045776367,-89.79399871826172 18.115999221801758,-72.1050033569336z">
                                                        </path>
                                                    </g>
                                                </g>
                                                <g clipPath="url(#__lottie_element_391)" style={{ display: "block" }}
                                                    transform="matrix(1,0,0,1,20,15)" opacity="1">
                                                    <g style={{ display: "block" }}
                                                        transform="matrix(1.0199999809265137,0,0,1.0199999809265137,34.04655456542969,49.89812469482422)"
                                                        opacity="1">
                                                        <g opacity="1" transform="matrix(1,0,0,1,101.90699768066406,96.61299896240234)">
                                                            <path fill="rgb(42,24,70)" fillOpacity="1"
                                                                d=" M18.115999221801758,-72.1050033569336 C18.115999221801758,-72.1050033569336 25.601999282836914,-49.319000244140625 25.601999282836914,-49.319000244140625 C28.297000885009766,-41.52399826049805 35.483001708984375,-36.12699890136719 43.86800003051758,-36.12699890136719 C43.86800003051758,-36.12699890136719 67.8219985961914,-36.12699890136719 67.8219985961914,-36.12699890136719 C86.38700103759766,-36.12699890136719 94.1729965209961,-12.442000389099121 79.20099639892578,-1.3489999771118164 C79.20099639892578,-1.3489999771118164 59.737998962402344,13.041000366210938 59.737998962402344,13.041000366210938 C53.150001525878906,17.839000701904297 50.15599822998047,26.534000396728516 52.849998474121094,34.62799835205078 C52.849998474121094,34.62799835205078 60.33700180053711,57.415000915527344 60.33700180053711,57.415000915527344 C66.0260009765625,75.10399627685547 45.9640007019043,89.79399871826172 30.691999435424805,79.0009994506836 C30.691999435424805,79.0009994506836 11.229000091552734,64.61000061035156 11.229000091552734,64.61000061035156 C4.640999794006348,59.8129997253418 -4.640999794006348,59.8129997253418 -11.229000091552734,64.61000061035156 C-11.229000091552734,64.61000061035156 -30.691999435424805,78.7020034790039 -30.691999435424805,78.7020034790039 C-45.66400146484375,89.79399871826172 -66.0260009765625,74.8030014038086 -60.33599853515625,57.1150016784668 C-60.33599853515625,57.1150016784668 -52.849998474121094,34.32899856567383 -52.849998474121094,34.32899856567383 C-50.154998779296875,26.534000396728516 -53.150001525878906,17.839000701904297 -59.737998962402344,12.743000030517578 C-59.737998962402344,12.743000030517578 -79.20099639892578,-1.3489999771118164 -79.20099639892578,-1.3489999771118164 C-94.1729965209961,-12.442000389099121 -86.38700103759766,-36.12699890136719 -67.8219985961914,-36.12699890136719 C-67.8219985961914,-36.12699890136719 -43.867000579833984,-36.12699890136719 -43.867000579833984,-36.12699890136719 C-35.483001708984375,-36.12699890136719 -28.297000885009766,-41.52399826049805 -25.601999282836914,-49.319000244140625 C-25.601999282836914,-49.319000244140625 -18.115999221801758,-72.1050033569336 -18.115999221801758,-72.1050033569336 C-12.72599983215332,-89.79399871826172 12.427000045776367,-89.79399871826172 18.115999221801758,-72.1050033569336z">
                                                            </path>
                                                        </g>
                                                        <g opacity="1" transform="matrix(1,0,0,1,101.6729965209961,97.29399871826172)">
                                                            <path strokeLinecap="butt" strokeLinejoin="miter" fillOpacity="0" strokeMiterlimit="10"
                                                                stroke="rgb(177,134,250)" strokeOpacity="1" strokeWidth="2"
                                                                d=" M18.115999221801758,-72.1050033569336 C18.115999221801758,-72.1050033569336 25.60099983215332,-49.319000244140625 25.60099983215332,-49.319000244140625 C28.297000885009766,-41.52399826049805 35.483001708984375,-36.12699890136719 43.867000579833984,-36.12699890136719 C43.867000579833984,-36.12699890136719 67.8219985961914,-36.12699890136719 67.8219985961914,-36.12699890136719 C86.38700103759766,-36.12699890136719 94.1729965209961,-12.442000389099121 79.20099639892578,-1.3489999771118164 C79.20099639892578,-1.3489999771118164 59.73699951171875,13.041000366210938 59.73699951171875,13.041000366210938 C53.150001525878906,17.839000701904297 50.154998779296875,26.534000396728516 52.849998474121094,34.62799835205078 C52.849998474121094,34.62799835205078 60.33700180053711,57.415000915527344 60.33700180053711,57.415000915527344 C66.0250015258789,75.10299682617188 45.9640007019043,89.79399871826172 30.691999435424805,79.0009994506836 C30.691999435424805,79.0009994506836 11.227999687194824,64.61000061035156 11.227999687194824,64.61000061035156 C4.640999794006348,59.8129997253418 -4.640999794006348,59.8129997253418 -11.229000091552734,64.61000061035156 C-11.229000091552734,64.61000061035156 -30.691999435424805,78.7020034790039 -30.691999435424805,78.7020034790039 C-45.66400146484375,89.79399871826172 -66.0260009765625,74.8030014038086 -60.33700180053711,57.1150016784668 C-60.33700180053711,57.1150016784668 -52.849998474121094,34.32899856567383 -52.849998474121094,34.32899856567383 C-50.154998779296875,26.534000396728516 -53.150001525878906,17.839000701904297 -59.737998962402344,12.741999626159668 C-59.737998962402344,12.741999626159668 -79.20099639892578,-1.3489999771118164 -79.20099639892578,-1.3489999771118164 C-94.1729965209961,-12.442000389099121 -86.38700103759766,-36.12699890136719 -67.8219985961914,-36.12699890136719 C-67.8219985961914,-36.12699890136719 -43.867000579833984,-36.12699890136719 -43.867000579833984,-36.12699890136719 C-35.483001708984375,-36.12699890136719 -28.297000885009766,-41.52399826049805 -25.601999282836914,-49.319000244140625 C-25.601999282836914,-49.319000244140625 -18.115999221801758,-72.1050033569336 -18.115999221801758,-72.1050033569336 C-12.72599983215332,-89.79399871826172 12.427000045776367,-89.79399871826172 18.115999221801758,-72.1050033569336z">
                                                            </path>
                                                        </g>
                                                    </g>
                                                    <g style={{ display: "none" }}>
                                                        <g>
                                                            <path></path>
                                                        </g>
                                                    </g>
                                                    <g style={{ display: "none" }}>
                                                        <g>
                                                            <path></path>
                                                        </g>
                                                        <g>
                                                            <path strokeLinecap="butt" strokeLinejoin="miter" fillOpacity="0" strokeMiterlimit="10">
                                                            </path>
                                                        </g>
                                                    </g>
                                                    <g style={{ display: "block" }} transform="matrix(1,0,0,1,70.84500122070312,81.51599884033203)"
                                                        opacity="1">
                                                        <g opacity="1" transform="matrix(0,0,0,0,113.9260025024414,12.75)">
                                                            <path fill="rgb(255,255,255)" fillOpacity="1"
                                                                d=" M0,-18.5 C2.815000057220459,-9.355999946594238 8.670999526977539,-2.878000020980835 18,0 C8.670999526977539,2.878000020980835 2.815000057220459,9.355999946594238 0,18.5 C-2.812999963760376,9.355999946594238 -8.670999526977539,2.878000020980835 -18,0 C-8.670999526977539,-2.878000020980835 -2.812999963760376,-9.354999542236328 0,-18.5z">
                                                            </path>
                                                        </g>
                                                        <g opacity="1"
                                                            transform="matrix(0.00010861643386306241,0,0,0.00010861643386306241,14.795000076293945,74.05400085449219)">
                                                            <path fill="rgb(255,255,255)" fillOpacity="1"
                                                                d=" M0.0010000000474974513,-14.949000358581543 C2.2760000228881836,-7.559999942779541 7.006999969482422,-2.325000047683716 14.545999526977539,0 C7.006999969482422,2.3259999752044678 2.2760000228881836,7.560999870300293 0.0010000000474974513,14.949000358581543 C-2.2720000743865967,7.560999870300293 -7.006999969482422,2.3259999752044678 -14.545999526977539,0 C-7.006999969482422,-2.325000047683716 -2.2720000743865967,-7.559000015258789 0.0010000000474974513,-14.949000358581543z">
                                                            </path>
                                                        </g>
                                                        <g opacity="1" transform="matrix(0,0,0,0,125.29499816894531,104.05400085449219)">
                                                            <path fill="rgb(255,255,255)" fillOpacity="1"
                                                                d=" M0.0010000000474974513,-12.225000381469727 C1.8609999418258667,-6.182000160217285 5.730000019073486,-1.9010000228881836 11.895000457763672,0.0010000000474974513 C5.730000019073486,1.902999997138977 1.8609999418258667,6.183000087738037 0.0010000000474974513,12.225000381469727 C-1.8569999933242798,6.182000160217285 -5.729000091552734,1.902999997138977 -11.895000457763672,0.0010000000474974513 C-5.729000091552734,-1.9010000228881836 -1.8569999933242798,-6.182000160217285 0.0010000000474974513,-12.225000381469727z">
                                                            </path>
                                                        </g>
                                                    </g>
                                                    <g style={{ display: "block" }} transform="matrix(0,0,0,0,137.7530059814453,144.13800048828125)"
                                                        opacity="1">
                                                        <g opacity="1" transform="matrix(1,0,0,1,101.6729965209961,97.29399871826172)">
                                                            <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0" strokeMiterlimit="10"
                                                                stroke="rgb(255,255,255)" strokeOpacity="1" strokeWidth="3" d="M0 0"></path>
                                                        </g>
                                                    </g>
                                                    <g clipPath="url(#__lottie_element_423)" style={{ display: "block" }}
                                                        transform="matrix(1,0,0,1,0,0)" opacity="1">
                                                        <g style={{ display: "block" }} transform="matrix(1,0,0,1,137.5,135)" opacity="1">
                                                            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4" stroke="rgb(255,255,255)" strokeOpacity="1" strokeWidth="6"
                                                                    d="M0 0"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "block" }} transform="matrix(0,1,-1,0,140.63099670410156,138.59300231933594)"
                                                            opacity="1">
                                                            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4" stroke="rgb(255,255,255)" strokeOpacity="1" strokeWidth="6"
                                                                    d="M0 0"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "block" }} transform="matrix(0,-1,1,0,135.40699768066406,136.63099670410156)"
                                                            opacity="1">
                                                            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4" stroke="rgb(255,255,255)" strokeOpacity="1" strokeWidth="6"
                                                                    d="M0 0"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "block" }} transform="matrix(1,0,0,1,139,380)" opacity="1">
                                                            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4" stroke="rgb(255,255,255)" strokeOpacity="1" strokeWidth="6"
                                                                    d="M0 0"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "block" }}
                                                            transform="matrix(0.7071067690849304,0.7071067690849304,-0.7071067690849304,0.7071067690849304,-37.75764083862305,317.2760009765625)"
                                                            opacity="1">
                                                            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                                                <path fill="rgb(255,0,0)" fillOpacity="1" d="M0 0">
                                                                </path>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4" stroke="rgb(255,255,255)" strokeOpacity="1" strokeWidth="6"
                                                                    d="M0 0"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "block" }}
                                                            transform="matrix(0.7071067690849304,-0.7071067690849304,0.7071067690849304,0.7071067690849304,313.1829833984375,309.3886413574219)"
                                                            opacity="1">
                                                            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4" stroke="rgb(255,255,255)" strokeOpacity="1" strokeWidth="6"
                                                                    d="M0 0"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "block" }}
                                                            transform="matrix(0.7071067690849304,0.7071067690849304,-0.7071067690849304,0.7071067690849304,140.2423553466797,134.77598571777344)"
                                                            opacity="1">
                                                            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4" stroke="rgb(255,255,255)" strokeOpacity="1" strokeWidth="6"
                                                                    d="M0 0"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "block" }}
                                                            transform="matrix(0.7071067690849304,-0.7071067690849304,0.7071067690849304,0.7071067690849304,133.6829833984375,133.88864135742188)"
                                                            opacity="1">
                                                            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4" stroke="rgb(255,255,255)" strokeOpacity="1" strokeWidth="6"
                                                                    d="M0 0"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                    <g clipPath="url(#__lottie_element_395)" style={{ display: "block" }}
                                                        transform="matrix(0.9205048680305481,0.3907311260700226,-0.3907311260700226,0.9205048680305481,64.65611267089844,-42.794952392578125)"
                                                        opacity="1">
                                                        <g style={{ display: "block" }}
                                                            transform="matrix(0.7071067690849304,-0.7071067690849304,0.7071067690849304,0.7071067690849304,133.6829833984375,133.88864135742188)"
                                                            opacity="1">
                                                            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4" stroke="rgb(236,197,80)" strokeOpacity="1" strokeWidth="6"
                                                                    d="M0 0"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "block" }}
                                                            transform="matrix(0.7071067690849304,0.7071067690849304,-0.7071067690849304,0.7071067690849304,140.2423553466797,134.77598571777344)"
                                                            opacity="1">
                                                            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4" stroke="rgb(236,197,80)" strokeOpacity="1" strokeWidth="6"
                                                                    d="M0 0"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "block" }}
                                                            transform="matrix(0.7071067690849304,-0.7071067690849304,0.7071067690849304,0.7071067690849304,313.1829833984375,309.3886413574219)"
                                                            opacity="1">
                                                            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4" stroke="rgb(236,197,80)" strokeOpacity="1" strokeWidth="6"
                                                                    d="M0 0"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "block" }}
                                                            transform="matrix(0.7071067690849304,0.7071067690849304,-0.7071067690849304,0.7071067690849304,-37.75764083862305,317.2760009765625)"
                                                            opacity="1">
                                                            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                                                <path fill="rgb(255,0,0)" fillOpacity="1" d="M0 0">
                                                                </path>
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4" stroke="rgb(236,197,80)" strokeOpacity="1" strokeWidth="6"
                                                                    d="M0 0"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "block" }} transform="matrix(1,0,0,1,139,380)" opacity="1">
                                                            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4" stroke="rgb(236,197,80)" strokeOpacity="1" strokeWidth="6"
                                                                    d="M0 0"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "block" }} transform="matrix(0,-1,1,0,135.40699768066406,136.63099670410156)"
                                                            opacity="1">
                                                            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4" stroke="rgb(236,197,80)" strokeOpacity="1" strokeWidth="6"
                                                                    d="M0 0"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "block" }} transform="matrix(0,1,-1,0,140.63099670410156,138.59300231933594)"
                                                            opacity="1">
                                                            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4" stroke="rgb(236,197,80)" strokeOpacity="1" strokeWidth="6"
                                                                    d="M0 0"></path>
                                                            </g>
                                                        </g>
                                                        <g style={{ display: "block" }} transform="matrix(1,0,0,1,137.5,135)" opacity="1">
                                                            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                                                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                                                    strokeMiterlimit="4" stroke="rgb(236,197,80)" strokeOpacity="1" strokeWidth="6"
                                                                    d="M0 0"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                        </div>
                                    </div>
                                    <div className="words" id="wordcount">
                                        <span>
                                            <h6>WORDS</h6>
                                            <p><strong>20</strong> /20</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Editor;