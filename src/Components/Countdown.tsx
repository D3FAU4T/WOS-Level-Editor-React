import React, { useRef } from "react";
import lottie from "lottie-web";
import axios from "axios";

type Props = {
    Hidden?: boolean;
}

const contagem = await axios.get("https://wos.gg/lotties/contagem.json");

const Countdown = (Props: Props) => {

    console.log("Rendered");

    const containerRef = useRef<HTMLDivElement>(null);

    if (containerRef.current) {
        lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: contagem.data,
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