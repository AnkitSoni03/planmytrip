import { TripPlannerForm } from "@/components/AI-Trip/trip-planner-form";

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-6 text-center pt-15">
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white">
            AI <span className="text-red-600">Cab Suggestions</span>
          </h2>
          <ul className="mt-4 space-y-3 text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto text-left list-disc list-inside">
            <li>
              Get smart cab recommendations based on your travel route and
              timing.
            </li>
            <li>
              AI helps you choose the most affordable and comfortable ride.
            </li>
            <li>
              Instant suggestions for one-way, round-trip, or outstation
              bookings.
            </li>
            <li>
              Save time with personalized options that match your budget and
              needs.
            </li>
          </ul>
        </div>

        {/* Trip Planner Form */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <TripPlannerForm />
          </div>
        </section>
      </div>
    </>
  );
}
