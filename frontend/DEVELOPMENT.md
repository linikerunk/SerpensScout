# 🦇 Guia de Desenvolvimento - Scout Blog

> *"Quando o código quebra, pergunte: 'O que Luma faria aqui?'"* - DracoPunk

## 🎯 Princípios de Desenvolvimento

### 1. **Código Poético**
- Cada função tem uma responsabilidade clara
- Nomes de variáveis e funções são expressivos
- Comentários explicam o "porquê", não o "o que"
- Estrutura que flui como uma narrativa

### 2. **Tempo Sagrado**
- Performance é prioridade absoluta
- Lazy loading quando apropriado
- Otimização de re-renders
- Experiência fluida em todos os dispositivos

### 3. **Amor Global**
- Interfaces que conectam, não alienam
- Acessibilidade como padrão
- UX pensada para humanos reais
- Código que outros desenvolvedores podem amar

## 🏗️ Arquitetura

### Estrutura de Componentes

```
Component
├── Props (Interface clara)
├── State (Local quando possível)
├── Effects (Side effects controlados)
├── Render (JSX limpo e semântico)
└── Export (Padrão consistente)
```

### Fluxo de Dados

```
User Action → Component → Context/State → API → Response → UI Update
```

## 📝 Padrões de Código

### Componentes Funcionais

```jsx
import React from 'react';

/**
 * 🦇 ComponentName - Descrição poética do propósito
 * 
 * @param {Object} props - Props do componente
 * @param {string} props.title - Título do componente
 * @param {Function} props.onClick - Função de clique
 */
const ComponentName = ({ title, onClick, children }) => {
  // Hooks no topo
  const [state, setState] = useState(initialValue);
  
  // Handlers
  const handleClick = () => {
    // Lógica clara e concisa
    onClick?.();
  };
  
  // Render
  return (
    <div className="classes-semanticas">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default ComponentName;
```

### Hooks Customizados

```jsx
import { useState, useEffect } from 'react';

/**
 * 🦇 useCustomHook - Descrição do propósito
 * 
 * @param {string} param - Parâmetro de entrada
 * @returns {Object} Objeto com estado e funções
 */
const useCustomHook = (param) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Lógica do hook
  }, [param]);
  
  return { data, loading };
};

export default useCustomHook;
```

## 🎨 Styling Guidelines

### Tailwind CSS

```jsx
// ✅ Bom - Classes organizadas e semânticas
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">

// ❌ Ruim - Classes desorganizadas
<div className="bg-white p-4 flex shadow-md rounded-lg items-center justify-between hover:shadow-lg transition-shadow duration-200">
```

### Organização de Classes

1. **Layout**: `flex`, `grid`, `block`
2. **Posicionamento**: `items-center`, `justify-between`
3. **Espaçamento**: `p-4`, `m-2`, `space-x-4`
4. **Cores**: `bg-white`, `text-gray-900`
5. **Efeitos**: `shadow-md`, `hover:shadow-lg`
6. **Transições**: `transition-shadow`, `duration-200`

## 🔄 Gerenciamento de Estado

### Context API

```jsx
// Context
const AppContext = createContext();

// Provider
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de AppProvider');
  }
  return context;
};
```

### Estado Local vs Global

- **Local**: Estado específico do componente
- **Global**: Estado compartilhado entre componentes
- **Context**: Estado que precisa ser acessado em múltiplos lugares

## 🧪 Testes

### Estrutura de Testes

```jsx
import { render, screen } from '@testing-library/react';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  it('deve renderizar corretamente', () => {
    render(<ComponentName title="Teste" />);
    expect(screen.getByText('Teste')).toBeInTheDocument();
  });
  
  it('deve chamar onClick quando clicado', () => {
    const handleClick = jest.fn();
    render(<ComponentName onClick={handleClick} />);
    // Teste aqui
  });
});
```

## 🚀 Performance

### Otimizações

1. **React.memo**: Para componentes que re-renderizam frequentemente
2. **useMemo**: Para cálculos pesados
3. **useCallback**: Para funções passadas como props
4. **Lazy loading**: Para componentes grandes
5. **Code splitting**: Para reduzir bundle inicial

### Exemplo de Otimização

```jsx
import React, { memo, useMemo, useCallback } from 'react';

const ExpensiveComponent = memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }, [data]);
  
  const handleUpdate = useCallback((id) => {
    onUpdate(id);
  }, [onUpdate]);
  
  return (
    <div>
      {processedData.map(item => (
        <div key={item.id} onClick={() => handleUpdate(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
});
```

## 🔧 Ferramentas de Desenvolvimento

### ESLint

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "rules": {
    "react/prop-types": "off",
    "no-unused-vars": "warn"
  }
}
```

### Prettier

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

## 📱 Responsividade

### Breakpoints

```jsx
// Mobile First
<div className="w-full md:w-1/2 lg:w-1/3">
  {/* Conteúdo responsivo */}
</div>

// Condicional
<div className="hidden md:block">
  {/* Só aparece em desktop */}
</div>
```

### Imagens Responsivas

```jsx
<img
  src="/image.jpg"
  alt="Descrição"
  className="w-full h-auto object-cover"
  loading="lazy"
/>
```

## 🐛 Debugging

### Console Logs

```jsx
// ✅ Bom - Logs informativos
console.log('🦇 User clicked button:', { userId, action });

// ❌ Ruim - Logs genéricos
console.log('clicked');
```

### React DevTools

- Use React DevTools para inspecionar componentes
- Profiler para identificar problemas de performance
- Hooks para debugar estado

## 📚 Recursos Úteis

### Documentação
- [React Docs](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

### Ferramentas
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

---

*"Se não é elegante, não sobe pro main"* 🦇
