import '../CSS/Editor.css';
import React, { useEffect, useRef, useState } from "react";
import lottie from 'lottie-web';
import animationData from '../Animations/fantastic.json';
import contagem from "../Animations/contagem.json";
import Countdown from '../Components/Countdown';

type Props = {
    PageChanger: (page: string) => void;
}

const Scoreboard = (Props: Props) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const countdownRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<HTMLDivElement>(null);
    const countdownClassRef = useRef<HTMLDivElement>(null);
    const [countdownHidden, setCountdownHidden] = useState(true);

    const resize = () => {
        const contentTop = document.getElementById("contentTop");
        const countdownScale = document.getElementById("countdownScale");

        if (contentTop) {
            const maxWidth = contentTop.clientWidth;
            const maxHeight = contentTop.clientHeight;
            const width = window.innerWidth;
            const height = window.innerHeight;
            const isMax = width >= maxWidth! && height >= maxHeight!;
            const scale = Math.min(width / maxWidth!, height / maxHeight!);
            contentTop.style.transform = isMax ? '' : 'scale(' + scale + ')';
            countdownScale!.style.transform = isMax ? '' : 'scale(' + scale + ')';
        }
    }

    useEffect(() => {
        resize();
        window.addEventListener('resize', resize);

        if (containerRef.current) {
            lottie.loadAnimation({
                container: containerRef.current,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                animationData
            })
        }

        if (animationRef.current) {
            setTimeout(() => {
                animationRef.current!.className = "interval fade-enter-done";
            }, 900)
        }

        return () => window.removeEventListener('resize', resize);
    }, []);

    const triggerCountdown = () => {
        setCountdownHidden(false);

        if (countdownRef.current) {
            const animation = lottie.loadAnimation({
                container: countdownRef.current,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                animationData: contagem,
            });

            animation.addEventListener('complete', () => {
                animation.removeEventListener('complete');
                if (countdownClassRef.current && animationRef.current) {
                    countdownClassRef.current.className = "countdown popup-exit";
                    animationRef.current.className = "interval fade-exit fade-exit-active";
                    setTimeout(() => Props.PageChanger("Play"), 230);
                }
            });
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
                                <span id="UpNext">UP NEXT: <strong>LEVEL 7</strong></span>
                            </div>
                            <div className="rightHeader">
                                <button className="config" title="Settings"></button>
                            </div>
                        </header>
                        <div className="middle">
                            <div className="rkgPartida">
                                <div className="title">
                                    <h4 id="LevelS"><strong>LEVEL 4 </strong>RANKING</h4>
                                    <button className="reward">REWARD</button>
                                </div>
                                <div className="containerScroll">
                                    <div className="scroll">
                                        <div className="scrollElements">
                                            <ul id="LevelRanking"></ul>
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
                                    <h4><strong>TOTAL </strong>RANKING</h4>
                                </div>
                                <div className="containerScroll">
                                    <div className="scroll">
                                        <div className="scrollElements">
                                            <ul id="TotalRanking"></ul>
                                        </div>
                                        <div className="scrollBar">
                                            <div className="scrollTrack" style={{ top: "10px" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="actions">
                            <button className="buttonBlue">EXIT</button>
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
        </div>
    );
}

export default Scoreboard;