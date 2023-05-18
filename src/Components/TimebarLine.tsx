import React, { useEffect, useRef } from "react";

type Props = {
    TotalWords: number;
    FoundedWords: number;
    CurrentPoints: number;
    Goal: number;
    Color: "Gold" | "SkyBlue";
}

const TimebarLine = (Props: Props) => {
    const timebarLine = useRef<SVGPathElement>(null);

    useEffect(() => {
        if (timebarLine.current) {
            const totalLength = timebarLine.current.getTotalLength();
            const segmentLength = totalLength / Props.TotalWords;
            timebarLine.current.style.strokeDasharray = `${Props.FoundedWords * segmentLength},${totalLength}`;
            timebarLine.current.style.strokeDashoffset = `${segmentLength}`;
            timebarLine.current.style.stroke = Props.Color === "Gold" ? "rgb(248,195,82)" : "rgb(26,255,238)";
        }
    });

    return (
        <div>
            <div className="lottieMetas">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 430 170" width="430" height="170"
                    style={{ width: "100%", height: "100%", transform: "translate3d(0px, 0px, 0px)" }}
                    preserveAspectRatio="xMidYMid meet">
                    <defs>
                        <clipPath id="__lottie_element_315">
                            <rect width="430" height="170" x="0" y="0"></rect>
                        </clipPath>
                    </defs>
                    <g clipPath="url(#__lottie_element_315)">
                        <g style={{ display: "block" }} transform="matrix(1,0,0,1,-40.52799987792969,-38.06500244140625)"
                            opacity="1">
                            <g opacity="1" transform="matrix(1,0,0,1,231.13299560546875,123)">
                                <path strokeLinecap="butt" strokeLinejoin="miter" fillOpacity="0" strokeMiterlimit="10"
                                    stroke="rgb(52,23,98)" strokeOpacity="1" strokeWidth="20"
                                    d=" M213.0679931640625,73 C213.0679931640625,73 -149.99200439453125,73 -149.99200439453125,73 C-157.6750030517578,73 -164.20799255371094,66.85900115966797 -165.3769989013672,58.54199981689453 C-165.3769989013672,58.54199981689453 -179.6820068359375,-53.356998443603516 -179.6820068359375,-53.356998443603516 C-181.13299560546875,-63.68600082397461 -173.83799743652344,-73 -164.29800415039062,-73 C-164.29800415039062,-73 213.0679931640625,-73 213.0679931640625,-73 C221.66400146484375,-73 228.63299560546875,-65.36599731445312 228.63299560546875,-55.95000076293945 C228.63299560546875,-55.95000076293945 228.63299560546875,55.94900131225586 228.63299560546875,55.94900131225586 C228.63299560546875,65.36599731445312 221.66400146484375,73 213.0679931640625,73z">
                                </path>
                            </g>
                        </g>
                        <g style={{ display: "block" }} transform="matrix(1,0,0,1,-40.52799987792969,-38.06500244140625)"
                            opacity="1">
                            <g opacity="1" transform="matrix(1,0,0,1,231.13299560546875,123)">
                                <path ref={timebarLine} strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0"
                                    strokeMiterlimit="10" stroke="rgb(248,195,82)" strokeOpacity="1" strokeWidth="10"
                                    d=" M-177.88900756835938,-64.26699829101562 C-175.2449951171875,-69.43399810791016 -170.2010040283203,-73 -164.29800415039062,-73 C-164.29800415039062,-73 213.0679931640625,-73 213.0679931640625,-73 C221.66400146484375,-73 228.63299560546875,-65.36599731445312 228.63299560546875,-55.95000076293945 C228.63299560546875,-55.95000076293945 228.63299560546875,55.94900131225586 228.63299560546875,55.94900131225586 C228.63299560546875,65.36599731445312 221.66400146484375,73 213.0679931640625,73 C213.0679931640625,73 213.0679931640625,73 213.0679931640625,73 C213.0679931640625,73 -149.99200439453125,73 -149.99200439453125,73 C-157.6750030517578,73 -164.20799255371094,66.85900115966797 -165.3769989013672,58.54199981689453 C-165.3769989013672,58.54199981689453 -179.6820068359375,-53.356998443603516 -179.6820068359375,-53.356998443603516 C-179.78900146484375,-54.1150016784668 -179.84800720214844,-54.86800003051758 -179.86300659179688,-55.61199951171875">
                                </path>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
        </div>
    );
}

export default TimebarLine;