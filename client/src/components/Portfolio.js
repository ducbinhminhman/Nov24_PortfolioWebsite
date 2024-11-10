// Portfolio.js
import React from 'react';
import Card from './Card';
import ReverseCard from './ReverseCard';
import Quotes from './quotes';
import { useNavigate } from 'react-router-dom';

export default function Portfolio() {
    const navigate = useNavigate();

    const handleReadMoreClick = () => {
        window.scrollTo(0, 0); // Scroll to the top
        navigate("/portfolio"); // Navigate to the portfolio page
    };

    return (
        <div className="py-24">
            <div className="px-1 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-2xl font-bold md:text-4xl md:leading-tight text-gray-900 sm:text-5xl">
                        From My Projects
                    </h2>
                    <p className="mt-1 text-lg text-gray-600 inline-flex items-center gap-x-1">
                        Stay in the know with insights from industry experts.
                        <span 
                            onClick={handleReadMoreClick}
                            className="text-blue-600 font-medium hover:underline flex items-center gap-x-1 cursor-pointer"
                        >
                            Read more
                            <svg className="shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </span>
                    </p>
                </div>
                <div className="mt-0">
                    <Card />
                    <ReverseCard />
                    <Quotes />
                </div>
            </div>
        </div>
    );
}
