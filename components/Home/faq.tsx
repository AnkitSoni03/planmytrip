"use client";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do I book a car rental?",
      answer: "Simply choose your location, select the car type, make your payment, and enjoy the ride. The process is quick and secure.",
    },
    {
      question: "What documents do I need to rent a car?",
      answer: "You will need a valid driving license, government-approved ID, and in some cases, a credit/debit card for verification.",
    },
    {
      question: "Can I cancel or modify my booking?",
      answer: "Yes, you can easily cancel or modify your booking from your account dashboard or by contacting our support team.",
    },
    {
      question: "Are there any hidden charges?",
      answer: "No hidden charges! All costs, including taxes and insurance, are displayed upfront before booking confirmation.",
    },
    {
      question: "Do you offer one-way car rentals?",
      answer: "Yes, we offer both round trips and one-way rentals. Extra charges may apply for one-way trips depending on distance.",
    },
    {
      question: "What if I need help during my trip?",
      answer: "Our 24/7 customer support is always available to assist you with any issues during your journey.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white"
          >
            Frequently Asked <span className="text-red-600">Questions</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-gray-600 dark:text-gray-400 text-sm md:text-lg max-w-2xl mx-auto"
          >
            Got questions about our car rental services? We've got you covered with quick answers.
          </motion.p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className={`
                rounded-2xl border-2 transition-all duration-300 overflow-hidden
                ${openIndex === index 
                  ? "border-red-500 dark:border-red-500 shadow-lg shadow-red-100 dark:shadow-red-900/20 bg-white dark:bg-neutral-800" 
                  : "border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600 bg-white/70 dark:bg-neutral-800/70"
                }
              `}>
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full px-4 md:px-6 py-4 text-left"
                >
                  <span className={`
                    text-sm md:text-lg font-semibold transition-colors duration-300
                    ${openIndex === index 
                      ? "text-red-600 dark:text-red-500" 
                      : "text-gray-800 dark:text-gray-200"
                    }
                  `}>
                    {faq.question}
                  </span>
                  <div className={`
                    flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                    ${openIndex === index 
                      ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500" 
                      : "bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-gray-400"
                    }
                  `}>
                    {openIndex === index ? (
                      <Minus className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      <Plus className="w-4 h-4 md:w-5 md:h-5" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 md:px-6 pb-4 md:pb-6">
                        <motion.p 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed"
                        >
                          {faq.answer}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-8 md:mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
            Still have questions?{" "}mail our support team -{" "}
            <span className="text-red-600 dark:text-red-500 font-semibold hover:underline">
               planmytrip360@gmail.com
            </span>{" "}
            for personalized assistance.
          </p>
        </motion.div>
      </div>
    </section>
  );
}