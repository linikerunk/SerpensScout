from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MatchViewSet, PredictionViewSet, UserStatsViewSet, TeamViewSet

router = DefaultRouter()
router.register(r'teams', TeamViewSet, basename='team')
router.register(r'matches', MatchViewSet, basename='match')
router.register(r'predictions', PredictionViewSet, basename='prediction')
router.register(r'stats', UserStatsViewSet, basename='userstats')

urlpatterns = [
    path('', include(router.urls)),
]
