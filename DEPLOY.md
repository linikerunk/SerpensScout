# Deploy no Render - Serpens Scout ⚽

## 📋 Pré-requisitos

- Conta no [Render](https://render.com)
- Repositório Git (GitHub, GitLab ou Bitbucket)
- Código commitado e pushado

## 🚀 Passos para Deploy

### 1️⃣ Preparar o Repositório

```bash
# Adicionar arquivos ao git
git add .

# Commit
git commit -m "feat: add Render deployment configuration"

# Push para o repositório
git push origin main
```

### 2️⃣ Conectar ao Render

1. Acesse [dashboard.render.com](https://dashboard.render.com)
2. Clique em **"New +"** → **"Blueprint"**
3. Conecte seu repositório Git
4. Selecione o repositório `serpensScout`

### 3️⃣ Deploy Automático

O Render lerá o arquivo `render.yaml` e criará automaticamente:

✅ **Backend (Django API)**
- Nome: `serpens-scout-api`
- Runtime: Python 3.11
- Plan: Free

✅ **Frontend (React)**
- Nome: `serpens-scout-frontend`
- Runtime: Static Site
- Plan: Free

✅ **Database (PostgreSQL)**
- Nome: `serpens-scout-db`
- Plan: Free (512MB)

### 4️⃣ Configurar Variáveis de Ambiente (Opcional)

No dashboard do Render, em cada serviço, você pode adicionar:

**Backend:**
- `SECRET_KEY` - Gerado automaticamente ✅
- `DEBUG` - `False` ✅
- `ALLOWED_HOSTS` - `.onrender.com` ✅
- `DATABASE_URL` - Conectado automaticamente ✅

**Frontend:**
- `VITE_API_URL` - URL da API (ex: `https://serpens-scout-api.onrender.com`)

### 5️⃣ Aguardar Deploy

- ⏱️ Backend: ~5-10 minutos
- ⏱️ Frontend: ~3-5 minutos
- ⏱️ Database: ~2 minutos

## 🌐 URLs de Acesso

Após o deploy, você terá:

- **Frontend:** `https://serpens-scout-frontend.onrender.com`
- **API:** `https://serpens-scout-api.onrender.com`
- **Admin Django:** `https://serpens-scout-api.onrender.com/admin`

## 🔧 Configuração do Django para Produção

O projeto já está configurado com:

✅ **Gunicorn** - WSGI HTTP Server
✅ **WhiteNoise** - Servir arquivos estáticos
✅ **PostgreSQL** - Database em produção
✅ **CORS Headers** - Permitir frontend acessar API

### Configurações Necessárias em `settings.py`:

```python
import dj_database_url
import os

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DEBUG', 'False') == 'True'

# Allowed hosts
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', 'localhost').split(',')

# Database
if os.environ.get('DATABASE_URL'):
    DATABASES = {
        'default': dj_database_url.config(
            default=os.environ.get('DATABASE_URL'),
            conn_max_age=600
        )
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

# Static files (WhiteNoise)
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Add this
    # ... outros middlewares
]

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# CORS
CORS_ALLOWED_ORIGINS = [
    "https://serpens-scout-frontend.onrender.com",
]
```

## 📦 Estrutura de Arquivos

```
serpensScout/
├── backend/
│   ├── core/
│   ├── manage.py
│   ├── requirements.txt     # ✅ Com dependências de produção
│   └── build.sh            # ✅ Script de build
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── render.yaml             # ✅ Configuração do Render
```

## 🐛 Troubleshooting

### Erro de Build no Backend

```bash
# Verificar logs
render logs serpens-scout-api

# Soluções comuns:
# 1. Verificar requirements.txt
# 2. Verificar Python version (3.11)
# 3. Verificar se gunicorn está instalado
```

### Erro de Build no Frontend

```bash
# Verificar logs
render logs serpens-scout-frontend

# Soluções comuns:
# 1. Verificar package.json
# 2. Verificar Node version (18.17)
# 3. Limpar cache: Settings → Clear Build Cache
```

### Database Connection Error

```bash
# Verificar se DATABASE_URL está configurada
# No dashboard: Environment → DATABASE_URL
```

## 🔄 Re-deploy

O Render faz **deploy automático** a cada push para a branch `main`:

```bash
git add .
git commit -m "feat: nova funcionalidade"
git push origin main
# Render detecta e faz deploy automaticamente ✅
```

### Deploy Manual

1. Acesse o dashboard do serviço
2. Clique em **"Manual Deploy"**
3. Selecione a branch
4. Clique em **"Deploy"**

## 💰 Custos

**Plan Free:**
- ✅ Backend: Free
- ✅ Frontend: Free
- ✅ Database: Free (512MB)
- ⚠️ Limitações:
  - Sleep após 15min de inatividade
  - 750 horas/mês
  - Builds: 500 min/mês

**Plan Starter ($7/mês por serviço):**
- ✅ Sem sleep
- ✅ Mais recursos
- ✅ Custom domains

## 🎯 Próximos Passos

1. ✅ Deploy concluído
2. 🌐 Configurar domínio customizado (opcional)
3. 🔒 Configurar HTTPS (automático no Render)
4. 📊 Monitorar logs e métricas
5. 🚀 Adicionar CI/CD workflows

## 📚 Recursos

- [Documentação Render](https://render.com/docs)
- [Deploy Django](https://render.com/docs/deploy-django)
- [Deploy React](https://render.com/docs/deploy-create-react-app)
- [Blueprint Spec](https://render.com/docs/blueprint-spec)

## ✅ Checklist Final

- [ ] Código commitado e pushado
- [ ] render.yaml criado
- [ ] requirements.txt atualizado
- [ ] settings.py configurado para produção
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy realizado com sucesso
- [ ] URLs funcionando
- [ ] Database conectada
- [ ] Static files servindo corretamente

---

**Desenvolvido com ❤️ por Serpens Scout Team**
