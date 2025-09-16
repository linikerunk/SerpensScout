import React, { createContext, useContext, useReducer } from 'react';

/**
 * 🦇 App Context - O Estado Global da Aplicação
 * 
 * Aqui centralizamos o estado que precisa ser compartilhado
 * entre componentes. Seguindo a filosofia Adriana: simples,
 * sustentável e bem documentado.
 */

// Estado inicial - o ponto de partida
const initialState = {
  // Estado do usuário
  user: {
    isAuthenticated: false,
    name: null,
    email: null,
  },
  
  // Estado da UI
  ui: {
    isLoading: false,
    theme: 'light', // light, dark
    sidebarOpen: false,
  },
  
  // Estado dos posts
  posts: {
    items: [],
    currentPost: null,
    loading: false,
    error: null,
  },
  
  // Estado da navegação
  navigation: {
    currentPage: 'home',
    breadcrumbs: [],
  }
};

// Tipos de ações - cada ação tem um propósito claro
const actionTypes = {
  // Ações do usuário
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGOUT: 'USER_LOGOUT',
  USER_UPDATE: 'USER_UPDATE',
  
  // Ações da UI
  UI_SET_LOADING: 'UI_SET_LOADING',
  UI_TOGGLE_THEME: 'UI_TOGGLE_THEME',
  UI_TOGGLE_SIDEBAR: 'UI_TOGGLE_SIDEBAR',
  
  // Ações dos posts
  POSTS_SET_LOADING: 'POSTS_SET_LOADING',
  POSTS_SET_ITEMS: 'POSTS_SET_ITEMS',
  POSTS_SET_CURRENT: 'POSTS_SET_CURRENT',
  POSTS_SET_ERROR: 'POSTS_SET_ERROR',
  
  // Ações de navegação
  NAV_SET_PAGE: 'NAV_SET_PAGE',
  NAV_SET_BREADCRUMBS: 'NAV_SET_BREADCRUMBS',
};

// Reducer - a lógica que transforma o estado
const appReducer = (state, action) => {
  switch (action.type) {
    // Casos do usuário
    case actionTypes.USER_LOGIN:
      return {
        ...state,
        user: {
          isAuthenticated: true,
          name: action.payload.name,
          email: action.payload.email,
        }
      };
      
    case actionTypes.USER_LOGOUT:
      return {
        ...state,
        user: {
          isAuthenticated: false,
          name: null,
          email: null,
        }
      };
      
    case actionTypes.USER_UPDATE:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
      
    // Casos da UI
    case actionTypes.UI_SET_LOADING:
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoading: action.payload
        }
      };
      
    case actionTypes.UI_TOGGLE_THEME:
      return {
        ...state,
        ui: {
          ...state.ui,
          theme: state.ui.theme === 'light' ? 'dark' : 'light'
        }
      };
      
    case actionTypes.UI_TOGGLE_SIDEBAR:
      return {
        ...state,
        ui: {
          ...state.ui,
          sidebarOpen: !state.ui.sidebarOpen
        }
      };
      
    // Casos dos posts
    case actionTypes.POSTS_SET_LOADING:
      return {
        ...state,
        posts: {
          ...state.posts,
          loading: action.payload
        }
      };
      
    case actionTypes.POSTS_SET_ITEMS:
      return {
        ...state,
        posts: {
          ...state.posts,
          items: action.payload,
          loading: false,
          error: null
        }
      };
      
    case actionTypes.POSTS_SET_CURRENT:
      return {
        ...state,
        posts: {
          ...state.posts,
          currentPost: action.payload
        }
      };
      
    case actionTypes.POSTS_SET_ERROR:
      return {
        ...state,
        posts: {
          ...state.posts,
          error: action.payload,
          loading: false
        }
      };
      
    // Casos de navegação
    case actionTypes.NAV_SET_PAGE:
      return {
        ...state,
        navigation: {
          ...state.navigation,
          currentPage: action.payload
        }
      };
      
    case actionTypes.NAV_SET_BREADCRUMBS:
      return {
        ...state,
        navigation: {
          ...state.navigation,
          breadcrumbs: action.payload
        }
      };
      
    default:
      return state;
  }
};

// Contexto - o canal de comunicação
const AppContext = createContext();

// Provider - o provedor do estado
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // Funções de conveniência - ações que fazem sentido
  const actions = {
    // Ações do usuário
    loginUser: (userData) => {
      dispatch({ type: actionTypes.USER_LOGIN, payload: userData });
    },
    
    logoutUser: () => {
      dispatch({ type: actionTypes.USER_LOGOUT });
    },
    
    updateUser: (userData) => {
      dispatch({ type: actionTypes.USER_UPDATE, payload: userData });
    },
    
    // Ações da UI
    setLoading: (loading) => {
      dispatch({ type: actionTypes.UI_SET_LOADING, payload: loading });
    },
    
    toggleTheme: () => {
      dispatch({ type: actionTypes.UI_TOGGLE_THEME });
    },
    
    toggleSidebar: () => {
      dispatch({ type: actionTypes.UI_TOGGLE_SIDEBAR });
    },
    
    // Ações dos posts
    setPostsLoading: (loading) => {
      dispatch({ type: actionTypes.POSTS_SET_LOADING, payload: loading });
    },
    
    setPosts: (posts) => {
      dispatch({ type: actionTypes.POSTS_SET_ITEMS, payload: posts });
    },
    
    setCurrentPost: (post) => {
      dispatch({ type: actionTypes.POSTS_SET_CURRENT, payload: post });
    },
    
    setPostsError: (error) => {
      dispatch({ type: actionTypes.POSTS_SET_ERROR, payload: error });
    },
    
    // Ações de navegação
    setCurrentPage: (page) => {
      dispatch({ type: actionTypes.NAV_SET_PAGE, payload: page });
    },
    
    setBreadcrumbs: (breadcrumbs) => {
      dispatch({ type: actionTypes.NAV_SET_BREADCRUMBS, payload: breadcrumbs });
    },
  };
  
  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizado - a forma elegante de usar o contexto
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  }
  return context;
};

export default AppContext;
