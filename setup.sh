#!/bin/bash

# 🦇 Liniker Football Analysis - Setup Script
# Seguindo a filosofia DracoPunk: automação com propósito

echo "🦇 Iniciando setup do Liniker Football Analysis..."
echo "=================================================="

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para imprimir mensagens coloridas
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar se Python está instalado
print_status "Verificando Python..."
if command -v python3 &> /dev/null; then
    print_success "Python3 encontrado: $(python3 --version)"
else
    print_error "Python3 não encontrado. Instale Python3 primeiro."
    exit 1
fi

# Verificar se Node.js está instalado
print_status "Verificando Node.js..."
if command -v node &> /dev/null; then
    print_success "Node.js encontrado: $(node --version)"
else
    print_error "Node.js não encontrado. Instale Node.js primeiro."
    exit 1
fi

# Setup do Backend Django
print_status "Configurando backend Django..."
cd backend

# Instalar dependências Python
print_status "Instalando dependências Python..."
if pip3 install -r requirements.txt; then
    print_success "Dependências Python instaladas com sucesso!"
else
    print_warning "Falha ao instalar dependências Python. Tentando com --break-system-packages..."
    pip3 install -r requirements.txt --break-system-packages
fi

# Executar migrações
print_status "Executando migrações do Django..."
python3 manage.py makemigrations
python3 manage.py migrate

# Inicializar dados
print_status "Inicializando dados de exemplo..."
python3 init_data.py

print_success "Backend Django configurado com sucesso!"

# Setup do Frontend React
print_status "Configurando frontend React..."
cd ../frontend

# Instalar dependências Node.js
print_status "Instalando dependências Node.js..."
if npm install; then
    print_success "Dependências Node.js instaladas com sucesso!"
else
    print_error "Falha ao instalar dependências Node.js."
    exit 1
fi

print_success "Frontend React configurado com sucesso!"

# Voltar para o diretório raiz
cd ..

echo ""
echo "=================================================="
echo "🎉 Setup concluído com sucesso!"
echo ""
echo "📋 Próximos passos:"
echo ""
echo "1. Iniciar o backend Django:"
echo "   cd backend && python3 manage.py runserver"
echo ""
echo "2. Iniciar o frontend React (em outro terminal):"
echo "   cd frontend && npm run dev"
echo ""
echo "3. Acessar a aplicação:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8000/api/"
echo "   Admin Django: http://localhost:8000/admin/"
echo ""
echo "4. Credenciais do admin:"
echo "   Usuário: admin"
echo "   Senha: admin123"
echo ""
echo "🦇 Commit com alma, push com propósito!"
echo "=================================================="
