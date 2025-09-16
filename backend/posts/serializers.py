"""
🦇 Serializers para Posts de Análise de Futebol

Seguindo a filosofia DracoPunk: serializers elegantes e funcionais.
Cada serializer transforma dados com propósito e clareza.
"""
from rest_framework import serializers
from .models import Post, Category, Tag, PostTag, Comment


class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer para Categorias.
    """
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'color', 'created_at', 'updated_at']


class TagSerializer(serializers.ModelSerializer):
    """
    Serializer para Tags.
    """
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug', 'created_at']


class PostTagSerializer(serializers.ModelSerializer):
    """
    Serializer para Tags dos Posts.
    """
    tag = TagSerializer(read_only=True)
    
    class Meta:
        model = PostTag
        fields = ['tag']


class CommentSerializer(serializers.ModelSerializer):
    """
    Serializer para Comentários.
    """
    class Meta:
        model = Comment
        fields = ['id', 'author_name', 'author_email', 'content', 'is_approved', 'created_at', 'updated_at']
        read_only_fields = ['is_approved', 'created_at', 'updated_at']


class PostListSerializer(serializers.ModelSerializer):
    """
    Serializer para listagem de Posts (versão resumida).
    """
    category = CategorySerializer(read_only=True)
    author = serializers.StringRelatedField(read_only=True)
    tags = PostTagSerializer(source='posttag_set', many=True, read_only=True)
    
    class Meta:
        model = Post
        fields = [
            'id', 'title', 'slug', 'excerpt', 'author', 'category', 
            'featured_image', 'status', 'read_time', 'created_at', 
            'updated_at', 'published_at', 'views', 'likes', 'tags'
        ]


class PostDetailSerializer(serializers.ModelSerializer):
    """
    Serializer para detalhes do Post (versão completa).
    """
    category = CategorySerializer(read_only=True)
    author = serializers.StringRelatedField(read_only=True)
    tags = PostTagSerializer(source='posttag_set', many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Post
        fields = [
            'id', 'title', 'slug', 'excerpt', 'content', 'author', 'category',
            'featured_image', 'status', 'read_time', 'meta_description', 
            'meta_keywords', 'created_at', 'updated_at', 'published_at', 
            'views', 'likes', 'tags', 'comments'
        ]


class PostCreateUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer para criação e atualização de Posts.
    """
    class Meta:
        model = Post
        fields = [
            'title', 'slug', 'excerpt', 'content', 'category', 'featured_image',
            'status', 'read_time', 'meta_description', 'meta_keywords'
        ]

    def create(self, validated_data):
        # Adiciona o autor automaticamente
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data)
