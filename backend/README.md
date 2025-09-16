# 🦇 Liniker Football Analysis - Backend

> *"Dados que contam histórias, números que revelam segredos"* - Filosofia DracoPunk

## 📋 Visão Geral

Backend Django para o sistema de análise de futebol do Liniker. Uma API robusta e elegante que serve dados sobre análises, estatísticas e insights do mundo do futebol.

## 🚀 Tecnologias

- **Django 4.2.7** - Framework web Python
- **Django REST Framework** - API RESTful
- **Django CORS Headers** - CORS para frontend
- **SQLite** - Banco de dados (desenvolvimento)
- **Pillow** - Processamento de imagens

## 📁 Estrutura do Projeto

```
backend/
├── football_analysis/          # Configurações do projeto Django
│   ├── __init__.py
│   ├── settings.py            # Configurações principais
│   ├── urls.py               # URLs principais
│   ├── wsgi.py               # WSGI config
│   └── asgi.py               # ASGI config
├── posts/                    # App de posts/análises
│   ├── models.py            # Modelos de dados
│   ├── serializers.py       # Serializers da API
│   ├── views.py             # Views da API
│   ├── urls.py              # URLs dos posts
│   └── admin.py             # Interface admin
├── categories/              # App de categorias
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   └── admin.py
├── manage.py                # Script de gerenciamento Django
├── requirements.txt         # Dependências Python
├── init_data.py            # Script de inicialização
└── README.md               # Este arquivo
```

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Python 3.8+
- pip

### Instalação

1. **Instalar dependências:**
```bash
pip install -r requirements.txt
```

2. **Executar migrações:**
```bash
python manage.py makemigrations
python manage.py migrate
```

3. **Inicializar dados:**
```bash
python init_data.py
```

4. **Iniciar servidor:**
```bash
python manage.py runserver
```

## 📊 API Endpoints

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

## 🎯 Modelos de Dados

### Post
- **title**: Título da análise
- **slug**: URL amigável
- **excerpt**: Resumo
- **content**: Conteúdo completo
- **author**: Autor (User)
- **category**: Categoria
- **featured_image**: Imagem destacada
- **status**: Status (draft/published/archived)
- **read_time**: Tempo de leitura em minutos
- **views**: Número de visualizações
- **likes**: Número de curtidas

### Category
- **name**: Nome da categoria
- **slug**: URL amigável
- **description**: Descrição
- **color**: Cor da categoria
- **icon**: Ícone

### Tag
- **name**: Nome da tag
- **slug**: URL amigável

## 🔧 Configurações

### CORS
O backend está configurado para aceitar requisições do frontend React:
- `http://localhost:3000`
- `http://localhost:5173`

### Permissões
- **Posts**: Leitura pública, escrita autenticada
- **Categorias/Tags**: Leitura pública
- **Comentários**: Criação pública, aprovação manual

## 📱 Admin Interface

Acesse o admin Django em: `http://localhost:8000/admin/`

**Credenciais padrão:**
- Usuário: `admin`
- Senha: `admin123`

## 🎨 Filosofia DracoPunk

### Código Poético
- Cada modelo tem propósito claro
- Serializers elegantes e funcionais
- Views que carregam significado

### Tempo Sagrado
- API otimizada para performance
- Paginação automática
- Filtros eficientes

### Amor Global
- Documentação clara e completa
- Código que outros podem amar
- Estrutura sustentável

## 🚀 Deploy

### Produção
1. Configurar variáveis de ambiente
2. Usar PostgreSQL ou MySQL
3. Configurar servidor web (Nginx + Gunicorn)
4. Configurar SSL/HTTPS

### Docker (Opcional)
```bash
# Criar Dockerfile
# Configurar docker-compose.yml
docker-compose up -d
```

## 🤝 Contribuição

1. Siga a filosofia DracoPunk
2. Mantenha o código elegante e funcional
3. Documente mudanças significativas
4. Teste todas as funcionalidades
5. Commit com alma, push com propósito

## 📚 Recursos Adicionais

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Django CORS Headers](https://github.com/adamchainz/django-cors-headers)

---

*"Commit com alma, push com propósito"* 🦇⚽
