import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function CustomerReview() {
  const testimonials = [
    {
      quote:
        "Booked a luxury car for a family trip. The vehicle was comfortable, the driver polite, and the service excellent. Worth every penny!",
      name: "Sandeep Yadav",
      designation: "Businessman from Varanasi",
      src: "/sandeep.jpg",
      stars: <p className="text-yellow-500 mt-2">★★★★★</p>,
    },
    {
      quote:
        "Great service at affordable prices. The driver was punctual and polite, and the support team was very helpful.",
      name: "Priya Singh",
      designation: "Teacher from Lucknow",
      src: "/priya-singh.jpg",
      stars: <p className="text-yellow-500 mt-2">★★★★★</p>,
    },
    {
      quote:
        "Booked a cab for my business trip and it was flawless. Car was neat, on time, and the driver highly professional.",
      name: "Amit Verma",
      designation: "Software Engineer from Bangalore",
      src: "/amit-verma.jpg",
      stars: <p className="text-yellow-500 mt-2">★★★★★</p>,
    },
    {
      quote:
        "Had a wonderful experience. The booking was easy, car was in great condition, and everything went smoothly.",
      name: "Neha Gupta",
      designation: "Marketing Manager from Mumbai",
      src: "/neha-gupta.jpg",
      stars: <p className="text-yellow-500 mt-2">★★★★★</p>,
    },
    {
      quote:
        "PlanMyTrip made travel stress-free. Booking was smooth, the car clean, and the journey well organized.",
      name: "Rahul Sharma",
      designation: "Entrepreneur from Delhi",
      src: "/rahul-sharma.jpeg",
      stars: <p className="text-yellow-500 mt-2">★★★★★</p>,
    },
  ];

  return <AnimatedTestimonials testimonials={testimonials} />;
}
