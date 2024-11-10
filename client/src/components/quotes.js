import React from 'react';
import logo from '../assets/logo.svg'

export default function Example() {
    return (
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <img
            alt=""
            src= {logo}
            className="mx-auto h-12"
          />
          <figure className="mt-10">
            <blockquote className="text-center text-xl/8 font-semibold text-gray-900 sm:text-2xl/9">
              <p>
                “I believe the key to solving any problem lies not in the solution, but in understanding the problem itself. Clearly defining the problem is the foundation of my approach. 
                When I work on projects, I aim to create something valuable, useful, and truly responsive to real needs.”
              </p>
            </blockquote>
            <figcaption className="mt-10">
  
            </figcaption>
          </figure>
        </div>
      </section>
    )
  }
  