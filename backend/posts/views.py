"""
🦇 Views para Posts de Análise de Futebol

Seguindo a filosofia DracoPunk: views elegantes e funcionais.
Cada view carrega propósito e cada endpoint tem significado.
"""
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.shortcuts import get_object_or_404
from django.db.models import Q

from .models import Post, Category, Tag, Comment
from .serializers import (
    PostListSerializer, PostDetailSerializer, PostCreateUpdateSerializer,
    CategorySerializer, TagSerializer, CommentSerializer
)


class PostListView(generics.ListAPIView):
    """
    Lista todos os posts publicados.
    """
    serializer_class = PostListSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Post.objects.filter(status='published').select_related('author', 'category')
        
        # Filtros
        category = self.request.query_params.get('category', None)
        search = self.request.query_params.get('search', None)
        tag = self.request.query_params.get('tag', None)
        
        if category:
            queryset = queryset.filter(category__slug=category)
        
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | 
                Q(excerpt__icontains=search) |
                Q(content__icontains=search)
            )
        
        if tag:
            queryset = queryset.filter(posttag__tag__slug=tag)
        
        return queryset.order_by('-published_at')


class PostDetailView(generics.RetrieveAPIView):
    """
    Detalhes de um post específico.
    """
    serializer_class = PostDetailSerializer
    lookup_field = 'slug'
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Post.objects.filter(status='published').select_related('author', 'category')

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Incrementa o contador de visualizações
        instance.views += 1
        instance.save(update_fields=['views'])
        
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class PostCreateView(generics.CreateAPIView):
    """
    Cria um novo post.
    """
    serializer_class = PostCreateUpdateSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostUpdateView(generics.UpdateAPIView):
    """
    Atualiza um post existente.
    """
    serializer_class = PostCreateUpdateSerializer
    lookup_field = 'slug'
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Post.objects.filter(author=self.request.user)


class CategoryListView(generics.ListAPIView):
    """
    Lista todas as categorias.
    """
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class TagListView(generics.ListAPIView):
    """
    Lista todas as tags.
    """
    serializer_class = TagSerializer
    queryset = Tag.objects.all()


class CommentCreateView(generics.CreateAPIView):
    """
    Cria um novo comentário.
    """
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        post = get_object_or_404(Post, slug=self.kwargs['post_slug'])
        serializer.save(post=post)


@api_view(['POST'])
def like_post(request, slug):
    """
    Curtir um post.
    """
    post = get_object_or_404(Post, slug=slug, status='published')
    post.likes += 1
    post.save(update_fields=['likes'])
    
    return Response({
        'message': 'Post curtido com sucesso!',
        'likes': post.likes
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
def popular_posts(request):
    """
    Posts mais populares (por visualizações e curtidas).
    """
    posts = Post.objects.filter(status='published').order_by('-views', '-likes')[:5]
    serializer = PostListSerializer(posts, many=True)
    
    return Response(serializer.data)


@api_view(['GET'])
def recent_posts(request):
    """
    Posts mais recentes.
    """
    posts = Post.objects.filter(status='published').order_by('-published_at')[:5]
    serializer = PostListSerializer(posts, many=True)
    
    return Response(serializer.data)
