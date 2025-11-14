from rest_framework import serializers
from .models import Match, Prediction, UserStats, Team


class TeamSerializer(serializers.ModelSerializer):
    """Serializer for Team model"""

    class Meta:
        model = Team
        fields = [
            'id',
            'name',
            'slug',
            'short_name',
            'logo_url',
            'primary_color',
            'secondary_color',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']


class MatchSerializer(serializers.ModelSerializer):
    """Serializer for Match model"""

    class Meta:
        model = Match
        fields = [
            'id',
            'home_team',
            'away_team',
            'competition',
            'match_date',
            'match_time',
            'status',
            'home_score',
            'away_score',
            'external_id',
        ]
        read_only_fields = ['id']


class PredictionSerializer(serializers.ModelSerializer):
    """Serializer for Prediction model"""

    match_details = MatchSerializer(source='match', read_only=True)

    class Meta:
        model = Prediction
        fields = [
            'id',
            'user_name',
            'user_email',
            'match',
            'match_details',
            'prediction',
            'confidence',
            'is_correct',
            'points_earned',
            'created_at',
        ]
        read_only_fields = ['id', 'is_correct', 'points_earned', 'created_at']


class UserStatsSerializer(serializers.ModelSerializer):
    """Serializer for UserStats model"""

    accuracy = serializers.ReadOnlyField()

    class Meta:
        model = UserStats
        fields = [
            'id',
            'user_name',
            'user_email',
            'total_predictions',
            'correct_predictions',
            'total_points',
            'accuracy',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'total_predictions', 'correct_predictions', 'total_points', 'created_at', 'updated_at']
