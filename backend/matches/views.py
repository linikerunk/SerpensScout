from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db.models import Count, Q
from datetime import datetime, timedelta

from .models import Match, Prediction, UserStats
from .serializers import MatchSerializer, PredictionSerializer, UserStatsSerializer
from .external_api import FootballAPI


class MatchViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Match model
    Provides CRUD operations and custom actions
    """
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    permission_classes = [AllowAny]  # Allow public access for now

    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """Get upcoming matches (next 7 days)"""
        today = datetime.now().date()
        upcoming_date = today + timedelta(days=7)

        matches = Match.objects.filter(
            match_date__gte=today,
            match_date__lte=upcoming_date,
            status='scheduled'
        ).order_by('match_date', 'match_time')

        serializer = self.get_serializer(matches, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def sync_from_api(self, request):
        """
        Sync matches from external API
        This endpoint fetches matches from external API and saves to database
        """
        api = FootballAPI()
        matches_data = api.get_upcoming_matches()

        created_count = 0
        updated_count = 0

        for match_data in matches_data:
            # Convert string dates to proper format
            match_date = datetime.fromisoformat(match_data['match_date']).date()
            match_time = datetime.fromisoformat(match_data['match_time']).time()

            match, created = Match.objects.update_or_create(
                external_id=match_data.get('external_id'),
                defaults={
                    'home_team': match_data['home_team'],
                    'away_team': match_data['away_team'],
                    'competition': match_data['competition'],
                    'match_date': match_date,
                    'match_time': match_time,
                    'status': match_data.get('status', 'scheduled'),
                }
            )

            if created:
                created_count += 1
            else:
                updated_count += 1

        return Response({
            'message': 'Matches synced successfully',
            'created': created_count,
            'updated': updated_count,
            'total': len(matches_data)
        })


class PredictionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Prediction model
    Allows users to create and view predictions
    """
    queryset = Prediction.objects.all()
    serializer_class = PredictionSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        """Create a prediction and update user stats"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        # Update user stats
        user_email = request.data.get('user_email')
        user_name = request.data.get('user_name')

        if user_email:
            user_stats, created = UserStats.objects.get_or_create(
                user_email=user_email,
                defaults={'user_name': user_name}
            )
            user_stats.total_predictions += 1
            user_stats.save()

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=False, methods=['get'])
    def my_predictions(self, request):
        """Get predictions for a specific user"""
        user_email = request.query_params.get('email')

        if not user_email:
            return Response(
                {'error': 'Email parameter is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        predictions = Prediction.objects.filter(user_email=user_email)
        serializer = self.get_serializer(predictions, many=True)
        return Response(serializer.data)


class UserStatsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for UserStats model
    Provides ranking and statistics
    """
    queryset = UserStats.objects.all()
    serializer_class = UserStatsSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['get'])
    def ranking(self, request):
        """Get top users ranking"""
        limit = int(request.query_params.get('limit', 10))

        top_users = UserStats.objects.all()[:limit]
        serializer = self.get_serializer(top_users, many=True)

        # Add position to each user
        ranked_data = []
        for index, user_data in enumerate(serializer.data, start=1):
            user_data['position'] = index
            ranked_data.append(user_data)

        return Response(ranked_data)
