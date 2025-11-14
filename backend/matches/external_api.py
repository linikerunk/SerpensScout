"""
External Football API Integration
Uses free API data from multiple sources
"""

import requests
from datetime import datetime, timedelta
from django.conf import settings


class FootballAPI:
    """
    Class to fetch football match data from external APIs
    Using api-football.com free tier or football-data.org
    """

    def __init__(self):
        # You can get a free API key from api-football.com or football-data.org
        self.api_key = getattr(settings, 'FOOTBALL_API_KEY', None)
        self.base_url = "https://v3.football.api-sports.io"

    def get_upcoming_matches_mock(self, days_ahead=7):
        """
        Returns mock data for upcoming matches
        This can be replaced with real API calls when you have an API key
        """
        today = datetime.now().date()

        matches = [
            {
                'home_team': 'Flamengo',
                'away_team': 'Palmeiras',
                'competition': 'Brasileirão Série A',
                'match_date': (today + timedelta(days=1)).isoformat(),
                'match_time': '19:00:00',
                'status': 'scheduled',
                'external_id': 'match_001'
            },
            {
                'home_team': 'São Paulo',
                'away_team': 'Corinthians',
                'competition': 'Brasileirão Série A',
                'match_date': (today + timedelta(days=1)).isoformat(),
                'match_time': '21:00:00',
                'status': 'scheduled',
                'external_id': 'match_002'
            },
            {
                'home_team': 'Grêmio',
                'away_team': 'Internacional',
                'competition': 'Brasileirão Série A',
                'match_date': (today + timedelta(days=2)).isoformat(),
                'match_time': '16:00:00',
                'status': 'scheduled',
                'external_id': 'match_003'
            },
            {
                'home_team': 'Atlético Mineiro',
                'away_team': 'Cruzeiro',
                'competition': 'Brasileirão Série A',
                'match_date': (today + timedelta(days=2)).isoformat(),
                'match_time': '18:30:00',
                'status': 'scheduled',
                'external_id': 'match_004'
            },
            {
                'home_team': 'Botafogo',
                'away_team': 'Vasco',
                'competition': 'Brasileirão Série A',
                'match_date': (today + timedelta(days=3)).isoformat(),
                'match_time': '20:00:00',
                'status': 'scheduled',
                'external_id': 'match_005'
            },
            {
                'home_team': 'Santos',
                'away_team': 'Fluminense',
                'competition': 'Brasileirão Série A',
                'match_date': (today + timedelta(days=3)).isoformat(),
                'match_time': '17:00:00',
                'status': 'scheduled',
                'external_id': 'match_006'
            },
            {
                'home_team': 'Athletico Paranaense',
                'away_team': 'Coritiba',
                'competition': 'Brasileirão Série A',
                'match_date': (today + timedelta(days=4)).isoformat(),
                'match_time': '19:30:00',
                'status': 'scheduled',
                'external_id': 'match_007'
            },
            {
                'home_team': 'Bahia',
                'away_team': 'Vitória',
                'competition': 'Brasileirão Série A',
                'match_date': (today + timedelta(days=4)).isoformat(),
                'match_time': '16:30:00',
                'status': 'scheduled',
                'external_id': 'match_008'
            },
            {
                'home_team': 'Fortaleza',
                'away_team': 'Ceará',
                'competition': 'Brasileirão Série A',
                'match_date': (today + timedelta(days=5)).isoformat(),
                'match_time': '18:00:00',
                'status': 'scheduled',
                'external_id': 'match_009'
            },
            {
                'home_team': 'Red Bull Bragantino',
                'away_team': 'Cuiabá',
                'competition': 'Brasileirão Série A',
                'match_date': (today + timedelta(days=5)).isoformat(),
                'match_time': '20:30:00',
                'status': 'scheduled',
                'external_id': 'match_010'
            }
        ]

        return matches

    def get_upcoming_matches_real(self, league_id=71, season=2024):
        """
        Fetch upcoming matches from api-football.com
        league_id 71 = Brasileirão Série A
        Requires API key in settings
        """
        if not self.api_key:
            return self.get_upcoming_matches_mock()

        headers = {
            'x-apisports-key': self.api_key
        }

        today = datetime.now().date()
        date_from = today.isoformat()
        date_to = (today + timedelta(days=7)).isoformat()

        endpoint = f"{self.base_url}/fixtures"
        params = {
            'league': league_id,
            'season': season,
            'from': date_from,
            'to': date_to,
            'status': 'NS'  # Not Started
        }

        try:
            response = requests.get(endpoint, headers=headers, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()

            matches = []
            if data.get('response'):
                for fixture in data['response']:
                    match_datetime = datetime.fromisoformat(fixture['fixture']['date'].replace('Z', '+00:00'))

                    matches.append({
                        'home_team': fixture['teams']['home']['name'],
                        'away_team': fixture['teams']['away']['name'],
                        'competition': fixture['league']['name'],
                        'match_date': match_datetime.date().isoformat(),
                        'match_time': match_datetime.time().isoformat(),
                        'status': 'scheduled',
                        'external_id': str(fixture['fixture']['id'])
                    })

            return matches

        except requests.exceptions.RequestException as e:
            print(f"Error fetching from API: {e}")
            return self.get_upcoming_matches_mock()

    def get_upcoming_matches(self):
        """Main method to get upcoming matches"""
        if self.api_key:
            return self.get_upcoming_matches_real()
        else:
            return self.get_upcoming_matches_mock()
