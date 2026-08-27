// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";


// gsap.registerPlugin(ScrollTrigger);

// const categories = [
//     {
//         id: 1,
//         name: "Smartphones",
//         description: "Power in your pocket",
//         icon: "📱",
//     },
//     {
//         id: 2,
//         name: "Laptops",
//         description: "Create without limits",
//         icon: "💻",
//     },
//     {
//         id: 3,
//         name: "Audio",
//         description: "Hear every detail",
//         icon: "🎧",
//     },
//     {
//         id: 4,
//         name: "Wearables",
//         description: "Technology on you",
//         icon: "⌚",
//     },
//     {
//         id: 5,
//         name: "Gaming",
//         description: "Play beyond limits",
//         icon: "🎮",
//     },
//     {
//         id: 6,
//         name: "Cameras",
//         description: "Capture every moment",
//         icon: "📷",
//     },
// ];

// const CategorySection = () => {
//     const sectionRef = useRef(null);

//     useEffect(() => {
//         const ctx = gsap.context(() => {
//             gsap.from(".category-heading", {
//                 scrollTrigger: {
//                     trigger: ".category-section",
//                     start: "top 80%",
//                 },
//                 y: 50,
//                 opacity: 0,
//                 duration: 0.8,
//             });

//             gsap.from(".category-card", {
//                 scrollTrigger: {
//                     trigger: ".category-grid",
//                     start: "top 80%",
//                 },
//                 y: 60,
//                 opacity: 0,
//                 duration: 0.7,
//                 stagger: 0.12,
//                 ease: "power3.out",
//             });
//         }, sectionRef);

//         return () => ctx.revert();
//     }, []);

//     return (
//         <section
//             className="category-section"
//             ref={sectionRef}
//         >
//             <div className="category-container">

//                 {/* Heading */}

//                 <div className="category-heading">

//                     <div>
//                         <span className="section-label">
//                             EXPLORE EXOYA
//                         </span>

//                         <h2>
//                             Shop by
//                             <span> category.</span>
//                         </h2>
//                     </div>

//                     <p>
//                         Everything you need.
//                         <br />
//                         All in one place.
//                     </p>

//                 </div>

//                 {/* Categories */}

//                 <div className="category-grid">

//                     {categories.map((category) => (
//                         <article
//                             className="category-card"
//                             key={category.id}
//                         >

//                             <div className="category-icon">
//                                 {category.icon}
//                             </div>

//                             <div className="category-info">

//                                 <h3>
//                                     {category.name}
//                                 </h3>

//                                 <p>
//                                     {category.description}
//                                 </p>

//                             </div>

//                             <button className="category-arrow">
//                                 ↗
//                             </button>

//                         </article>
//                     ))}

//                 </div>

//             </div>
//         </section>
//     );
// };

// export default CategorySection;