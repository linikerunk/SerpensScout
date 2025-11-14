from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JogoViewSet, PalpiteViewSet

router = DefaultRouter()
router.register('jogos', JogoViewSet, basename='jogo')
router.register('palpites', PalpiteViewSet, basename='palpite')

urlpatterns = [
    path('', include(router.urls)),
]
