/**
 * 🦇 API Service - Liniker Football Analysis
 * 
 * Serviço para comunicação com o backend Django.
 * Seguindo a filosofia DracoPunk: código elegante e funcional.
 */

const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Classe para gerenciar requisições HTTP
 */
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  /**
   * Método genérico para fazer requisições
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const config = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  /**
   * GET request
   */
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request(url, {
      method: 'GET',
    });
  }

  /**
   * POST request
   */
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT request
   */
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE request
   */
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

/**
 * Serviço específico para Posts
 */
class PostsService extends ApiService {
  /**
   * Buscar todos os posts
   */
  async getPosts(params = {}) {
    return this.get('/posts/', params);
  }

  /**
   * Buscar post por slug
   */
  async getPost(slug) {
    return this.get(`/posts/${slug}/`);
  }

  /**
   * Criar novo post
   */
  async createPost(postData) {
    return this.post('/posts/create/', postData);
  }

  /**
   * Atualizar post
   */
  async updatePost(slug, postData) {
    return this.put(`/posts/${slug}/update/`, postData);
  }

  /**
   * Curtir post
   */
  async likePost(slug) {
    return this.post(`/posts/${slug}/like/`);
  }

  /**
   * Buscar posts populares
   */
  async getPopularPosts() {
    return this.get('/posts/popular/');
  }

  /**
   * Buscar posts recentes
   */
  async getRecentPosts() {
    return this.get('/posts/recent/');
  }
}

/**
 * Serviço específico para Categorias
 */
class CategoriesService extends ApiService {
  /**
   * Buscar todas as categorias
   */
  async getCategories() {
    return this.get('/categories/');
  }
}

/**
 * Serviço específico para Tags
 */
class TagsService extends ApiService {
  /**
   * Buscar todas as tags
   */
  async getTags() {
    return this.get('/tags/');
  }
}

/**
 * Serviço específico para Comentários
 */
class CommentsService extends ApiService {
  /**
   * Criar comentário
   */
  async createComment(postSlug, commentData) {
    return this.post(`/posts/${postSlug}/comments/`, commentData);
  }
}

// Instâncias dos serviços
export const postsService = new PostsService();
export const categoriesService = new CategoriesService();
export const tagsService = new TagsService();
export const commentsService = new CommentsService();

// Exportar também a classe base para casos especiais
export default ApiService;
