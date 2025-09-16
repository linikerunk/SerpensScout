"""
🦇 Models para Posts de Análise de Futebol

Seguindo a filosofia DracoPunk: modelos elegantes e funcionais.
Cada modelo carrega propósito e cada campo tem significado.
"""
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Category(models.Model):
    """
    Categoria para organizar as análises de futebol.
    Cada categoria representa um tipo de análise.
    """
    name = models.CharField(max_length=100, verbose_name="Nome")
    slug = models.SlugField(max_length=100, unique=True, verbose_name="Slug")
    description = models.TextField(blank=True, verbose_name="Descrição")
    color = models.CharField(max_length=7, default="#6B7280", verbose_name="Cor")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Criado em")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Atualizado em")

    class Meta:
        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"
        ordering = ['name']

    def __str__(self):
        return self.name


class Post(models.Model):
    """
    Post de análise de futebol.
    Cada post é uma análise profunda sobre algum aspecto do futebol.
    """
    STATUS_CHOICES = [
        ('draft', 'Rascunho'),
        ('published', 'Publicado'),
        ('archived', 'Arquivado'),
    ]

    title = models.CharField(max_length=200, verbose_name="Título")
    slug = models.SlugField(max_length=200, unique=True, verbose_name="Slug")
    excerpt = models.TextField(max_length=500, verbose_name="Resumo")
    content = models.TextField(verbose_name="Conteúdo")
    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Autor")
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Categoria")
    
    # Imagens
    featured_image = models.ImageField(upload_to='posts/images/', blank=True, null=True, verbose_name="Imagem Destacada")
    
    # Metadados
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft', verbose_name="Status")
    read_time = models.PositiveIntegerField(default=5, verbose_name="Tempo de Leitura (min)")
    
    # SEO
    meta_description = models.CharField(max_length=160, blank=True, verbose_name="Meta Descrição")
    meta_keywords = models.CharField(max_length=255, blank=True, verbose_name="Meta Keywords")
    
    # Datas
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Criado em")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Atualizado em")
    published_at = models.DateTimeField(null=True, blank=True, verbose_name="Publicado em")
    
    # Estatísticas
    views = models.PositiveIntegerField(default=0, verbose_name="Visualizações")
    likes = models.PositiveIntegerField(default=0, verbose_name="Curtidas")

    class Meta:
        verbose_name = "Post"
        verbose_name_plural = "Posts"
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.status == 'published' and not self.published_at:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)

    @property
    def is_published(self):
        return self.status == 'published'

    @property
    def reading_time_display(self):
        return f"{self.read_time} min"


class Tag(models.Model):
    """
    Tags para categorizar e facilitar a busca nos posts.
    """
    name = models.CharField(max_length=50, unique=True, verbose_name="Nome")
    slug = models.SlugField(max_length=50, unique=True, verbose_name="Slug")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Criado em")

    class Meta:
        verbose_name = "Tag"
        verbose_name_plural = "Tags"
        ordering = ['name']

    def __str__(self):
        return self.name


class PostTag(models.Model):
    """
    Relacionamento muitos-para-muitos entre Posts e Tags.
    """
    post = models.ForeignKey(Post, on_delete=models.CASCADE, verbose_name="Post")
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE, verbose_name="Tag")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Criado em")

    class Meta:
        verbose_name = "Tag do Post"
        verbose_name_plural = "Tags dos Posts"
        unique_together = ['post', 'tag']

    def __str__(self):
        return f"{self.post.title} - {self.tag.name}"


class Comment(models.Model):
    """
    Comentários nos posts de análise.
    """
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments', verbose_name="Post")
    author_name = models.CharField(max_length=100, verbose_name="Nome do Autor")
    author_email = models.EmailField(verbose_name="Email do Autor")
    content = models.TextField(verbose_name="Conteúdo")
    is_approved = models.BooleanField(default=False, verbose_name="Aprovado")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Criado em")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Atualizado em")

    class Meta:
        verbose_name = "Comentário"
        verbose_name_plural = "Comentários"
        ordering = ['-created_at']

    def __str__(self):
        return f"Comentário de {self.author_name} em {self.post.title}"
