import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="text-center">
        {/* Brand Name */}
        <div>
          <a className="text-xl font-semibold text-black" href="#" aria-label="Brand">
            Minh
          </a>
        </div>

        {/* Description */}
        <div className="mt-3">
          <p className="text-gray-500 dark:text-neutral-500">
            Dare to dream, then 
            <a className="text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500" href="#"> try creative </a>
            and unlock worlds beyond imagination.
          </p>
          <p className="text-gray-500 dark:text-neutral-500">© 2024 Minhhub.</p>
        </div>

        {/* Social Icons */}
        <div className="mt-3 space-x-2">
          {/* LinkedIn Icon */}
          <SocialIcon href="https://www.linkedin.com/in/binhminhman/" iconPath="M0 1.146C0 .513.526 0 1.175 0h13.65C15.475 0 16 .513 16 1.146v13.708c0 .633-.525 1.146-1.175 1.146H1.175C.525 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H3.122v7.225h1.821zm-.911-8.211c-.607 0-1.098-.493-1.098-1.099 0-.605.491-1.098 1.098-1.098.607 0 1.098.493 1.098 1.098 0 .606-.491 1.099-1.098 1.099zm6.33 8.211V9.359c0-.938-.018-2.145-1.308-2.145-1.31 0-1.51 1.022-1.51 2.075v4.125h1.818V9.555c0-.525.01-1.2.73-1.2.732 0 .741.675.741 1.234v4.306h1.818z" />

          {/* Medium Icon */}
          <SocialIcon href="https://medium.com/@bnhminh_38309" iconPath="M4.134 4.195a.564.564 0 0 0-.184-.486L2.27 2.108V1.896h5.191l4.006 8.876H12.46L9.254 2.218c-.112-.195-.277-.33-.506-.36H6.187c-.176.02-.336.129-.425.314L3.97 7.108H1.635c-.197 0-.347.144-.347.324v1.095h.891V7.558h1.457l2.748 6.177c.09.197.251.303.425.334h.977c.198-.016.335-.146.425-.333L12.46 4.3H9.254c-.197 0-.347-.145-.347-.326V4.195z" />

          {/* Google Mail Icon */}
          <SocialIcon href="mailto:manbinhminh99@gmail.com" iconPath="M.05 3.555v9.777h15.9V3.555H.05zM8 8.839L.994 3.555h14.012L8 8.839zM1.02 4.568v7.94l5.766-4.05L1.02 4.568zm12.192 3.372L8 8.839l5.207 3.64V4.568l-5.095 3.372z" />

          {/* GitHub Icon */}
          <SocialIcon href="https://github.com/ducbinhminhman" iconPath="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </div>
        {/* End Social Icons */}
      </div>
    </footer>
  );
}

function SocialIcon({ href, iconPath }) {
  return (
    <a
      href={href}
      className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d={iconPath} />
      </svg>
    </a>
  );
}
