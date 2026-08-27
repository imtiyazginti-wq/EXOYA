// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import "./Hero.css";
// import Phone1 from "../../assets/images/Phone1.png"

// const Hero = () => {
//     const heroRef = useRef(null);

//     useEffect(() => {
//         const ctx = gsap.context(() => {
//             const tl = gsap.timeline({
//                 defaults: {
//                     ease: "power3.out",
//                 },
//             });

//             tl.from(".hero-eyebrow", {
//                 y: 30,
//                 opacity: 0,
//                 duration: 0.7,
//             })
//                 .from(
//                     ".hero-title span",
//                     {
//                         y: 100,
//                         opacity: 0,
//                         duration: 0.9,
//                         stagger: 0.12,
//                     },
//                     "-=0.3"
//                 )
//                 .from(
//                     ".hero-description",
//                     {
//                         y: 25,
//                         opacity: 0,
//                         duration: 0.6,
//                     },
//                     "-=0.4"
//                 )
//                 .from(
//                     ".hero-actions",
//                     {
//                         y: 25,
//                         opacity: 0,
//                         duration: 0.6,
//                     },
//                     "-=0.3"
//                 )
//                 .from(
//                     ".hero-product",
//                     {
//                         scale: 0.8,
//                         opacity: 0,
//                         y: 40,
//                         duration: 1.2,
//                     },
//                     "-=0.7"
//                 )
//                 .from(
//                     ".floating-card",
//                     {
//                         scale: 0.7,
//                         opacity: 0,
//                         duration: 0.6,
//                     },
//                     "-=0.5"
//                 );
//         }, heroRef);

//         return () => ctx.revert();
//     }, []);

//     return (
//         <section className="hero" ref={heroRef}>
//             <div className="hero-glow glow-one"></div>
//             <div className="hero-glow glow-two"></div>

//             <div className="hero-container">

//                 {/* Left Content */}
//                 <div className="hero-content">

//                     <p className="hero-eyebrow">
//                         THE FUTURE OF TECHNOLOGY
//                     </p>

//                     <h1 className="hero-title">
//                         <span>Technology,</span>
//                         <span>Reimagined.</span>
//                     </h1>

//                     <p className="hero-description">
//                         Discover powerful technology designed for
//                         the way you live, work and create.
//                     </p>

//                     <div className="hero-actions">
//                         <button className="primary-btn">
//                             Explore Products
//                             <span>→</span>
//                         </button>

//                         <button className="secondary-btn">
//                             Discover EXOYA
//                         </button>
//                     </div>

//                 </div>

//                 {/* Product */}
//                 <div className="hero-visual">

//                     <div className="product-orbit"></div>

//                     <div className="hero-product">
//                         <div className="product-shine"></div>

//                         <div className="phone">
//                             <div className="phone-camera"></div>
//                             <div className="phone-camera"></div>
//                             <div className="phone-camera"></div>

//                             <div className="phone-screen">
//                                 <span></span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Floating card */}
//                     <div className="floating-card">

//                         <div>
//                             <span className="floating-label">
//                                 EXOYA X1
//                             </span>

//                             <strong>
//                                 Next Generation
//                             </strong>
//                         </div>

//                         <span className="floating-arrow">
//                             ↗
//                         </span>

//                     </div>

//                 </div>

//             </div>

//             <div className="hero-scroll">
//                 <span></span>
//                 Scroll to explore
//             </div>

//         </section>
//     );
// };

// export default Hero;