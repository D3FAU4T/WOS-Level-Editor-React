import React, { useEffect } from "react";
import lottie from "lottie-web";
import animationData from '../Animations/estrela.json';

type Props = {
    Hidden?: boolean;
    SkippedLevels: number;
    CurrentLevel: number;
    TotalWords: number;
    FoundedWords: number;
    PageChanger: (page: string) => void;
}

const Fantastic = (Props: Props) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const fantasticClassRef = React.useRef<HTMLDivElement>(null);

    if (!Props.Hidden && containerRef.current) {
        setTimeout(() => {
            const animation = lottie.loadAnimation({
                container: containerRef.current!,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                animationData,
            });

            setTimeout(() => {
                fantasticClassRef.current!.className = "popup wdone popup-enter-done";
            }, 1000);

            animation.addEventListener('drawnFrame', (event) => {
                if (event.currentTime > (Props.SkippedLevels === 1 ? 20 : Props.SkippedLevels === 2 ? 39 : 58)) {
                    animation.pause();
                    animation.removeEventListener('drawnFrame');
                    setTimeout(() => {
                        fantasticClassRef.current!.className = "popup wdone popup-exit popup-exit-active";
                        setTimeout(() => Props.PageChanger("Scoreboard"), 330);
                    }, 3000)
                }
            });

        }, 600)
    }

    return (
        <div>
            <div className="popup wdone popup-enter popup-enter-active" hidden={Props.Hidden} ref={fantasticClassRef}>
                <div className="brilho"></div>
                <div className="contentPopup" style={{ transform: "scale(0.234405)" }} id="Fantastic">
                    <div className="welldone">
                        <div className="header">
                            <h3>FANTASTIC!</h3>
                            <h5>SKIP <strong>{Props.SkippedLevels} LEVELS!</strong></h5>
                        </div>
                        <div className="middle">
                            <div className="level">
                                <span>
                                    <h6>LEVEL</h6>
                                    <strong>{Props.CurrentLevel}</strong>
                                </span>
                            </div>
                            <div className="center">
                                <div className="lottie" ref={containerRef}></div>
                            </div>
                            <div className="words" id="wordcount">
                                <span>
                                    <h6>WORDS</h6>
                                    <p><strong>{Props.FoundedWords}</strong> /{Props.TotalWords}</p>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Fantastic;