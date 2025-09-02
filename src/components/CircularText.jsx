import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CircularText = () => {
    const svgRef = useRef(null);

    useEffect(() => {
        gsap.to(svgRef.current, {
            rotate: 360,
            duration: 20,
            ease: "none",
            repeat: -1,
            transformOrigin: "50% 50%",
        });
    }, []);

    const text = "✦ MERN Developer ✦  WEBSITE  Design ";

    return (
        <div className="circle-wrapper w-[110px] h-[110px] relative flex items-center justify-center tracking-widest">
    <img
        src="/profilepic3.png"
        alt="Santosh Profile"
        className="rounded-full object-cover w-[60px] h-[60px] z-[50] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    />
    <svg
        viewBox="0 0 200 200"
        className="circle-svg absolute top-0 left-0 w-full h-full z-[10]"
        ref={svgRef}
    >
        <defs>
            <path
                id="circularPath"
                d="
                    M 100,100
                    m -70,0
                    a 70,70 0 1,1 140,0
                    a 70,70 0 1,1 -140,0
                "
            />
        </defs>
        <text className="circle-text">
            <textPath href="#circularPath" startOffset="0%">
                {text}
            </textPath>
        </text>
    </svg>
</div>

    );
};

export default CircularText;
