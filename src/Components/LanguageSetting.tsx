import React from "react";

type Props = {
    ChangeSyncState: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
}

const LanguageSetting = (Props: Props) => {

    const closeLanguageSetting = () => {
        const settings = document.getElementById("languageSetting");
        if (settings) {
            settings.className = "popup popup-exit awards";
            setTimeout(() => {
                settings.hidden = true;
                settings.className = "popup popup-enter-active awards";
            }, 300);
        }
    }

    const handleSyncChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) Props.ChangeSyncState(<span id='syncSwitch'>SYNCING LAST HITS</span>);
        else Props.ChangeSyncState(null);
    }

    return (
        <div className="popup popup-enter-active awards" id="languageSetting" hidden>
            <div className="contentPopup" style={{ transform: "scale(0.297732)" }} id="languagePopup">
                <button className="close" title="Close" id="languageSettingClose" onClick={closeLanguageSetting}></button>
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
                        <input id="sync" title="Enable sync" type="checkbox" onChange={handleSyncChange} />
                        <label htmlFor="sync"></label>
                    </span>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default LanguageSetting;