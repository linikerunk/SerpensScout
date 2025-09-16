import React from 'react';
import Button from '../ui/Button';

/**
 * 🦇 Aside Component - O Perfil do Liniker
 * 
 * Aqui é onde o Liniker se apresenta ao mundo.
 * Cada link é uma conexão, cada palavra carrega propósito.
 */
const Aside = () => {
  return (
    <aside className="w-80 bg-white shadow-lg border-r border-gray-200 p-6">
      {/* Foto e Nome */}
      <div className="text-center mb-8">
        <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-4xl text-gray-500">🦇</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Liniker</h2>
        <p className="text-gray-600 text-sm">
          Analista de Futebol • Desenvolvedor • Apaixonado por Dados
        </p>
      </div>

      {/* Bio */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Sobre Mim</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Analista de futebol apaixonado por dados e estatísticas. 
          Combino tecnologia e paixão pelo esporte para criar 
          análises profundas e insights únicos sobre o jogo.
        </p>
      </div>

      {/* Contatos */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Me Encontre</h3>
        <div className="space-y-3">
          <a 
            href="mailto:liniker@example.com" 
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span className="mr-3">📧</span>
            liniker@example.com
          </a>
          
          <a 
            href="https://github.com/liniker" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span className="mr-3">🐙</span>
            GitHub
          </a>
          
          <a 
            href="https://linkedin.com/in/liniker" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span className="mr-3">💼</span>
            LinkedIn
          </a>
          
          <a 
            href="https://twitter.com/liniker" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span className="mr-3">🐦</span>
            Twitter
          </a>
        </div>
      </div>


      {/* Tags Populares */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags Populares</h3>
        <div className="flex flex-wrap gap-2">
          {['Futebol', 'Análise', 'Estatísticas', 'Python', 'Dados', 'Táticas'].map((tag) => (
            <span 
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Aside;
