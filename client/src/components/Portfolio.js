// Portfolio.js
import React from 'react';
import Card from './Card';
import ReverseCard from './ReverseCard';
import Quotes from './quotes';


export default function Portfolio() {
    return (
        <div className="py-24">
            <div className="px-1 lg:px-8">
                <div className="mx-auto max-w-2xl text-center"> {/* Add text-center here */}
                    <h2 className="text-2xl font-bold md:text-4xl md:leading-tight text-gray-900 sm:text-5xl">
                        From My Projects
                    </h2>
                    <p className="mt-2 text-lg text-gray-600">
                        Passion-driven insights to help you grow your business.
                    </p>
                </div>
                <div className="mt-16"> {/* Add margin-top for spacing */}
                    <Card />
                    <ReverseCard />
                    <Quotes />
                </div>
            </div>
        </div>
    );
}
