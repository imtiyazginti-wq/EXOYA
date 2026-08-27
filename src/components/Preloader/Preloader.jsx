import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Preloader.css";

const Preloader = () => {
    const [showPreloader, setShowPreloader] = useState(false);

    const preloaderRef = useRef(null);
    const logoRef = useRef(null);
    const imageRef = useRef(null);
    const textRef = useRef(null);
    const progressRef = useRef(null);
    const percentageRef = useRef(null);

    useEffect(() => {
        const alreadyShown = localStorage.getItem("eunoya_preloader");

        if (alreadyShown === "true") {
            return;
        }

        setShowPreloader(true);

        const progress = {
            value: 0,
        };

        const timeline = gsap.timeline();

        timeline.set(logoRef.current, {
            opacity: 0,
            y: 30,
        });

        timeline.set(imageRef.current, {
            opacity: 0,
            scale: 0.7,
            rotation: -8,
        });

        timeline.set(textRef.current, {
            opacity: 0,
            y: 15,
        });

        timeline.to(logoRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
        });

        timeline.to(
            imageRef.current,
            {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 1,
                ease: "back.out(1.5)",
            },
            "-=0.3"
        );

        timeline.to(
            textRef.current,
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
            },
            "-=0.4"
        );

        timeline.to(progress, {
            value: 100,
            duration: 1.5,
            ease: "power2.inOut",

            onUpdate: () => {
                const value = Math.round(progress.value);

                if (progressRef.current) {
                    progressRef.current.style.width = `${value}%`;
                }

                if (percentageRef.current) {
                    percentageRef.current.textContent = `${value}%`;
                }
            },
        });

        timeline.to(imageRef.current, {
            scale: 1.08,
            duration: 0.4,
            ease: "power2.out",
        });

        timeline.to(preloaderRef.current, {
            yPercent: -100,
            duration: 0.9,
            ease: "power4.inOut",

            onComplete: () => {
                localStorage.setItem("eunoya_preloader", "true");
                setShowPreloader(false);
            },
        });

        return () => {
            timeline.kill();
        };
    }, []);

    if (!showPreloader) {
        return null;
    }

    return (
        <div className="preloader" ref={preloaderRef}>
            <div className="preloader-content">

                <h1 className="preloader-logo" ref={logoRef}>
                    EUNOYA
                </h1>

                <div className="preloader-product">
                    <img
                        ref={imageRef}
                        src="/preloader-product.jpg"
                        alt="Eunoya Product"
                    />
                </div>

                <p className="preloader-tagline" ref={textRef}>
                    DISCOVER • EXPLORE • SHOP
                </p>

                <div className="preloader-loading">

                    <div className="preloader-info">
                        <span>LOADING</span>

                        <span ref={percentageRef}>
                            0%
                        </span>
                    </div>

                    <div className="preloader-progress">
                        <div
                            className="preloader-progress-bar"
                            ref={progressRef}
                        ></div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Preloader;