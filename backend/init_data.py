#!/usr/bin/env python
"""
🦇 Script de Inicialização - Liniker Football Analysis

Seguindo a filosofia DracoPunk: dados que carregam alma e propósito.
Cada categoria e post tem significado e cada tag conta uma história.
"""
import os
import sys
import django

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'football_analysis.settings')
django.setup()

from django.contrib.auth.models import User
from posts.models import Post, Category, Tag, PostTag
from categories.models import Category as CategoryModel


def create_superuser():
    """Cria um superusuário para administração."""
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser(
            username='admin',
            email='admin@liniker.com',
            password='admin123'
        )
        print("✅ Superusuário 'admin' criado com sucesso!")
    else:
        print("ℹ️  Superusuário 'admin' já existe.")


def create_categories():
    """Cria categorias para as análises de futebol."""
    categories_data = [
        {
            'name': 'Táticas',
            'slug': 'taticas',
            'description': 'Análises táticas profundas sobre sistemas de jogo, formações e estratégias.',
            'color': '#3B82F6',
            'icon': '🎯'
        },
        {
            'name': 'Estatísticas',
            'slug': 'estatisticas',
            'description': 'Análises baseadas em dados e estatísticas avançadas do futebol.',
            'color': '#10B981',
            'icon': '📊'
        },
        {
            'name': 'Análise de Jogadores',
            'slug': 'analise-jogadores',
            'description': 'Análises detalhadas sobre performance e características dos jogadores.',
            'color': '#F59E0B',
            'icon': '⚽'
        },
        {
            'name': 'Análise de Times',
            'slug': 'analise-times',
            'description': 'Análises sobre performance coletiva e características dos times.',
            'color': '#EF4444',
            'icon': '🏆'
        },
        {
            'name': 'Tecnologia no Futebol',
            'slug': 'tecnologia-futebol',
            'description': 'Como a tecnologia está transformando o futebol moderno.',
            'color': '#8B5CF6',
            'icon': '💻'
        }
    ]
    
    for cat_data in categories_data:
        category, created = Category.objects.get_or_create(
            slug=cat_data['slug'],
            defaults=cat_data
        )
        if created:
            print(f"✅ Categoria '{category.name}' criada com sucesso!")
        else:
            print(f"ℹ️  Categoria '{category.name}' já existe.")


def create_tags():
    """Cria tags para categorizar os posts."""
    tags_data = [
        'Futebol', 'Análise', 'Estatísticas', 'Táticas', 'Formação',
        'Performance', 'Dados', 'Tecnologia', 'Scouting', 'Tendências',
        'Messi', 'Ronaldo', 'Barcelona', 'Real Madrid', 'Premier League',
        'Champions League', 'Copa do Mundo', 'Brasileirão', 'xG', 'xA'
    ]
    
    for tag_name in tags_data:
        tag, created = Tag.objects.get_or_create(
            name=tag_name,
            defaults={'slug': tag_name.lower().replace(' ', '-')}
        )
        if created:
            print(f"✅ Tag '{tag.name}' criada com sucesso!")
        else:
            print(f"ℹ️  Tag '{tag.name}' já existe.")


