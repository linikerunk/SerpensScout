"""
🦇 URLs para Posts de Análise de Futebol

Seguindo a filosofia DracoPunk: URLs elegantes e funcionais.
Cada URL carrega propósito e cada endpoint tem significado.
"""
from django.urls import path
from . import views

urlpatterns = [
    # Posts
    path('posts/', views.PostListView.as_view(), name='post-list'),
    path('posts/<slug:slug>/', views.PostDetailView.as_view(), name='post-detail'),
    path('posts/create/', views.PostCreateView.as_view(), name='post-create'),
    path('posts/<slug:slug>/update/', views.PostUpdateView.as_view(), name='post-update'),
    
    # Categorias e Tags
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    path('tags/', views.TagListView.as_view(), name='tag-list'),
    
    # Comentários
    path('posts/<slug:post_slug>/comments/', views.CommentCreateView.as_view(), name='comment-create'),
    
    # Ações especiais
    path('posts/<slug:slug>/like/', views.like_post, name='post-like'),
    path('posts/popular/', views.popular_posts, name='popular-posts'),
    path('posts/recent/', views.recent_posts, name='recent-posts'),
]
