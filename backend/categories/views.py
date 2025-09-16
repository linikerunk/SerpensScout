"""
🦇 Views para Categorias de Análise de Futebol
"""
from rest_framework import generics
from .models import Category
from .serializers import CategorySerializer


class CategoryListView(generics.ListAPIView):
    """
    Lista todas as categorias.
    """
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
