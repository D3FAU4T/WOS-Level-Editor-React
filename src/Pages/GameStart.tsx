import React, { useEffect, useRef, useState } from "react";
import '../CSS/Editor.css';
import lottie from 'lottie-web';
import animationData from '../Animations/logo.json';
import letterJumbleAnimation from '../Animations/homeFind_en.json';
import letterSolveAnimation from '../Animations/homeSolve_en.json';
import letterGuessAnimation from '../Animations/lock_en.json';
import contagem from "../Animations/contagem.json";
import { Socket } from "socket.io-client";

type Props = {
    PageChanger: (page: string) => void;
    Socket: Socket;
    Host: string;
}

const GameStart = (Props: Props) => {

    const logoAnimRef = useRef<HTMLSpanElement>(null);
    const letterJumbleAnimRef = useRef<HTMLSpanElement>(null);
    const letterSolveAnimRef = useRef<HTMLSpanElement>(null);
    const letterGuessAnimRef = useRef<HTMLSpanElement>(null);
    const countdownClassRef = useRef<HTMLDivElement>(null);
    const countdownRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<HTMLDivElement>(null);
    const [step, setStep] = useState(0);
    const [countdownHidden, setCountdownHidden] = useState(true);

    const resize = () => {
        const contentTop = document.getElementById("contentTop");

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

    const startGame = () => {
        Props.Socket.emit("startGame");
        setCountdownHidden(false);

        if (countdownRef.current) {
            const countdown = lottie.loadAnimation({
                container: countdownRef.current,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                animationData: contagem
            });

            setTimeout(() => {
                countdownClassRef.current!.className = "countdown popup-enter-done";
            }, 1000);

            countdown.addEventListener('complete', () => {
                countdown.removeEventListener('complete');
                if (countdownClassRef.current && countdownRef.current) {
                    countdownClassRef.current.className = "countdown popup-exit popup-exit-active";
                    animRef.current!.className = "start fade-exit fade-exit-active";
                    setTimeout(() => Props.PageChanger("Play"), 330);
                }
            });
        }
    }

    const loadAnimations = () => {
        if (logoAnimRef.current && letterJumbleAnimRef.current && letterSolveAnimRef.current && letterGuessAnimRef.current) {
            lottie.loadAnimation({
                container: logoAnimRef.current,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: animationData
            });

            const step0 = lottie.loadAnimation({
                container: letterJumbleAnimRef.current,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                animationData: letterJumbleAnimation
            });

            const step1 = lottie.loadAnimation({
                container: letterSolveAnimRef.current,
                renderer: 'svg',
                loop: false,
                autoplay: false,
                animationData: letterSolveAnimation
            });

            const step2 = lottie.loadAnimation({
                container: letterGuessAnimRef.current,
                renderer: 'svg',
                loop: false,
                autoplay: false,
                animationData: letterGuessAnimation
            });

            // Start with step0
            step0.play();
            setStep(0);

            step0.addEventListener('complete', () => {
                // Go to step1
                setStep(1);
                step1.goToAndPlay(0, true);
            });

            step1.addEventListener('complete', () => {
                // Go to step2
                setStep(2);
                step2.goToAndPlay(0, true);
            });

            step2.addEventListener('complete', () => {
                // Go back to step0
                setStep(0);
                step0.goToAndPlay(0, true);
            });
        }
    };

    useEffect(() => {
        setTimeout(() => {
            if (animRef.current) animRef.current.className = "start fade-enter-done";
        }, 1000)
        loadAnimations();
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    return (
        <div id="root1">
            <div id="contentTop" style={{ transform: "scale(0.314745)" }}>
                <div className="content">
                    <div className="start fade-enter fade-enter-active" ref={animRef}>
                        <header>
                            <button className="config" title="Settings"></button>
                        </header>
                        <div className="center">
                            <div className="logoContent">
                                <span className="logoWos" ref={logoAnimRef}>
                                    {/* WOS LOGO HERE */}
                                </span>
                                <div className="record">
                                    <h3>{Props.Host.toLowerCase()}</h3>
                                    <div className="section">
                                        <span>RECORD</span>
                                    </div>
                                    <p className="">LEVEL WAACS</p>
                                </div>
                            </div>
                            <div className="infosBox">
                                <div>
                                    <h2>HOW TO PLAY</h2>
                                    <div className={`ctt-anim step${step}`}>
                                        <div>
                                            <span ref={letterJumbleAnimRef}></span>
                                            <section>
                                                <p>Find words from mixed letters</p>
                                            </section>
                                        </div>
                                        <div>
                                            <span ref={letterSolveAnimRef}></span>
                                            <section>
                                                <p>Use <strong>the chat </strong>to solve anagrams</p>
                                            </section>
                                        </div>
                                        <div>
                                            <span ref={letterGuessAnimRef}></span>
                                            <section>
                                                <p>Found a word? Guess again when the  <strong>padlock opens</strong></p>
                                            </section>
                                        </div>
                                    </div>
                                    <ul className={`step${step}`}>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="actions">
                            <p>Waiting for the host to start</p>
                            <div>
                                <button className="buttonBlue">LOG OUT</button>
                                <button className="buttonYellow" onClick={startGame}>!START</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="qrcode">
                    <span>
                        <canvas height="150" width="150" style={{ height: "150px", width: "150px" }}></canvas>
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

export default GameStart;