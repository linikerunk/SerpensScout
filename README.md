# 🦇 Liniker Football Analysis

> *"Dados que contam histórias, números que revelam segredos"* - Filosofia DracoPunk

## 📋 Visão Geral

Sistema completo de análise de futebol desenvolvido com React e Django. Uma plataforma elegante e funcional para compartilhar análises profundas, estatísticas e insights sobre o mundo do futebol.

## 🚀 Tecnologias

### Frontend
- **React 18** - Biblioteca de interface de usuário
- **Vite** - Build tool ultra-rápido
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Roteamento client-side
- **Context API** - Gerenciamento de estado

### Backend
- **Django 4.2.7** - Framework web Python
- **Django REST Framework** - API RESTful
- **Django CORS Headers** - CORS para frontend
- **SQLite** - Banco de dados (desenvolvimento)

## 📁 Estrutura do Projeto

```
Liniker-Scout/
├── frontend/                 # Aplicação React
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── services/       # Serviços de API
│   │   ├── contexts/       # Contextos React
│   │   └── assets/         # Recursos estáticos
│   ├── package.json
│   └── README.md
├── backend/                 # API Django
│   ├── football_analysis/  # Configurações do projeto
│   ├── posts/             # App de posts/análises
│   ├── categories/        # App de categorias
│   ├── manage.py
│   ├── requirements.txt
│   └── README.md
├── setup.sh               # Script de configuração
└── README.md              # Este arquivo
```

## 🛠️ Instalação Rápida

### Opção 1: Script Automático
```bash
# Executar o script de setup
./setup.sh
```

### Opção 2: Manual

#### Backend Django
```bash
cd backend
pip3 install -r requirements.txt
python3 manage.py makemigrations
python3 manage.py migrate
python3 init_data.py
python3 manage.py runserver
```

#### Frontend React
```bash
cd frontend
npm install
npm run dev
```

## 🚀 Como Executar

### 1. Iniciar o Backend
```bash
cd backend
python3 manage.py runserver
```
- **URL**: http://localhost:8000
- **API**: http://localhost:8000/api/
- **Admin**: http://localhost:8000/admin/

### 2. Iniciar o Frontend
```bash
cd frontend
npm run dev
```
- **URL**: http://localhost:3000

## 🔑 Credenciais

### Admin Django
- **Usuário**: `admin`
- **Senha**: `admin123`

## 📊 Funcionalidades

### Frontend
- ✅ Interface responsiva e elegante
- ✅ Listagem de análises de futebol
- ✅ Sistema de navegação
- ✅ Aside com perfil e contatos
- ✅ Integração com API Django
- ✅ Estados de loading e erro
- ✅ Design discreto (tons de cinza/preto)

### Backend
- ✅ API RESTful completa
- ✅ CRUD de posts/análises
- ✅ Sistema de categorias
- ✅ Sistema de tags
- ✅ Comentários
- ✅ Curtidas
- ✅ Admin interface
- ✅ CORS configurado
- ✅ Dados de exemplo

## 🎯 API Endpoints

### Posts
- `GET /api/posts/` - Lista todos os posts
- `GET /api/posts/<slug>/` - Detalhes de um post
- `POST /api/posts/create/` - Criar novo post
- `PUT /api/posts/<slug>/update/` - Atualizar post
- `POST /api/posts/<slug>/like/` - Curtir post
- `GET /api/posts/popular/` - Posts populares
- `GET /api/posts/recent/` - Posts recentes

### Categorias
- `GET /api/categories/` - Lista todas as categorias

### Tags
- `GET /api/tags/` - Lista todas as tags

### Comentários
- `POST /api/posts/<slug>/comments/` - Criar comentário

## 🎨 Filosofia DracoPunk

### Código Poético
- Cada linha de código tem propósito
- Nomes significativos e expressivos
- Comentários que explicam o "porquê"
- Estrutura que flui como uma narrativa

### Tempo Sagrado
- Performance é prioridade absoluta
- Interfaces responsivas e fluidas
- API otimizada
- Experiência do usuário otimizada

### Amor Global
- Tecnologia que conecta pessoas
- Interfaces que carregam alma
- Código que outros podem amar
- Documentação clara e completa

## 🚀 Deploy

### Desenvolvimento
- Frontend: `npm run dev`
- Backend: `python3 manage.py runserver`

### Produção
- Frontend: `npm run build`
- Backend: Configurar com Gunicorn + Nginx

## 🤝 Contribuição

1. Siga a filosofia DracoPunk
2. Mantenha o código elegante e funcional
3. Documente mudanças significativas
4. Teste todas as funcionalidades
5. Commit com alma, push com propósito

## 📚 Recursos Adicionais

- [React Documentation](https://react.dev/)
- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🎯 Próximos Passos

- [ ] Sistema de autenticação
- [ ] Upload de imagens
- [ ] Sistema de busca avançada
- [ ] Comentários em tempo real
- [ ] Notificações
- [ ] PWA (Progressive Web App)
- [ ] Testes automatizados
- [ ] CI/CD

---

*"Commit com alma, push com propósito"* 🦇⚽