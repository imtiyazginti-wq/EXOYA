import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight, Sparkles, Zap, Gift } from "lucide-react";
import gsap from "gsap";
import "./Deal.css";

const DealsHero = () => {
    const heroRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(".deal-event", {
                y: -20,
                opacity: 0,
                duration: 0.6,
                ease: "power3.out",
            })
                .from(
                    ".deal-title-line",
                    {
                        y: 100,
                        opacity: 0,
                        rotateX: 70,
                        stagger: 0.15,
                        duration: 0.8,
                        ease: "power4.out",
                    },
                    "-=0.2"
                )
                .from(
                    ".deal-description",
                    {
                        y: 25,
                        opacity: 0,
                        duration: 0.6,
                    },
                    "-=0.35"
                )
                .from(
                    ".deal-discount",
                    {
                        scale: 0.5,
                        opacity: 0,
                        rotate: -8,
                        duration: 0.7,
                        ease: "back.out(1.7)",
                    },
                    "-=0.25"
                )
                .from(
                    ".deal-button",
                    {
                        y: 25,
                        opacity: 0,
                        duration: 0.5,
                    },
                    "-=0.3"
                )
                .from(
                    ".deal-card",
                    {
                        x: 80,
                        opacity: 0,
                        rotate: 12,
                        duration: 1,
                        ease: "power4.out",
                    },
                    "-=0.7"
                )
                .from(
                    ".deal-feature",
                    {
                        y: 20,
                        opacity: 0,
                        stagger: 0.12,
                        duration: 0.5,
                    },
                    "-=0.4"
                );

            gsap.to(".deal-floating-tag", {
                y: -14,
                rotate: 4,
                duration: 2.2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            gsap.to(".deal-card", {
                y: -8,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            gsap.to(".deal-ring", {
                rotate: 360,
                duration: 18,
                repeat: -1,
                ease: "none",
            });

            gsap.to(".deal-spark", {
                scale: 1.5,
                opacity: 0.25,
                duration: 1.4,
                stagger: 0.25,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="deals-hero" ref={heroRef}>

            {/* BACKGROUND DECORATION */}
            <div className="deal-glow deal-glow-one"></div>
            <div className="deal-glow deal-glow-two"></div>

            <div className="deal-ring deal-ring-one"></div>
            <div className="deal-ring deal-ring-two"></div>

            {/* SPARKS */}
            <span className="deal-spark spark-one">✦</span>
            <span className="deal-spark spark-two">✦</span>
            <span className="deal-spark spark-three">✦</span>
            <span className="deal-spark spark-four">✦</span>

            <div className="deals-hero-container">

                {/* TOP LABEL */}
                <div className="deal-event">
                    <Sparkles size={15} />
                    <span>EXOYA SPECIAL DEALS</span>
                </div>

                <div className="deals-hero-main">

                    {/* LEFT CONTENT */}
                    <div className="deal-content">

                        <span className="deal-mini-title">
                            <Zap size={14} />
                            LIMITED TIME OFFER
                        </span>

                        <div className="deal-heading">
                            <div className="deal-title-line">
                                BIG
                            </div>

                            <div className="deal-title-line deal-gradient-text">
                                SAVINGS
                            </div>

                            <div className="deal-title-line">
                                ARE HERE.
                            </div>
                        </div>

                        <p className="deal-description">
                            Discover exclusive offers,
                            limited-time prices and
                            unbeatable savings across EXOYA.
                        </p>

                        {/* DISCOUNT */}
                        <div className="deal-discount">
                            <span>UP TO</span>
                            <h2>70%</h2>
                            <span>OFF</span>
                        </div>

                        {/* BUTTON */}
                        <button className="deal-button">
                            <span>SHOP DEALS</span>
                            <ArrowUpRight size={19} />
                        </button>

                    </div>

                    {/* RIGHT OFFER CARD */}
                    <div className="deal-visual">

                        <div className="deal-ring deal-ring-card"></div>

                        {/* FLOATING TAG */}
                        <div className="deal-floating-tag">
                            <span>UP TO</span>
                            <strong>70%</strong>
                            <small>OFF</small>
                        </div>

                        {/* MAIN CARD */}
                        <div className="deal-card">

                            <div className="deal-card-top">
                                <span>FLASH OFFER</span>
                                <Zap size={19} />
                            </div>

                            <div className="deal-card-number">
                                70<span>%</span>
                            </div>

                            <h3>OFF</h3>

                            <p>
                                On selected products
                            </p>

                            <div className="deal-card-line"></div>

                            <div className="deal-code">
                                <span>USE CODE</span>
                                <strong>EXOYA70</strong>
                            </div>

                        </div>

                        {/* SMALL FLOATING BADGE */}
                        <div className="deal-limited-card">
                            <Gift size={17} />
                            <span>LIMITED<br />TIME</span>
                        </div>

                    </div>

                </div>

                {/* FEATURES */}
                <div className="deal-features">

                    <div className="deal-feature">
                        <span className="feature-dot"></span>
                        <span>Best Prices</span>
                    </div>

                    <div className="deal-feature">
                        <span className="feature-dot"></span>
                        <span>Limited Stock</span>
                    </div>

                    <div className="deal-feature">
                        <span className="feature-dot"></span>
                        <span>Extra Savings</span>
                    </div>

                    <div className="deal-feature">
                        <span className="feature-dot"></span>
                        <span>Exclusive Deals</span>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default DealsHero;