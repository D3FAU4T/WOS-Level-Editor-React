import React, { useState } from "react";
import { LevelData } from "../Interfaces/LevelData";
import { createJSON } from "./Functions";

type Props = {
    UseEasyMode: boolean;
    SetWords: string;
    SetFakeLetters?: string;
    SetHiddenLetters?: string;
    Reveal: boolean;
    SetLevelNumber: number;
    SetJSON: LevelData;
    SetTotalLocks: number;
    SetExpiredLocks: number;
    SetTime: number;
    SetParentWordsFunction: React.Dispatch<React.SetStateAction<string>>;
    SetParentJSONFunction: React.Dispatch<React.SetStateAction<LevelData>>;
}

const Setting = (Props: Props) => {

    const [settingMode, setSettingMode] = useState(false);

    const handleWordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        Props.SetParentWordsFunction(e.target.value);

        Props.SetParentJSONFunction(createJSON(
            e.target.value.split(' '),
            'd3fau4tbot',
            false,
            Props.Reveal,
            "English",
            Props.SetLevelNumber,
            Props.SetTime,
            Props.SetTotalLocks,
            Props.SetExpiredLocks,
            Props.SetFakeLetters,
            Props.SetHiddenLetters,
        ));
    }

    const handleFakeLettersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        Props.SetParentJSONFunction(createJSON(
            Props.SetWords.split(' '),
            'd3fau4tbot',
            false,
            Props.Reveal,
            "English",
            Props.SetLevelNumber,
            Props.SetTime,
            Props.SetTotalLocks,
            Props.SetExpiredLocks,
            e.target.value,
            Props.SetHiddenLetters,
        ));
    }

    const handleHiddenLettersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        Props.SetParentJSONFunction(createJSON(
            Props.SetWords.split(' '),
            'd3fau4tbot',
            false,
            Props.Reveal,
            "English",
            Props.SetLevelNumber,
            Props.SetTime,
            Props.SetTotalLocks,
            Props.SetExpiredLocks,
            Props.SetFakeLetters,
            e.target.value,
        ));
    }

    const handleRevealChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        Props.SetParentJSONFunction(createJSON(
            Props.SetWords.split(' '),
            'd3fau4tbot',
            false,
            e.target.checked,
            "English",
            Props.SetLevelNumber,
            Props.SetTime,
            Props.SetTotalLocks,
            Props.SetExpiredLocks,
            Props.SetFakeLetters,
            Props.SetHiddenLetters,
        ));
    }

    const increaseLevel = () => {
        Props.SetParentJSONFunction(createJSON(
            Props.SetWords.split(' '),
            'd3fau4tbot',
            false,
            Props.Reveal,
            "English",
            Props.SetLevelNumber + 1,
            Props.SetTime,
            Props.SetTotalLocks,
            Props.SetExpiredLocks,
            Props.SetFakeLetters,
            Props.SetHiddenLetters,
        ));
    }

    const decreaseLevel = () => {
        if (Props.SetLevelNumber === 1) return;
        Props.SetParentJSONFunction(createJSON(
            Props.SetWords.split(' '),
            'd3fau4tbot',
            false,
            Props.Reveal,
            "English",
            Props.SetLevelNumber - 1,
            Props.SetTime,
            Props.SetTotalLocks,
            Props.SetExpiredLocks,
            Props.SetFakeLetters,
            Props.SetHiddenLetters,
        ));
    }

    const increaseTotalLocks = () => {
        Props.SetParentJSONFunction(createJSON(
            Props.SetWords.split(' '),
            'd3fau4tbot',
            false,
            Props.Reveal,
            "English",
            Props.SetLevelNumber,
            Props.SetTime,
            Props.SetTotalLocks + 1,
            Props.SetExpiredLocks,
            Props.SetFakeLetters,
            Props.SetHiddenLetters,
        ));
    }

    const decreaseTotalLocks = () => {
        if (Props.SetTotalLocks === 2) return;
        Props.SetParentJSONFunction(createJSON(
            Props.SetWords.split(' '),
            'd3fau4tbot',
            false,
            Props.Reveal,
            "English",
            Props.SetLevelNumber,
            Props.SetTime,
            Props.SetTotalLocks - 1,
            Props.SetExpiredLocks,
            Props.SetFakeLetters,
            Props.SetHiddenLetters,
        ));
    }

    const increaseExpiredLocks = () => {
        if (Props.SetExpiredLocks === Props.SetTotalLocks) return;
        Props.SetParentJSONFunction(createJSON(
            Props.SetWords.split(' '),
            'd3fau4tbot',
            false,
            Props.Reveal,
            "English",
            Props.SetLevelNumber,
            Props.SetTime,
            Props.SetTotalLocks,
            Props.SetExpiredLocks + 1,
            Props.SetFakeLetters,
            Props.SetHiddenLetters,
        ));
    }

    const decreaseExpiredLocks = () => {
        if (Props.SetExpiredLocks === 0) return;
        Props.SetParentJSONFunction(createJSON(
            Props.SetWords.split(' '),
            'd3fau4tbot',
            false,
            Props.Reveal,
            "English",
            Props.SetLevelNumber,
            Props.SetTime,
            Props.SetTotalLocks,
            Props.SetExpiredLocks - 1,
            Props.SetFakeLetters,
            Props.SetHiddenLetters,
        ));
    }

    const increaseTime = () => {
        if (Props.SetTime === 100) return;
        Props.SetParentJSONFunction(createJSON(
            Props.SetWords.split(' '),
            'd3fau4tbot',
            false,
            Props.Reveal,
            "English",
            Props.SetLevelNumber,
            Props.SetTime + 1,
            Props.SetTotalLocks,
            Props.SetExpiredLocks,
            Props.SetFakeLetters,
            Props.SetHiddenLetters,
        ));
    }

    const decreaseTime = () => {
        if (Props.SetTime === 1) return;
        Props.SetParentJSONFunction(createJSON(
            Props.SetWords.split(' '),
            'd3fau4tbot',
            false,
            Props.Reveal,
            "English",
            Props.SetLevelNumber,
            Props.SetTime - 1,
            Props.SetTotalLocks,
            Props.SetExpiredLocks,
            Props.SetFakeLetters,
            Props.SetHiddenLetters,
        ));
    }

    const handleJSONChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const json: LevelData = JSON.parse(e.target.value);
        Props.SetParentJSONFunction(json);
    }

    const defaultSetting: JSX.Element[] = [
        <h4 id="JSONconfig" key='DefaultSettingH4'>JSON Config</h4>,
        <p id="JSONtxt" key='DefaultSettingP'>Paste the JSON configuration in order to update the board. Example format below.</p>,
        <textarea className="" id="jsoninput" key='DefaultSettingTextArea' value={JSON.stringify(Props.SetJSON, null, 2)} onChange={handleJSONChange}></textarea>,
        <label className="error" key='DefaultSettingErrorLabel'></label>
    ];

    const updatedSettingBottomConfig: JSX.Element[] = [
        <h4 id="wordListTxt" key='UpdatedSettingH4'>Word List</h4>,
        <p id="wordListBelow" key='UpdatedSettingP'>Type words below separated with space. Put a ? to indicate that the word has not been found yet.</p>,
        <input className="" type="text" placeholder="E.g.: demonic demon coined? income? coned" value={Props.SetWords} id="wordlist" key='UpdatedSettingInput' onChange={handleWordsChange} />,
        <label className="error" key='UpdatedSettingErrorLabel'></label>
    ];

    const thirdRow: JSX.Element[] = [
        <span key='SettingThirdRowFakeLetters'>
            <h4 id="fakeLettersTxt">Fake Letters</h4>
            <input className="" type="text" placeholder="E.g.: def" value={Props.SetFakeLetters} id="fakeLetters" onChange={handleFakeLettersChange} />
            <label className="error"></label>
        </span>,
        <span key='SettingThirdRowHiddenLetters'>
            <h4 id="hiddenLettersTxt">Hidden Letters</h4>
            <input className="" type="text" placeholder="E.g.: flt" value={Props.SetHiddenLetters} id="hiddenLetters" onChange={handleHiddenLettersChange} />
            <label className="error"></label>
        </span>,
        <span className="onoff" key='SettingThirdRowRevealSwitch'>
            <h4 id="revealTxt">Reveal</h4>
            <input id="reveal" title="Reveal" type="checkbox" checked={Props.Reveal} onChange={handleRevealChange} />
            <label htmlFor="reveal"></label>
        </span>
    ];

    const fourthRow: JSX.Element[] = [
        <span key='SettingFourthRowLevel'>
            <h4 id="settingLevel">Level</h4>
            <span className="vol">
                <button className="down" id="levelDown" onClick={decreaseLevel}></button>
                <p id="levelNumber">{Props.SetLevelNumber}</p>
                <button className="up" id="levelUp" onClick={increaseLevel}></button>
            </span>
        </span>,
        <span key='SettingFourthRowLocks'>
            <h4 id="settingLocks">Locks</h4>
            <span className="vol">
                <button className="down" id="tLockDown" onClick={decreaseTotalLocks}></button>
                <p id="tLockNumber">{Props.SetTotalLocks}</p>
                <button className="up" id="tLockUp" onClick={increaseTotalLocks}></button>
            </span>
        </span>,
        <span key='SettingFourthRowUnlocked'>
            <h4 id="settingUnlocked">Unlocked</h4>
            <span className="vol">
                <button className="down" id="uLockDown" onClick={decreaseExpiredLocks}></button>
                <p id="uLockNumber">{Props.SetExpiredLocks}</p>
                <button className="up" id="uLockUp" onClick={increaseExpiredLocks}></button>
            </span>
        </span>,
        <span key='SettingFourthRowTime'>
            <h4 id="settingTime">Time</h4>
            <span className="vol">
                <button className="down" id="timebarDown" onClick={decreaseTime}></button>
                <p id="timebarNumber">{Props.SetTime}</p>
                <button className="up" id="timebarUp" onClick={increaseTime}></button>
            </span>
        </span>
    ];

    const closeSettings = () => {
        const settings = document.getElementById("setting");
        if (settings) {
            settings.className = "popup popup-exit awards";
            setTimeout(() => {
                settings.hidden = true;
                settings.className = "popup popup-enter-active awards";
            }, 300);
        }
    }

    const handleSettingMode = () => {
        setSettingMode(!settingMode);
    }

    return (
        <div className="popup popup-enter-active awards" id="setting" hidden>
            <div className="contentPopup" style={{ transform: "scale(0.297732)" }} id="configPopup">
                <button className="close" title="Close" id="settingClose" onClick={closeSettings}></button>
                <h3 id="settingLang">Settings</h3>
                <div className="word-mode">
                    <h4 id="easyMode">Easy Mode</h4>
                    <p id="easyModeText">Don't know how to use JSON? Turn on easy mode and use the UI to customize</p>
                    <span className="onoff">
                        <input id="wordMode" title="Easy Mode Switch" type="checkbox" onChange={handleSettingMode} checked={settingMode} />
                        <label htmlFor="wordMode"></label>
                    </span>
                </div>
                <div className="addCommands" id="bottomConfig" style={{ height: `${settingMode ? "210px" : "420px"}` }}>
                    {settingMode ? updatedSettingBottomConfig : defaultSetting}
                </div>
                <div className="sounds" id="thirdRow">
                    {settingMode ? thirdRow : ""}
                </div>
                <div className="sounds" id="fourthRow">
                    {settingMode ? fourthRow : ""}
                </div>
            </div>
        </div>
    );
}

export default Setting;