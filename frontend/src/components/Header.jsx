import React from 'react'

const Header = () => {
  return (
    <header className="bg-black shadow-sm border-b border-neutral-800">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">.scout</h1>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#palpites" className="text-white hover:text-gray-300 transition-colors">Palpites</a>
            <a href="#jogos" className="text-white hover:text-gray-300 transition-colors">Jogos</a>
            <a href="#sobre" className="text-white hover:text-gray-300 transition-colors">Sobre</a>
            <a href="#contato" className="text-white hover:text-gray-300 transition-colors">Contato</a>
          </div>

          {/* Menu Mobile Button */}
          <button className="md:hidden p-2 text-white">
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
