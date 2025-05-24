import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { MessageCircleHeart } from 'lucide-react'; // Optional icon for flair

const AboutPage = () => {
  return (
    <div className='min-h-screen'>
      <Navbar />
      <div className="flex h-full lg:h-[557px] py-10 w-full bg-purple-900 justify-center items-center relative">
        <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 flex flex-col gap-6 items-center text-center">
          <div className="flex items-center gap-2 text-purple-800">
            <MessageCircleHeart className="w-8 h-8" />
            <h1 className="text-4xl font-extrabold tracking-wide">About Us</h1>
          </div>

          <p className="text-gray-700 text-base leading-relaxed">
            Welcome to <span className="font-semibold text-purple-700">OfficialChat</span> – your modern and responsive chat web app built using the powerful{' '}
            <span className="font-medium">MERN stack</span> (MongoDB, Express, React, Node.js). Instantly send text messages and share images in real time, whether you're on mobile or desktop.
          </p>

          <p className="text-gray-700 text-base leading-relaxed">
            The app is fully responsive and designed for a smooth experience on all screen sizes. Whether you're chatting one-on-one or sharing moments through images,
            <span className="font-semibold text-purple-700"> OfficialChat </span>
            makes communication seamless and efficient.
          </p>

          <p className="text-gray-700 text-base leading-relaxed">
            💬 Want to get in touch or collaborate? Connect with me on{' '}
            <Link
              to="https://www.linkedin.com/in/hatim-malak-8ba254279/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-700 underline hover:text-purple-900 transition"
            >
              LinkedIn
            </Link>
            .
          </p>
          <div className='flex justify-start items-center'>
            <p>Created By-<span className='font-bold'>Hatim Malak</span></p>
          </div>
        </div>
        <Link className='absolute right-2 top-1' to="/">
          <img src="/cross.svg" alt="cross" className='w-[30px]' />
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
