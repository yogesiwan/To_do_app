import React from "react";

const Navbar = () => {
  return (
    <nav className=' flex justify-between items-center bg-slate-700 text-white py-2 '>
      <div className="logo">
        <span className="mx-6 font-bold text-2xl">ToDo</span>
      </div>
      <ul className="flex space-x-8 mx-8">
        <li className="mx-6 cursor-pointer hover:underline">
          <a href="#home" aria-label="Home">Home</a>
        </li>
        <li className="cursor-pointer hover:underline">
          <a href="#tasks" aria-label="Your Tasks">Your Tasks</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;