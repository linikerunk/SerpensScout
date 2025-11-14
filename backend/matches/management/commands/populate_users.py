"""
Management command to populate the database with realistic user data for testing
"""
import random
from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from django.utils import timezone
from matches.models import Match, Prediction, UserStats


class Command(BaseCommand):
    help = 'Populate database with realistic user data for ranking table'

    def add_arguments(self, parser):
        parser.add_argument(
            '--users',
            type=int,
            default=20,
            help='Number of users to create (default: 20)'
        )
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear existing data before populating'
        )

    def handle(self, *args, **options):
        num_users = options['users']
        clear_data = options['clear']

        if clear_data:
            self.stdout.write('Clearing existing data...')
            UserStats.objects.all().delete()
            Prediction.objects.all().delete()
            self.stdout.write(self.style.WARNING('Existing user stats and predictions deleted'))

        # Brazilian names for realistic data
        first_names = [
            'João', 'Maria', 'José', 'Ana', 'Pedro', 'Juliana', 'Lucas', 'Fernanda',
            'Gabriel', 'Camila', 'Rafael', 'Beatriz', 'Mateus', 'Larissa', 'Felipe',
            'Carolina', 'Bruno', 'Amanda', 'Rodrigo', 'Mariana', 'Thiago', 'Letícia',
            'Diego', 'Gabriela', 'Gustavo', 'Aline', 'Leonardo', 'Bruna', 'Vinicius',
            'Patrícia', 'Marcelo', 'Renata', 'André', 'Tatiana', 'Carlos', 'Vanessa'
        ]

        last_names = [
            'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves',
            'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho',
            'Rocha', 'Almeida', 'Nascimento', 'Araújo', 'Melo', 'Barbosa', 'Reis',
            'Cardoso', 'Teixeira', 'Freitas', 'Fernandes', 'Dias', 'Castro', 'Mendes'
        ]

        # Ensure we have some matches to create predictions for
        self._ensure_matches()
        matches = list(Match.objects.all()[:10])  # Get up to 10 matches

        if not matches:
            self.stdout.write(self.style.ERROR('No matches available. Please create some matches first.'))
            return

        self.stdout.write(f'Creating {num_users} users with realistic data...')

        created_users = []

        for i in range(num_users):
            # Generate realistic user data
            first_name = random.choice(first_names)
            last_name = random.choice(last_names)
            user_name = f"{first_name} {last_name}"

            # Create email from name
            email = f"{first_name.lower()}.{last_name.lower()}{random.randint(1, 999)}@example.com"

            # Generate realistic statistics
            # Vary the skill level: some users are better predictors than others
            skill_level = random.choice(['beginner', 'intermediate', 'advanced', 'expert'])

            if skill_level == 'beginner':
                total_predictions = random.randint(5, 20)
                accuracy_rate = random.uniform(0.30, 0.50)  # 30-50% accuracy
            elif skill_level == 'intermediate':
                total_predictions = random.randint(20, 50)
                accuracy_rate = random.uniform(0.50, 0.65)  # 50-65% accuracy
            elif skill_level == 'advanced':
                total_predictions = random.randint(50, 100)
                accuracy_rate = random.uniform(0.65, 0.80)  # 65-80% accuracy
            else:  # expert
                total_predictions = random.randint(80, 150)
                accuracy_rate = random.uniform(0.75, 0.90)  # 75-90% accuracy

            correct_predictions = int(total_predictions * accuracy_rate)

            # Calculate realistic points (average confidence of 3)
            avg_confidence = random.uniform(2.5, 4.0)
            total_points = int(correct_predictions * 10 * avg_confidence)

            # Create or update user stats
            user_stats, created = UserStats.objects.update_or_create(
                user_email=email,
                defaults={
                    'user_name': user_name,
                    'total_predictions': total_predictions,
                    'correct_predictions': correct_predictions,
                    'total_points': total_points,
                }
            )

            created_users.append({
                'name': user_name,
                'email': email,
                'stats': user_stats,
                'skill': skill_level
            })

            # Create some predictions for this user
            num_predictions = min(random.randint(3, 8), len(matches))
            user_matches = random.sample(matches, num_predictions)

            for match in user_matches:
                prediction_choice = random.choice(['home', 'draw', 'away'])
                confidence = random.randint(1, 5)

                # Determine if prediction is correct (based on match status)
                is_correct = None
                points_earned = 0

                if match.status == 'finished' and match.home_score is not None and match.away_score is not None:
                    # Calculate actual result
                    if match.home_score > match.away_score:
                        actual_result = 'home'
                    elif match.home_score < match.away_score:
                        actual_result = 'away'
                    else:
                        actual_result = 'draw'

                    is_correct = (prediction_choice == actual_result)
                    if is_correct:
                        points_earned = 10 * confidence

                # Create prediction (skip if already exists)
                Prediction.objects.get_or_create(
                    user_email=email,
                    match=match,
                    defaults={
                        'user_name': user_name,
                        'prediction': prediction_choice,
                        'confidence': confidence,
                        'is_correct': is_correct,
                        'points_earned': points_earned,
                    }
                )

        # Display summary
        self.stdout.write(self.style.SUCCESS(f'\n>> Successfully created {len(created_users)} users!'))
        self.stdout.write(self.style.SUCCESS(f'>> Created predictions for {len(matches)} matches'))

        # Show top 10 ranking
        self.stdout.write('\n' + '='*60)
        self.stdout.write(self.style.SUCCESS('TOP 10 RANKING:'))
        self.stdout.write('='*60)

        top_users = UserStats.objects.all()[:10]
        for i, user in enumerate(top_users, 1):
            badge = ''
            if i == 1:
                badge = '[GOLD]'
            elif i == 2:
                badge = '[SILVER]'
            elif i == 3:
                badge = '[BRONZE]'

            self.stdout.write(
                f"{badge} #{i:<3} {user.user_name:<25} "
                f"Pts: {user.total_points:<6} "
                f"Predictions: {user.total_predictions:<4} "
                f"Correct: {user.correct_predictions:<4} "
                f"Accuracy: {user.accuracy}%"
            )

        self.stdout.write('\n' + '='*60)
        self.stdout.write(self.style.SUCCESS('\n>> Data population complete!'))
        self.stdout.write('\nYou can now view the ranking in your frontend application.')

    def _ensure_matches(self):
        """Ensure there are some matches in the database"""
        if Match.objects.count() > 0:
            return

        self.stdout.write('Creating sample matches...')

        # Brazilian teams
        teams = [
            'Flamengo', 'Palmeiras', 'Corinthians', 'São Paulo',
            'Santos', 'Grêmio', 'Internacional', 'Atlético-MG',
            'Fluminense', 'Botafogo', 'Vasco', 'Cruzeiro'
        ]

        competitions = ['Brasileirão Série A', 'Copa do Brasil', 'Libertadores']

        # Create 15 sample matches
        today = timezone.now().date()

        for i in range(15):
            home_team = random.choice(teams)
            away_team = random.choice([t for t in teams if t != home_team])
            competition = random.choice(competitions)

            # Mix of past and future matches
            if i < 10:  # 10 finished matches
                match_date = today - timedelta(days=random.randint(1, 30))
                status = 'finished'
                home_score = random.randint(0, 4)
                away_score = random.randint(0, 4)
            else:  # 5 upcoming matches
                match_date = today + timedelta(days=random.randint(1, 14))
                status = 'scheduled'
                home_score = None
                away_score = None

            Match.objects.create(
                home_team=home_team,
                away_team=away_team,
                competition=competition,
                match_date=match_date,
                match_time=datetime.now().time(),
                status=status,
                home_score=home_score,
                away_score=away_score,
                external_id=f'sample_{i+1}'
            )

        self.stdout.write(self.style.SUCCESS('>> Created 15 sample matches'))
