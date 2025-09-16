import React from 'react';
import Button from '../components/ui/Button';

/**
 * 🦇 About Page - A História do Projeto
 * 
 * Aqui contamos nossa história. Por que existimos,
 * o que nos move, e como queremos impactar o mundo.
 */
const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Sobre o Liniker Football Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Uma jornada onde futebol e tecnologia se encontram. 
            Onde cada estatística conta uma história e cada análise revela segredos.
          </p>
        </div>

        {/* Nossa História */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Nossa História
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              O Liniker Football Analysis nasceu da paixão pelo futebol e pela tecnologia. 
              Uma abordagem única que combina análise estatística profunda com insights 
              táticos e estratégicos sobre o esporte mais amado do mundo.
            </p>
            
            <p className="text-gray-600 mb-6">
              Inspirado pela evolução do futebol moderno e pelo poder dos dados, 
              criei um espaço onde estatísticas e paixão coexistem harmoniosamente. 
              Cada análise é uma jornada de descoberta.
            </p>
            
            <p className="text-gray-600 mb-6">
              Acredito que dados devem contar histórias, não apenas números. 
              Que análises devem revelar segredos, não apenas confirmar o óbvio. 
              E que cada insight deve aproximar ainda mais os fãs do esporte que amam.
            </p>
          </div>
        </section>

        {/* Nossos Valores */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Meus Valores
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                ⚽ Paixão pelo Futebol
              </h3>
              <p className="text-gray-700">
                Cada análise é escrita com amor pelo esporte. 
                Estatísticas que contam histórias, dados que revelam segredos.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                📊 Análise Profunda
              </h3>
              <p className="text-gray-700">
                Vamos além dos números básicos. Análises que revelam 
                padrões, tendências e insights únicos sobre o jogo.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                🎯 Precisão Técnica
              </h3>
              <p className="text-gray-700">
                Dados confiáveis e metodologias sólidas. 
                Cada insight é baseado em evidências concretas.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                🌟 Inovação Constante
              </h3>
              <p className="text-gray-700">
                Sempre buscando novas formas de analisar o futebol. 
                Tecnologia a serviço da compreensão do esporte.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Quer fazer parte da nossa jornada?
          </h2>
          <p className="text-gray-600 mb-6">
            Junte-se a mim na missão de analisar o futebol com paixão e precisão.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg">
              Ver Análises
            </Button>
            <Button variant="secondary" size="lg">
              Contatar
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
