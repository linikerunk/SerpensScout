import React from 'react'

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-scout-100">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gradient">.scout</h1>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#home" className="text-scout-600 hover:text-scout-700 transition-colors">Blog</a>
            <a href="#about" className="text-scout-600 hover:text-scout-700 transition-colors">Sobre</a>
            <a href="#contact" className="text-scout-600 hover:text-scout-700 transition-colors">Contato</a>
          </div>
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
