import React from "react";
import { useId } from "react";

export function Offers() {
  return (
    <section className="lg:py-32 relative">
      {/* Section Heading */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white">
          Special <span className="text-red-600">Offers</span>
        </h2>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
          Grab our exclusive discounts and rewards to make your journey even more affordable.
        </p>
      </div>

      {/* Offer Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
        {grid.map((feature) => (
          <div
            key={feature.title}
            className="relative bg-gradient-to-b from-neutral-100 to-white dark:from-neutral-900 dark:to-neutral-950 
                       p-6 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            <Grid size={22} />
            <p className="text-lg font-bold text-neutral-800 dark:text-white relative z-20">
              {feature.title}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 mt-3 text-base relative z-20 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

const grid = [
  {
    title: "Seasonal Discounts",
    description:
      "Enjoy special savings during festive seasons and holidays across all routes.",
  },
  {
    title: "First-time Booking Offer",
    description:
      "Get exciting discounts on your very first ride with us — start your journey smart!",
  },
  {
    title: "Referral Bonuses",
    description:
      "Refer friends and family to earn instant rewards and ride credits.",
  },
  {
    title: "Corporate Benefits",
    description:
      "Special discounted packages for businesses and corporate partners.",
  },
  {
    title: "Weekend Deals",
    description:
      "Plan your weekend trips with attractive offers on round-trip rides.",
  },
  {
    title: "Loyalty Rewards",
    description:
      "Earn points on every ride and redeem them for discounts on future bookings.",
  },
  {
    title: "Luxury Car Offers",
    description:
      "Book premium cars at unbeatable prices for weddings and special events.",
  },
  {
    title: "Early Bird Discounts",
    description:
      "Book in advance and save big with our exclusive early bird deals.",
  },
];

// export const Grid = ({
//   pattern,
//   size,
// }: {
//   pattern?: number[][];
//   size?: number;
// }) => {
//   const p = pattern ?? [
//     [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
//     [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
//     [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
//     [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
//     [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
//   ];
//   return (
//     <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
//       <div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
//         <GridPattern
//           width={size ?? 20}
//           height={size ?? 20}
//           x="-12"
//           y="4"
//           squares={p}
//           className="absolute inset-0 h-full w-full mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
//         />
//       </div>
//     </div>
//   );
// };

// export function GridPattern({ width, height, x, y, squares, ...props }: any) {
//   const patternId = useId();

//   return (
//     <svg aria-hidden="true" {...props}>
//       <defs>
//         <pattern
//           id={patternId}
//           width={width}
//           height={height}
//           patternUnits="userSpaceOnUse"
//           x={x}
//           y={y}
//         >
//           <path d={`M.5 ${height}V.5H${width}`} fill="none" />
//         </pattern>
//       </defs>
//       <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
//       {squares && (
//         <svg x={x} y={y} className="overflow-visible">
//           {squares.map(([x, y]: any) => (
//             <rect
//               strokeWidth="0"
//               key={`${x}-${y}`}
//               width={width + 1}
//               height={height + 1}
//               x={x * width}
//               y={y * height}
//             />
//           ))}
//         </svg>
//       )}
//     </svg>
//   );
// }


export const Grid = ({
  pattern,
  size,
}: {
  pattern?: [number, number][];
  size?: number;
}) => {
  const p: [number, number][] = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ];

  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
        />
      </div>
    </div>
  );
};


interface GridPatternProps {
  width: number;
  height: number;
  x: string | number;
  y: string | number;
  squares?: [number, number][] ;
  className?: string;
}

export function GridPattern({ width, height, x, y, squares, className }: GridPatternProps) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" className={className}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([sx, sy]) => (
            <rect
              strokeWidth={0}
              key={`${sx}-${sy}`}
              width={width + 1}
              height={height + 1}
              x={sx * width}
              y={sy * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
