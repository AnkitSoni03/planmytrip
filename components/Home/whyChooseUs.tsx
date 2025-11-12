import { PointerHighlight } from "@/components/ui/pointer-highlight";
import Image from "next/image";

export function WhyChooseUs() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-4xl font-extrabold text-neutral-900 dark:text-white">
            Why <span className="text-red-600">Choose Us</span>
          </h2>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400 text-sm md:text-lg max-w-2xl mx-auto">
            We make your journeys smooth, flexible, and memorable with our
            reliable cab services and customer-first approach.
          </p>
        </div>
        <div className="grid max-w-5xl mx-auto grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 - 24/7 Cab Service */}
          <div className="rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-40 w-full rounded-lg dark:bg-gradient-to-r from-white to-gray-300 flex items-center justify-center">
              <Image
                src="/1.png"
                alt="24/7 Cab Service"
                width={150}
                height={150}
                className="object-contain"
              />
            </div>
            <div className="mt-4 text-base font-bold tracking-tight">
              Always on time with our
              <PointerHighlight
                rectangleClassName="bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700 leading-loose"
                pointerClassName="text-red-500 h-3 w-3"
                containerClassName="inline-block mx-1"
              >
                <span className="relative z-10">24/7 Cab Service</span>
              </PointerHighlight>
              for your convenience.
            </div>
            <p className="mt-4 text-sm text-neutral-500">
              Day or night, weekdays or weekends – our cabs are always available
              to get you where you need to be.
            </p>
          </div>

          {/* Card 2 - Comforting Itineraries */}
          <div className="rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-40 w-full rounded-lg dark:bg-gradient-to-r from-white to-gray-300 flex items-center justify-center">
              <Image
                src="/2.png"
                alt="Comforting Itineraries"
                width={150}
                height={150}
                className="object-contain"
              />
            </div>
            <div className="mt-4 text-base font-bold tracking-tight">
              Travel stress-free with our
              <PointerHighlight
                rectangleClassName="bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700 leading-loose"
                pointerClassName="text-red-500 h-3 w-3"
                containerClassName="inline-block mx-1"
              >
                <span className="relative z-10">Comforting Itineraries</span>
              </PointerHighlight>
              designed just for you.
            </div>
            <p className="mt-4 text-sm text-neutral-500">
              Smooth, well-planned routes with rest stops and flexible options
              to make your journey comfortable and enjoyable.
            </p>
          </div>

          {/* Card 3 - Transparent Pricing */}
          <div className="rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-40 w-full rounded-lg dark:bg-gradient-to-r from-white to-gray-300 flex items-center justify-center">
              <Image
                src="/3.png"
                alt="Transparent Pricing"
                width={150}
                height={150}
                className="object-contain"
              />
            </div>
            <div className="mt-4 text-base font-bold tracking-tight">
              Experience hassle-free rides with
              <PointerHighlight
                rectangleClassName="bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700 leading-loose"
                pointerClassName="text-red-500 h-3 w-3"
                containerClassName="inline-block mx-1"
              >
                <span className="relative z-10">Transparent Pricing</span>
              </PointerHighlight>
              at every step.
            </div>
            <p className="mt-4 text-sm text-neutral-500">
              No hidden charges, no last-minute surprises. Just clear, upfront
              fares you can always trust.
            </p>
          </div>

          {/* Card 4 - Pet-Friendly */}
          <div className="rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-40 w-full rounded-lg dark:bg-gradient-to-r from-white to-gray-300 flex items-center justify-center">
              <Image
                src="/4.png"
                alt="Pet-Friendly"
                width={150}
                height={150}
                className="object-contain"
              />
            </div>
            <div className="mt-4 text-base font-bold tracking-tight">
              Travel together with our
              <PointerHighlight
                rectangleClassName="bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700 leading-loose"
                pointerClassName="text-red-500 h-3 w-3"
                containerClassName="inline-block mx-1"
              >
                <span className="relative z-10">Pet-Friendly</span>
              </PointerHighlight>
              cab options.
            </div>
            <p className="mt-4 text-sm text-neutral-500">
              Because your furry friends deserve comfort too — ride without
              worrying about leaving them behind.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
