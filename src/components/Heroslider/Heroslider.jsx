import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import heroSlider from "../../data/heroSlider";
import "./Heroslider.css";

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const sliderRef = useRef(null);
    const imageRef = useRef(null);
    const contentRef = useRef(null);

    const slide = heroSlider[currentSlide];

    // Slide animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.fromTo(
                imageRef.current,
                {
                    x: 80,
                    opacity: 0,
                    scale: 1.08,
                },
                {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.7,
                    ease: "power3.out",
                }
            );

            tl.fromTo(
                contentRef.current.children,
                {
                    x: -30,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: "power3.out",
                },
                "-=0.4"
            );
        }, sliderRef);

        return () => ctx.revert();
    }, [currentSlide]);

    // Next slide
    const nextSlide = () => {
        setCurrentSlide((prev) =>
            prev === heroSlider.length - 1 ? 0 : prev + 1
        );
    };

    // Previous slide
    const previousSlide = () => {
        setCurrentSlide((prev) =>
            prev === 0 ? heroSlider.length - 1 : prev - 1
        );
    };

    // Go to specific slide
    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    // Auto slider
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) =>
                prev === heroSlider.length - 1 ? 0 : prev + 1
            );
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="hero-slider" ref={sliderRef}>
            <div className="hero-slider-container">

                {/* LEFT CONTENT */}
                <div className="hero-slider-content" ref={contentRef}>
                    <span className="hero-accent">
                        {slide.accent}
                    </span>

                    <p className="hero-category">
                        {slide.category}
                    </p>

                    <h1>{slide.title}</h1>

                    <p className="hero-description">
                        {slide.description}
                    </p>
                  
                </div>

                {/* RIGHT IMAGE */}
                <div className="hero-slider-image">
                    <img
                        ref={imageRef}
                        src={slide.image}
                        alt={slide.category}
                    />
                </div>

                {/* ARROWS */}
                <button
                    className="slider-arrow slider-prev"
                    onClick={previousSlide}
                    aria-label="Previous slide"
                >
                    ←
                </button>

                <button
                    className="slider-arrow slider-next"
                    onClick={nextSlide}
                    aria-label="Next slide"
                >
                    →
                </button>

                {/* DOTS */}
                <div className="slider-dots">
                    {heroSlider.map((item, index) => (
                        <button
                            key={item.id}
                            className={
                                index === currentSlide
                                    ? "slider-dot active"
                                    : "slider-dot"
                            }
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to ${item.category}`}
                        />
                    ))}
                </div>

                {/* COUNTER */}
                <div className="hero-counter">
                    {String(currentSlide + 1).padStart(2, "0")}
                    <span>/</span>
                    {String(heroSlider.length).padStart(2, "0")}
                </div>

            </div>
        </section>
    );
};

export default HeroSlider;