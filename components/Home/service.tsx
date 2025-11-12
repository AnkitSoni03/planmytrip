import { cn } from "@/lib/utils";
import {
  IconPlane,
  IconBuildingSkyscraper,
  IconCar,
  IconArrowsLeftRight,
  IconBriefcase,
  IconSteeringWheel,
  IconDiscount,
  IconStar,
} from "@tabler/icons-react";

export function Services() {
  const features = [
    {
      title: "Airport Transfers",
      description: "On-time pickups and drops to all major airports with comfort & reliability.",
      icon: <IconPlane className="w-8 h-8" />,
    },
    {
      title: "Local / Outstation Rentals",
      description: "Book cabs for city travel or long-distance trips at affordable rates.",
      icon: <IconCar className="w-8 h-8" />,
    },
    {
      title: "One-way / Round-trip Rides",
      description: "Flexible travel options designed to suit your journey needs.",
      icon: <IconArrowsLeftRight className="w-8 h-8" />,
    },
    {
      title: "Corporate Rentals",
      description: "Professional and reliable car rentals for business clients and meetings.",
      icon: <IconBriefcase className="w-8 h-8" />,
    },
    {
      title: "Luxury Car Rentals",
      description: "Premium vehicles for weddings, parties, and special occasions.",
      icon: <IconStar className="w-8 h-8" />,
    },
    {
      title: "Daily & Hourly Rentals",
      description: "Choose flexible rental plans as per your schedule and convenience.",
      icon: <IconSteeringWheel className="w-8 h-8" />,
    },
    {
      title: "Hotel & City Transfers",
      description: "Smooth and reliable cab services between hotels, stations, and city points.",
      icon: <IconBuildingSkyscraper className="w-8 h-8" />,
    },
    {
      title: "Special Offers & Discounts",
      description: "Seasonal discounts, referral bonuses, and first-time booking offers.",
      icon: <IconDiscount className="w-8 h-8" />,
    },
  ];

  return (
    <section className="relative z-10">
      {/* Section Heading */}
      <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-7xl mx-auto px-6 text-center mb-10 md:mb-14">
        <h2 className="text-2xl md:text-4xl font-extrabold text-neutral-900 dark:text-white">
          Our <span className="text-red-600">Services</span>
        </h2>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400 text-sm md:text-lg max-w-2xl mx-auto">
          Discover our wide range of professional services designed to make your travel smooth, safe, and affordable.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
      </div>
    </section>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 ? (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      ) : (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-red-600 dark:text-red-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-red-300 dark:bg-red-700 group-hover/feature:bg-red-600 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-900 dark:text-white">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
