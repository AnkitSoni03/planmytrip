"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I book a car rental?",
      answer:
        "Simply choose your location, select the car type, make your payment, and enjoy the ride. The process is quick and secure.",
    },
    {
      question: "What documents do I need to rent a car?",
      answer:
        "You will need a valid driving license, government-approved ID, and in some cases, a credit/debit card for verification.",
    },
    {
      question: "Can I cancel or modify my booking?",
      answer:
        "Yes, you can easily cancel or modify your booking from your account dashboard or by contacting our support team.",
    },
    {
      question: "Are there any hidden charges?",
      answer:
        "No hidden charges! All costs, including taxes and insurance, are displayed upfront before booking confirmation.",
    },
    {
      question: "Do you offer one-way car rentals?",
      answer:
        "Yes, we offer both round trips and one-way rentals. Extra charges may apply for one-way trips depending on distance.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Frequently Asked <span className="text-red-600">Questions</span>
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Got questions about our car rental services? We’ve got you covered.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border shadow-md transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full px-6 py-4 text-left"
              >
                <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
