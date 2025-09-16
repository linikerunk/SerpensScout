"""
🦇 Serializers para Categorias de Análise de Futebol
"""
from rest_framework import serializers
from .models import Category


class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer para Categorias.
    """
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'color', 'icon', 'created_at', 'updated_at']
