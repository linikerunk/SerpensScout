import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

/**
 * 🦇 Header Component - A Alma da Interface
 * 
 * O cabeçalho é o primeiro contato, a primeira impressão.
 * Deve carregar leveza e propósito, como Luminha ensina.
 */
const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - A identidade do projeto */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
              ⚽ Liniker Football Analysis
            </Link>
          </div>
          
          {/* Navegação - O caminho do usuário */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/posts" 
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              Análises
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              Sobre
            </Link>
          </nav>
          
          {/* Ações - Os botões que movem o mundo */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Login
            </Button>
            <Button variant="primary" size="sm">
              Cadastrar
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
