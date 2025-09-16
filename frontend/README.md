# 🦇 Scout Blog - Frontend

> *"Código com alma, interface com coração"* - Filosofia DracoPunk

## 📋 Visão Geral

O Scout Blog é um projeto frontend moderno que combina React, Vite e Tailwind CSS para criar uma experiência de usuário elegante e performática. Seguindo a filosofia DracoPunk, cada linha de código carrega propósito e cada interface expressa amor.

## 🚀 Tecnologias

- **React 18** - Biblioteca de interface de usuário
- **Vite** - Build tool ultra-rápido
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Roteamento client-side
- **Context API** - Gerenciamento de estado

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes de interface (Button, Input, etc.)
│   ├── layout/         # Componentes de layout (Header, Footer, etc.)
│   └── forms/          # Componentes de formulário
├── pages/              # Páginas da aplicação
├── contexts/           # Contextos React (estado global)
├── hooks/              # Hooks customizados
├── utils/              # Funções utilitárias
├── services/           # Serviços (API calls, etc.)
├── assets/             # Recursos estáticos
│   ├── images/         # Imagens
│   └── icons/          # Ícones
└── styles/             # Estilos globais
```

## 🛠️ Comandos Disponíveis

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Lint (verificar qualidade do código)
npm run lint
```

## 🎨 Padrões de Código

### Componentes

Todos os componentes seguem a filosofia DracoPunk:

```jsx
/**
 * 🦇 ComponentName - Descrição poética
 * 
 * Explicação do propósito e filosofia do componente.
 * Seguindo a sabedoria de Luminha e Adriana.
 */
const ComponentName = ({ prop1, prop2 }) => {
  // Lógica elegante e funcional
  
  return (
    <div className="classes-que-expressam-alma">
      {/* Conteúdo com propósito */}
    </div>
  );
};

export default ComponentName;
```

### Nomenclatura

- **Componentes**: PascalCase (`Button`, `Header`)
- **Arquivos**: PascalCase para componentes (`Button.jsx`)
- **Funções**: camelCase (`handleClick`, `fetchData`)
- **Constantes**: UPPER_SNAKE_CASE (`API_URL`, `MAX_RETRIES`)

### Estrutura de Pastas

- **components/ui**: Componentes básicos reutilizáveis
- **components/layout**: Componentes de estrutura da página
- **pages**: Páginas completas da aplicação
- **contexts**: Gerenciamento de estado global
- **hooks**: Lógica reutilizável
- **utils**: Funções auxiliares

## 🎯 Filosofia DracoPunk

### Código Poético
- Cada linha deve ter propósito
- Nomes significativos e expressivos
- Comentários que explicam o "porquê", não o "o que"

### Tempo Sagrado
- Performance é prioridade
- Interfaces responsivas e fluidas
- Experiência do usuário otimizada

### Amor Global
- Tecnologia que conecta pessoas
- Interfaces que carregam alma
- Código que respeita quem o usa

## 🔧 Configuração do Ambiente

### Pré-requisitos
- Node.js (versão LTS)
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <repository-url>

# Entre no diretório frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## 📱 Responsividade

O projeto é totalmente responsivo, seguindo a abordagem mobile-first:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Sistema de Design

### Cores
- **Primary**: Purple (600, 700)
- **Secondary**: Gray (200, 300, 700, 900)
- **Accent**: Indigo (400, 500)
- **Status**: Red (600, 700), Green (600, 700)

### Tipografia
- **Headings**: Font-bold
- **Body**: Font-medium
- **Captions**: Font-normal

### Espaçamento
- Baseado no sistema de espaçamento do Tailwind (4px, 8px, 16px, 24px, 32px, etc.)

## 🚀 Deploy

### Build de Produção
```bash
npm run build
```

### Preview Local
```bash
npm run preview
```

## 🤝 Contribuição

1. Siga a filosofia DracoPunk
2. Mantenha o código poético e funcional
3. Documente mudanças significativas
4. Teste em diferentes dispositivos
5. Commit com alma, push com propósito

## 📚 Recursos Adicionais

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)

---

*"Commit com alma, push com propósito"* 🦇
