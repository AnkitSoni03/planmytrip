"use client";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
    {
      question: "What if I need help during my trip?",
      answer:
        "Our 24/7 customer support is always available to assist you with any issues during your journey.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Frequently Asked{" "}
            <span className="text-red-600">Questions</span>
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm md:text-lg max-w-2xl mx-auto">
            Have questions about our car rental services? Find quick answers below.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-2xl transition-all duration-200 bg-white dark:bg-neutral-800 ${
                openIndex === index
                  ? "border-red-500 shadow-md shadow-red-100 dark:shadow-red-900/20"
                  : "border-gray-200 hover:border-gray-300 dark:border-neutral-700"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full px-5 py-4 text-left"
              >
                <span
                  className={`text-base md:text-lg font-medium ${
                    openIndex === index
                      ? "text-red-600 dark:text-red-500"
                      : "text-gray-900 dark:text-gray-100"
                  }`}
                >
                  {faq.question}
                </span>
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                    openIndex === index
                      ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500"
                      : "bg-gray-100 text-gray-600 dark:bg-neutral-700 dark:text-gray-400"
                  }`}
                >
                  {openIndex === index ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>

              {openIndex === index && (
                <div className="px-5 pb-5 text-gray-600 dark:text-gray-300 text-sm md:text-base border-t border-gray-100 dark:border-neutral-700 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="text-center mt-10">
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
            Still have questions? Contact our support team at{" "}
            <span className="text-red-600 dark:text-red-500 font-semibold hover:underline">
              planmytrip360@gmail.com
            </span>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
