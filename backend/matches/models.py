from django.db import models

class Match(models.Model):
    """Model to store football matches"""

    # Match identifiers
    external_id = models.CharField(max_length=100, unique=True, null=True, blank=True)

    # Teams
    home_team = models.CharField(max_length=200)
    away_team = models.CharField(max_length=200)

    # Match details
    competition = models.CharField(max_length=200)
    match_date = models.DateField()
    match_time = models.TimeField()

    # Status
    STATUS_CHOICES = [
        ('scheduled', 'Agendado'),
        ('live', 'Ao Vivo'),
        ('finished', 'Finalizado'),
        ('postponed', 'Adiado'),
        ('cancelled', 'Cancelado'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')

    # Scores (null if match hasn't started)
    home_score = models.IntegerField(null=True, blank=True)
    away_score = models.IntegerField(null=True, blank=True)

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['match_date', 'match_time']
        verbose_name = 'Match'
        verbose_name_plural = 'Matches'

    def __str__(self):
        return f"{self.home_team} vs {self.away_team} - {self.match_date}"


class Prediction(models.Model):
    """Model to store user predictions"""

    # User information (simplified for now)
    user_name = models.CharField(max_length=200)
    user_email = models.EmailField(null=True, blank=True)

    # Match reference
    match = models.ForeignKey(Match, on_delete=models.CASCADE, related_name='predictions')

    # Prediction
    PREDICTION_CHOICES = [
        ('home', 'Vitória Casa'),
        ('draw', 'Empate'),
        ('away', 'Vitória Fora'),
    ]
    prediction = models.CharField(max_length=10, choices=PREDICTION_CHOICES)

    # Confidence level (1-5 stars)
    confidence = models.IntegerField(default=3)

    # Result tracking
    is_correct = models.BooleanField(null=True, blank=True)
    points_earned = models.IntegerField(default=0)

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ['user_email', 'match']
        verbose_name = 'Prediction'
        verbose_name_plural = 'Predictions'

    def __str__(self):
        return f"{self.user_name} - {self.match} - {self.prediction}"

    def calculate_points(self):
        """Calculate points based on prediction accuracy and confidence"""
        if self.is_correct is None:
            return 0

        if self.is_correct:
            # Base points * confidence multiplier
            base_points = 10
            return base_points * self.confidence
        return 0


class UserStats(models.Model):
    """Model to track user statistics"""

    user_name = models.CharField(max_length=200)
    user_email = models.EmailField(unique=True)

    # Statistics
    total_predictions = models.IntegerField(default=0)
    correct_predictions = models.IntegerField(default=0)
    total_points = models.IntegerField(default=0)

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-total_points', '-correct_predictions']
        verbose_name = 'User Stats'
        verbose_name_plural = 'User Stats'

    def __str__(self):
        return f"{self.user_name} - {self.total_points} pts"

    @property
    def accuracy(self):
        """Calculate prediction accuracy percentage"""
        if self.total_predictions == 0:
            return 0
        return round((self.correct_predictions / self.total_predictions) * 100, 1)
