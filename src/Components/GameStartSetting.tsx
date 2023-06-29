import React, { useRef } from "react";
import { Socket } from "socket.io-client";

type Props = {
    hidden: boolean;
    stateChanger: React.Dispatch<React.SetStateAction<boolean>>;
    Socket: Socket;
}

const GameStartSetting = (Props: Props) => {

    const settingDiv = useRef<HTMLDivElement>(null);
    const lNumErr = useRef<HTMLLabelElement>(null);    

    const closeSettings = () => {
        Props.stateChanger(true);
        if (settingDiv.current) {
            settingDiv.current.className = "popup popup-exit awards";
            setTimeout(() => {
                settingDiv.current!.hidden = true;
                settingDiv.current!.className = "popup popup-enter-active awards";
            }, 300);
        }
    }

    const orderedModeSwitch = () => {
        const orderedModeSwitch = document.getElementById("orderModeSwitch") as HTMLInputElement;
        if (orderedModeSwitch) {
            if (orderedModeSwitch.checked) {
                Props.Socket.emit("orderedMode", 1);
            } else {
                Props.Socket.emit("orderedMode", 0);
            }
        }
    }

    const levelInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!lNumErr.current || (event.target.value === "")) return;
        if (isNaN(Number(event.target.value))) lNumErr.current.innerText = "Please type a valid number";
        else {
            lNumErr.current.innerText = "";
            Props.Socket.emit("levelNumber", Number(event.target.value));
        }
    }

    const levelNumber: JSX.Element[] = [
        <h4 id="levelTxt" key='UpdatedSettingH4'>Level</h4>,
        <p id="levelListBelow" key='UpdatedSettingP'>Type the level number that you want to play</p>,
        <input className="" type="text" placeholder="E.g.: 420" id="lNum" key='lNumNumber' onInput={levelInput} />,
        <label className="error" key='lNumNumberError' ref={lNumErr}></label>
    ];

    return (
        <div className="popup popup-enter-active awards" id="settingG" hidden={Props.hidden} ref={settingDiv}>
            <div className="contentPopup" style={{ transform: "scale(0.297732)" }} id="configPopupGame">
                <button className="close" title="Close" id="settingGClose" onClick={closeSettings}></button>
                <h3 id="settingGLang">Settings</h3>
                <div className="word-mode">
                    <h4 id="orderMode">Ordered Mode</h4>
                    <p id="orderModeText">Want to figure out all the levels in this game? Turn on ordered mode.</p>
                    <span className="onoff">
                        <input id="orderModeSwitch" title="Ordered Mode Switch" type="checkbox" onChange={orderedModeSwitch} />
                        <label htmlFor="orderModeSwitch"></label>
                    </span>
                </div>
                <div className="addCommands" id="lNumDiv" style={{ height: `210px` }}>
                    {levelNumber}
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default GameStartSetting;