def create_sample_posts():
    """Cria posts de exemplo para demonstração."""
    # Buscar usuário admin
    admin_user = User.objects.get(username='admin')
    
    # Buscar categorias
    taticas = Category.objects.get(slug='taticas')
    estatisticas = Category.objects.get(slug='estatisticas')
    jogadores = Category.objects.get(slug='analise-jogadores')
    
    posts_data = [
        {
            'title': 'Análise Tática: O 4-3-3 Moderno',
            'slug': 'analise-tatica-4-3-3-moderno',
            'excerpt': 'Como o sistema 4-3-3 evoluiu e se tornou a base tática dos grandes times europeus.',
            'content': '''
            <h2>Introdução</h2>
            <p>O sistema 4-3-3 não é apenas uma formação, é uma filosofia de jogo que revolucionou o futebol moderno.</p>
            
            <h2>Evolução Histórica</h2>
            <p>Desde sua popularização pelo Barcelona de Guardiola até os dias atuais, o 4-3-3 passou por diversas adaptações.</p>
            
            <h2>Características Principais</h2>
            <ul>
                <li>Controle de posse de bola</li>
                <li>Pressing alto e organizado</li>
                <li>Mobilidade dos jogadores</li>
                <li>Amplitude e profundidade</li>
            </ul>
            
            <h2>Conclusão</h2>
            <p>O 4-3-3 moderno continua sendo uma das formações mais eficazes do futebol atual.</p>
            ''',
            'category': taticas,
            'status': 'published',
            'read_time': 8,
            'meta_description': 'Análise profunda sobre o sistema 4-3-3 moderno e sua evolução no futebol.',
            'meta_keywords': '4-3-3, tática, futebol, formação, análise'
        },
        {
            'title': 'Estatísticas que Importam: xG e xA',
            'slug': 'estatisticas-xg-xa-futebol',
            'excerpt': 'Entendendo Expected Goals e Expected Assists para uma análise mais precisa do futebol.',
            'content': '''
            <h2>O que é xG (Expected Goals)?</h2>
            <p>Expected Goals é uma métrica que avalia a qualidade das chances criadas, não apenas a quantidade de gols.</p>
            
            <h2>O que é xA (Expected Assists)?</h2>
            <p>Expected Assists mede a qualidade dos passes que levam a chances de gol.</p>
            
            <h2>Como Interpretar</h2>
            <p>Essas métricas nos ajudam a entender melhor o desempenho real dos jogadores e times.</p>
            
            <h2>Exemplos Práticos</h2>
            <p>Vamos analisar casos reais de como xG e xA revelam insights importantes.</p>
            ''',
            'category': estatisticas,
            'status': 'published',
            'read_time': 6,
            'meta_description': 'Guia completo sobre Expected Goals (xG) e Expected Assists (xA) no futebol.',
            'meta_keywords': 'xG, xA, estatísticas, futebol, análise, dados'
        },
        {
            'title': 'Análise de Performance: Messi vs Ronaldo',
            'slug': 'analise-performance-messi-ronaldo',
            'excerpt': 'Uma análise estatística profunda comparando os dois maiores jogadores da era moderna.',
            'content': '''
            <h2>Introdução</h2>
            <p>Lionel Messi e Cristiano Ronaldo: dois gênios que definiram uma era do futebol.</p>
            
            <h2>Métricas de Comparação</h2>
            <ul>
                <li>Gols por temporada</li>
                <li>Assistências</li>
                <li>Chances criadas</li>
                <li>Eficiência em finalizações</li>
            </ul>
            
            <h2>Análise por Competições</h2>
            <p>Como cada um se destaca em diferentes contextos e competições.</p>
            
            <h2>Legado e Impacto</h2>
            <p>O impacto de ambos no futebol moderno e suas contribuições únicas.</p>
            ''',
            'category': jogadores,
            'status': 'published',
            'read_time': 12,
            'meta_description': 'Análise estatística completa comparando Messi e Ronaldo.',
            'meta_keywords': 'Messi, Ronaldo, comparação, estatísticas, análise, futebol'
        }
    ]
    
    for post_data in posts_data:
        post, created = Post.objects.get_or_create(
            slug=post_data['slug'],
            defaults={
                **post_data,
                'author': admin_user
            }
        )
        if created:
            print(f"✅ Post '{post.title}' criado com sucesso!")
        else:
            print(f"ℹ️  Post '{post.title}' já existe.")


def main():
    """Função principal para inicializar os dados."""
    print("🦇 Inicializando Liniker Football Analysis...")
    print("=" * 50)
    
    create_superuser()
    print()
    
    create_categories()
    print()
    
    create_tags()
    print()
    
    create_sample_posts()
    print()
    
    print("=" * 50)
    print("✅ Inicialização concluída com sucesso!")
    print("🔗 Acesse o admin em: http://localhost:8000/admin/")
    print("👤 Usuário: admin | Senha: admin123")
    print("📊 API disponível em: http://localhost:8000/api/")


if __name__ == '__main__':
    main()
