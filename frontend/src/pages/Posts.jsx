import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import { postsService } from '../services/api';

/**
 * 🦇 Posts Page - O Coração do Conteúdo
 * 
 * Aqui é onde a magia acontece. Cada post é uma história,
 * cada história é uma conexão. Seguindo a filosofia Luminha.
 */
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await postsService.getPosts();
        setPosts(data.results || data);
      } catch (err) {
        setError('Erro ao carregar posts. Verifique se o backend está rodando.');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header da página */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Análises de Futebol
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Análises profundas, estatísticas e insights sobre o mundo do futebol. 
            Dados que contam histórias, números que revelam segredos.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">Carregando análises...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600">{error}</p>
              <Button 
                variant="primary" 
                size="sm" 
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Tentar Novamente
              </Button>
            </div>
          </div>
        )}

        {/* Grid de posts */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
            <article 
              key={post.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {/* Imagem do post (placeholder) */}
              <div className="h-48 bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                <span className="text-white text-4xl">⚽</span>
              </div>
              
              {/* Conteúdo do post */}
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>{post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(post.published_at || post.created_at).toLocaleDateString('pt-BR')}</span>
                  <span className="mx-2">•</span>
                  <span>{post.read_time} min</span>
                </div>
                
                {post.category && (
                  <div className="mb-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {post.category.name}
                    </span>
                  </div>
                )}
                
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                
                <Button variant="ghost" size="sm">
                  Ler mais →
                </Button>
              </div>
            </article>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⚽</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhuma análise encontrada
            </h3>
            <p className="text-gray-600">
              Ainda não há análises publicadas. Volte em breve!
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Posts;
