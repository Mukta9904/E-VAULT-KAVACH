
import React from 'react';
import Link from 'next/link';

const Homepage = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='relative h-screen w-full overflow-hidden'>
        <img src="/login.png" className='absolute inset-0 w-full h-full object-cover' alt="Background" />
        <nav className='fixed flex justify-between items-center py-3 px-4 inset-x-0 top-0 z-50 bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg'>
          <div className='flex items-center gap-2'>
            <img src="/logo.png" className='w-10 h-10  border-2 border-black object-cover rounded-full' alt="KAVACH Logo" />
            <span className='text-2xl font-semibold'>KAVACH</span>
          </div>
          <ul className='hidden md:flex justify-center items-center gap-6'>
            <li className='hover:border-b-2 border-white'>Home</li>
            <li className='hover:border-b-2 border-white'>Services</li>
            <li className='hover:border-b-2 border-white'>About</li>
            <li>
            <Link href="/login">
              <button className='border-2 border-white py-2 px-4 rounded-full'>
               Log In
              </button>
              </Link>
            </li>
          </ul>
          <div className='md:hidden'>
            {/* Add mobile menu toggle here */}
          </div>
        </nav>
        <div className='flex flex-col justify-end items-start gap-4 p-12 absolute inset-0 z-10'>
          <h1 className='text-5xl font-bold leading-tight'>Fortify Your Digital Life with Kavach.</h1>
          <p className='max-w-[800px] text-xl'>Leveraging state-of-the-art encryption, Kavach ensures that your credentials are safeguarded with impenetrable protection.</p>
          <Link href="/login"><button className='border-2 py-2 px-4 rounded-full text-xl transition-transform hover:scale-105'>Explore</button></Link>
        </div>
      </div>
      <main className='flex-grow p-4 bg-white text-gray-700'>
        <section className='text-center'>
          <h2 className='text-xl font-semibold'>Our Services</h2>
          <h3 className='text-4xl font-semibold my-6'>Secure Every Key to Your Digital Life</h3>
          <ul className='flex flex-wrap justify-center gap-10'>
          <li className='w-[250px] h-[470px] cursor-pointer flex bg-white shadow-xl pt-6 flex-col gap-2  p-3 pl-5  rounded-xl'>
                    <img className='w-full h-[230px]' src="/passwords.jpg" alt="" />
                    <h1 className='text-2xl font-semibold'>Save Your Passwords</h1>
                    <p className='text-lg '>Save edit and manage all your passwords in a hashle free and secure way.</p>
                </li>
                <li className='w-[250px] h-[470px] flex cursor-pointer bg-white shadow-xl pt-6 flex-col  gap-2 p-3 pl-5  rounded-xl'>
                    <img className='w-full h-[230px]' src="/payments.jpg" alt="" />
                    <h1 className='text-2xl font-semibold'>Save Your Payment Details</h1>
                    <p className='text-lg '>Save your payment details securely and be aware of the frauds.</p>
                </li>
             <li className='w-[250px] h-[470px] flex cursor-pointer bg-white shadow-xl pt-6 flex-col  gap-2 p-3 pl-5  rounded-xl'>
                    <img className='w-full h-[230px]' src="/passGenerator.png" alt="" />
                    <h1 className='text-2xl font-semibold'>Password Generator</h1>
                    <p className='text-lg '>Generates strong passwords for better security.</p>
                </li>
                <li className='w-[250px] h-[470px] flex cursor-pointer bg-white shadow-xl pt-6 flex-col  gap-2 p-3 pl-5  rounded-xl'>
                    <img className='w-full h-[230px]' src="/encryption.jpg" alt="" />
                    <h1 className='text-2xl font-semibold'>Symetric Encryption</h1>
                    <p className='text-lg '>Protect your data with the help of powerfull encryption.</p>
                </li>
          </ul>
        </section>
      </main>
      <footer className="bg-[#6258dc] text-gray-200 py-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link href="/login">
                <div className="flex items-center gap-2">
                  <img src="/logo.png" className='w-8 h-8  border-2 border-black object-cover rounded-full' alt="KAVACH Logo" />
                  <span className="text-xl font-bold">KAVACH</span>
                </div>
              </Link>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Link href="/features" className="hover:text-gray-400">Features</Link>
              <Link href="/pricing" className="hover:text-gray-400">Pricing</Link>
              <Link href="/about" className="hover:text-gray-400">About</Link>
              <Link href="/contact" className="hover:text-gray-400">Contact</Link>
            </div>
            <div className="mt-6 md:mt-0">
              <p className="text-gray-200 text-sm">© 2024 KAVACH. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
