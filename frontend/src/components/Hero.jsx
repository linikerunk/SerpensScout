import React from 'react'

const Hero = () => {
  return (
    <section id="home" className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-scout-500 to-scout-700 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-3xl font-bold text-white">S</span>
          </div>
          <h2 className="text-4xl font-bold text-scout-900 mb-4">Developer</h2>
          <p className="text-xl text-scout-600 mb-6">Desenvolvedor apaixonado por tecnologia, Python e React</p>
          <div className="flex items-center justify-center space-x-4 text-sm text-scout-500">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
              </svg>
              São Paulo via Brasil
            </span>
            <span className="dot-accent">•</span>
            <a href="mailto:dev@example.com" className="hover:text-scout-700 transition-colors">Email</a>
            <span className="dot-accent">•</span>
            <a href="https://github.com/dev" className="hover:text-scout-700 transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
