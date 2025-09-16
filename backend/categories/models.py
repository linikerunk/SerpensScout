"""
🦇 Models para Categorias de Análise de Futebol

Seguindo a filosofia DracoPunk: modelos elegantes e funcionais.
"""
from django.db import models


class Category(models.Model):
    """
    Categoria para organizar as análises de futebol.
    """
    name = models.CharField(max_length=100, verbose_name="Nome")
    slug = models.SlugField(max_length=100, unique=True, verbose_name="Slug")
    description = models.TextField(blank=True, verbose_name="Descrição")
    color = models.CharField(max_length=7, default="#6B7280", verbose_name="Cor")
    icon = models.CharField(max_length=50, default="⚽", verbose_name="Ícone")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Criado em")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Atualizado em")

    class Meta:
        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"
        ordering = ['name']

    def __str__(self):
        return self.name
