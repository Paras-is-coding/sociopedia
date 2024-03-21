import React from 'react';

const faqs = [
    {
        question: "How do I sign up for an account?",
        answer: "To sign up, simply click on the 'Sign Up' button on the homepage and follow the prompts to create your account."
    },
    {
        question: "How can I customize my profile?",
        answer: "You can customize your profile by clicking on  'Edit Profile.' From there, you can add a profile picture, update your bio, and more."
    },
   
    {
        question: "Can I report inappropriate content or behavior?",
        answer: "Yes, you can report inappropriate content or behavior by clicking on the 'Report' button located near the post or message. Our team will review the report and take appropriate action."
    },
    {
        question: "Is there a mobile app available?",
        answer: "No, not now."
    },
    {
        question: "How can I contact customer support?",
        answer: "If you need assistance or have any questions, you can contact our customer support team by emailing paraschand5815@gmail.com."
    }
];

function FAQ() {
    return (
        <div className="relative w-full px-6 pt-10 pb-8 mt-8 shadow-xl  ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-2xl sm:rounded-lg sm:px-10 bg-gradient-to-br from-gray-400  to-white ">
            <div className="mx-auto px-5">
                <div className="flex flex-col items-center">
                    <h2 className="mt-5 text-center text-3xl font-bold tracking-tight md:text-5xl text-customDark">FAQ</h2>
                    <p className="mt-3 text-lg text-neutral-500 md:text-xl">Frequently asked questions</p>
                </div>
                <div className="mx-auto mt-8 grid max-w-xl divide-y divide-neutral-200">
                    {faqs.map((faq, index) => (
                        <div key={index} className="py-5">
                            <details className="group">
                                <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                                    <span >{faq.question}</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shape-rendering="geometricPrecision"
                                            stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                            strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                            <path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </span>
                                </summary>
                                <p className="group-open:animate-fadeIn mt-3 text-neutral-600">{faq.answer}</p>
                            </details>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FAQ;
