import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-30 bg-[#001f3f] shadow-md border-b border-[#001f3f] transition-colors">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#f5f5dc] rounded-lg flex items-center justify-center shadow">
              <span className="text-[#001f3f] font-bold text-2xl">📚</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#f5f5dc] tracking-tight">BookNest</h1>
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <Link to="/" className="text-[#f5f5dc] hover:text-[#ffd700] font-medium transition-colors px-2 py-1 rounded hover:bg-[#001a33]">Home</Link>
            <Link to="/faq" className="text-[#f5f5dc] hover:text-[#ffd700] font-medium transition-colors px-2 py-1 rounded hover:bg-[#001a33]">FAQ</Link>
            <Link to="/support" className="text-[#f5f5dc] hover:text-[#ffd700] font-medium transition-colors px-2 py-1 rounded hover:bg-[#001a33]">Support</Link>
            <Link to="/login" className="text-[#f5f5dc] hover:text-[#ffd700] font-medium transition-colors px-2 py-1 rounded hover:bg-[#001a33]">Login</Link>
            <Link to="/signup" className="text-[#f5f5dc] hover:text-[#001f3f] bg-[#ffd700] font-bold transition-colors px-4 py-1 rounded-lg shadow hover:bg-[#ffe066]">Sign Up</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
