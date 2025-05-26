import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const App = () => {
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // GSAP entrance animation
  useGSAP(() => {
    if (isMobile) return;

    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.7) {
          document.querySelector(".svg")?.remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  }, [isMobile]);

  useGSAP(() => {
    if (!showContent || isMobile) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".character", {
      scale: 0.6,
      x: "-50%",
      bottom: "-50%",
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main");
    main?.addEventListener("mousemove", (e) => {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".text", { x: `${xMove}%` });
      gsap.to(".sky", { x: xMove });
      gsap.to(".bg", { x: xMove * 1.7 });
    });
  }, [showContent, isMobile]);

  if (isMobile) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-black text-white text-center px-6">
        <h1 className="text-5xl sm:text-2xl">
          Please switch to a larger device to view this experience.
        </h1>
      </div>
    );
  }

  return (
    <>
      {/* Intro SVG Animation */}
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="150"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {/* Main Content */}
      {showContent && (
        <div className="main w-full bg-black overflow-hidden">
          <div className="landing w-full h-screen bg-black">
            {/* Navbar */}
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-5 sm:py-10 px-5 sm:px-10">
              <div className="logo flex gap-3 sm:gap-5 items-center">
                <div className="lines flex flex-col gap-1 sm:gap-2">
                  <div className="w-6 sm:w-10 h-1 bg-white"></div>
                  <div className="w-5 sm:w-8 h-1 bg-white"></div>
                  <div className="w-3 sm:w-5 h-1 bg-white"></div>
                </div>
                <h3 className="text-2xl sm:text-3xl leading-none text-white">
                  RockStar
                </h3>
              </div>
            </div>

            {/* Background Images */}
            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img
                className="absolute sky top-0 left-0 w-full h-full object-cover"
                src="./sky.png"
                alt=""
              />
              <img
                className="absolute bg top-0 left-0 w-full h-full object-cover"
                src="./bg.png"
                alt=""
              />

              {/* Text Title */}
              <div className="text text-white flex flex-col gap-3 absolute top-2 left-1/2 -translate-x-1/2 scale-[1.4] rotate-[-10deg]">
                <h1 className="text-[6rem] leading-none -ml-20">grand</h1>
                <h1 className="text-[6rem] leading-none -ml-10">theft</h1>
                <h1 className="text-[6rem] leading-none -ml-20">auto</h1>
              </div>

              {/* Character Image */}
              <img
                className="absolute character scale-[0.7] sm:scale-[0.8] -bottom-[40%] sm:-bottom-[60%] left-1/2 -translate-x-1/2 w-[70%] sm:w-auto"
                src="./girlbg.png"
                alt=""
              />
            </div>

            {/* Bottom Platform Bar */}
            <div className="bottombar w-full py-5 sm:py-10 px-5 sm:px-10 absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent">
              <img
                className="h-[40px] sm:h-[60px] absolute top-1/3 left-1/2 -translate-x-1/2"
                src="./ps5.png"
                alt=""
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
