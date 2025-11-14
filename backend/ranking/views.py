from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db import models
from .models import Jogo, Palpite
from .serializers import JogoSerializer, PalpiteSerializer


class JogoViewSet(viewsets.ModelViewSet):
    queryset = Jogo.objects.all()
    serializer_class = JogoSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['get'])
    def proximos(self, request):
        """Retorna os próximos jogos (sem resultado definido)"""
        jogos = Jogo.objects.filter(resultado_correto__isnull=True)
        serializer = self.get_serializer(jogos, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def finalizados(self, request):
        """Retorna os jogos finalizados (com resultado definido)"""
        jogos = Jogo.objects.filter(resultado_correto__isnull=False)
        serializer = self.get_serializer(jogos, many=True)
        return Response(serializer.data)


class PalpiteViewSet(viewsets.ModelViewSet):
    serializer_class = PalpiteSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Palpite.objects.filter(usuario=self.request.user)
        return Palpite.objects.none()

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(usuario=self.request.user)
