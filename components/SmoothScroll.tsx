// "use client";

// import { useEffect } from "react";
// import Lenis from "@studio-freight/lenis";

// const SmoothScroll = () => {
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.2,
//       easing: (t) => t,
//       lerp: 0.1,
//     });

//     function raf(time: number) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return () => lenis.destroy();
//   }, []);

//   return null;
// };

// export default SmoothScroll;



"use client"; // Next.js app router me client component ke liye

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // scroll duration
      easing: (t) => t, // easing function
      // @ts-ignore
      smooth: true, // smooth scrolling enable
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy(); // cleanup on unmount
  }, []);

  return null;
};

export default SmoothScroll;
