"""
Script to populate the database with initial match data
Run this after migrations: python populate_matches.py
"""

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from matches.external_api import FootballAPI
from matches.models import Match
from datetime import datetime

def populate():
    print("Fetching matches from API...")
    api = FootballAPI()
    matches_data = api.get_upcoming_matches()

    print(f"Found {len(matches_data)} matches")

    created_count = 0
    for match_data in matches_data:
        match_date = datetime.fromisoformat(match_data['match_date']).date()
        match_time = datetime.strptime(match_data['match_time'], '%H:%M:%S').time()

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
            print(f"Created: {match.home_team} vs {match.away_team}")
        else:
            print(f"Updated: {match.home_team} vs {match.away_team}")

    print(f"\nDone! Created {created_count} new matches.")

if __name__ == '__main__':
    populate()
