import '../CSS/Editor.css';
import React, { useEffect, useRef, useState } from "react";
import lottie from 'lottie-web';
import animationData from '../Animations/fantastic.json';
import contagem from "../Animations/contagem.json";
import contagemAU from "../Sounds/contagem.mp3";
import { Socket } from 'socket.io-client';
import GameStartSetting from '../Components/GameStartSetting';

type Props = {
    CurrentLevel: number;
    UpNext: number;
    LevelRanking: { [username: string]: number };
    TotalRanking: { [username: string]: number };
    PageChanger: (page: string) => void;
    SetLevelFinished: React.Dispatch<React.SetStateAction<boolean>>;
    Socket: Socket;
    Streamer: string;
}

const Scoreboard = (Props: Props) => {

    const contagemSound = new Audio(contagemAU);

    const containerRef = useRef<HTMLDivElement>(null);
    const countdownRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<HTMLDivElement>(null);
    const countdownClassRef = useRef<HTMLDivElement>(null);
    const [countdownHidden, setCountdownHidden] = useState(true);
    const [gSettingState, setGSettingState] = useState(true);

    const resize = () => {
        const contentTop = document.getElementById("contentTop");
        const countdownScale = document.getElementById("countdownScale");
        const setting = document.getElementById("configPopupGame");

        if (contentTop && setting) {
            const maxWidth = contentTop.clientWidth;
            const maxHeight = contentTop.clientHeight;
            const width = window.innerWidth;
            const height = window.innerHeight;
            const isMax = width >= maxWidth! && height >= maxHeight!;
            const scale = Math.min(width / maxWidth!, height / maxHeight!);
            contentTop.style.transform = isMax ? '' : 'scale(' + scale + ')';
            countdownScale!.style.transform = isMax ? '' : 'scale(' + scale + ')';
            setting.style.transform = isMax ? '' : 'scale(' + scale + ')';
        }
    }

    const changeGSettingState = () => {
        setGSettingState(!gSettingState);
    }

    const getScoreJSX = (ranking: { [key: string]: number }): JSX.Element[] => {
        const levelRanking: JSX.Element[] = [];
        let levelRankingCount = 1;

        for (const [key, value] of Object.entries(ranking)) {
            levelRanking.push(
                <li key={'Score' + key}>
                    <span className="pos">{levelRankingCount}</span>
                    <span className={`nick${key.toLowerCase() === Props.Streamer.toLowerCase() ? " streamer" : ""}`}>{key}</span>
                    <span className="pts">{value}</span>
                </li>
            );
            levelRankingCount++;
        }
        return levelRanking;
    }

  const triggerCountdown = () => {
        Props.Socket.emit("continue");
        setCountdownHidden(false);

        if (countdownRef.current) {
            contagemSound.play();
            const animation = lottie.loadAnimation({
                container: countdownRef.current,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                animationData: contagem,
            });

            setTimeout(() => {
                countdownClassRef.current!.className = "countdown popup-enter-done";
            }, 1000);

            animation.addEventListener('complete', () => {
                animation.removeEventListener('complete');
                if (countdownClassRef.current && animationRef.current) {
                    countdownClassRef.current.className = "countdown popup-exit popup-exit-active";
                    animationRef.current.className = "interval fade-exit fade-exit-active";
                    setTimeout(() => Props.PageChanger("Play"), 230);
                }
            });
        }
    }

    useEffect(() => {
        Props.SetLevelFinished(false);
        resize();
        window.addEventListener('resize', resize);

        setTimeout(() => {
            if (animationRef.current) {
                animationRef.current.className = "interval fade-enter-done";
            }
        }, 1000);

        if (containerRef.current) {
            lottie.loadAnimation({
                container: containerRef.current,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                animationData
            })
        }

        Props.Socket.on('continueCommand', () => {
            triggerCountdown();
        });

        return () => {
          window.removeEventListener('resize', resize);
          Props.Socket.off('continueCommand');
        }
    }, []);

    const triggerExit = () => {
        if (animationRef.current) {
            animationRef.current.className = "interval fade-exit fade-exit-active";
            setTimeout(() => Props.PageChanger("GameStart"), 230);
        }
    }

    // interval fade-enter-done

    return (
        <div id="root1">
            <div id="contentTop" style={{ transform: "scale(0.259338)" }}>
                <div className="content">
                    <div className="interval fade-enter fade-enter-active" ref={animationRef}>
                        <header>
                            <span className="wos"></span>
                            <div className="levelUp">
                                <div className="lottie" ref={containerRef}></div>
                                <span id="UpNext">UP NEXT: <strong>LEVEL {Props.UpNext}</strong></span>
                            </div>
                            <div className="rightHeader">
                                <button className="config" title="Settings" onClick={changeGSettingState}></button>
                            </div>
                        </header>
                        <div className="middle">
                            <div className="rkgPartida">
                                <div className="title">
                                    <h4 id="LevelS"><strong>LEVEL {Props.CurrentLevel} </strong>RANKING</h4>
                                    <button className="reward">REWARD</button>
                                </div>
                                <div className="containerScroll">
                                    <div className="scroll">
                                        <div className="scrollElements">
                                            <ul id="LevelRanking">
                                                {getScoreJSX(Props.LevelRanking)}
                                            </ul>
                                        </div>
                                        <div className="scrollBar">
                                            <div className="scrollTrack" style={{ top: "10px" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="rkgGeral">
                                <div className="title">
                                    <button className="reward">REWARD</button>
                                    <h4><strong>LIFETIME </strong>RANKING</h4>
                                </div>
                                <div className="containerScroll">
                                    <div className="scroll">
                                        <div className="scrollElements">
                                            <ul id="TotalRanking">
                                                {getScoreJSX(Props.TotalRanking)}
                                            </ul>
                                        </div>
                                        <div className="scrollBar">
                                            <div className="scrollTrack" style={{ top: "10px" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="actions">
                            <button className="buttonBlue" onClick={triggerExit}>EXIT</button>
                            <button className="buttonYellow" id="interactionButton" onClick={triggerCountdown}>!CONTINUE</button>
                        </div>
                    </div>
                </div>
                <div className="qrcode">
                    <span>
                        <canvas style={{ height: "150px", width: "150px" }} width="150" height="150"></canvas>
                    </span>
                    <i></i>
                    <div>
                        <p>SCAN THE QR CODE TO JOIN THE GAME</p>
                        <p>ENJOY EXTRA FEATURES!</p>
                    </div>
                </div>
            </div>
            <div>
                {/* COUNTDOWN */}
                <div className="countdown popup-enter popup-enter-active" hidden={countdownHidden} ref={countdownClassRef}>
                    <div className="contentPopup" style={{ transform: "scale(0.396503)" }} id="countdownScale">
                        <div className="lottie" ref={countdownRef}></div>
                    </div>
                </div>
            </div>
            <GameStartSetting hidden={gSettingState} stateChanger={changeGSettingState} Socket={Props.Socket} />
        </div>
    );
}

export default Scoreboard;