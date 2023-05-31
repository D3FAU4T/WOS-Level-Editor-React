import React, { useRef } from "react";
import lottie from "lottie-web";
import animationData from "../Animations/contagem.json";

type Props = {
    Hidden?: boolean;
}

const Countdown = (Props: Props) => {

    console.log("Rendered");

    const containerRef = useRef<HTMLDivElement>(null);

    if (containerRef.current) {
        lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData,
        })
    }

    return (
        <div className="countdown popup-enter-done" hidden={Props.Hidden}>
            <div className="contentPopup" style={{ transform: "scale(0.396503)" }} id="countdownScale">
                <div className="lottie" ref={containerRef}></div>
            </div>
        </div>
    );
}

export default Countdown;