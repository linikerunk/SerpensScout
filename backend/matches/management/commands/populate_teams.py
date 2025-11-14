from django.core.management.base import BaseCommand
from matches.models import Team


class Command(BaseCommand):
    help = 'Populate teams with logos and colors'

    def handle(self, *args, **kwargs):
        teams_data = [
            {
                'name': 'Athletico Paranaense',
                'short_name': 'CAP',
                'logo_url': '/teams/atletico_mineiro.png',
                'primary_color': '#E30613',
                'secondary_color': '#000000'
            },
            {
                'name': 'Atlético Mineiro',
                'short_name': 'CAM',
                'logo_url': '/teams/atletico_mineiro.png',
                'primary_color': '#000000',
                'secondary_color': '#FFFFFF'
            },
            {
                'name': 'Bahia',
                'short_name': 'BAH',
                'logo_url': '/teams/bahia.png',
                'primary_color': '#0047AB',
                'secondary_color': '#E30613'
            },
            {
                'name': 'Botafogo',
                'short_name': 'BOT',
                'logo_url': '/teams/botafogo.png',
                'primary_color': '#000000',
                'secondary_color': '#FFFFFF'
            },
            {
                'name': 'Ceará',
                'short_name': 'CEA',
                'logo_url': '/teams/mirassol.png',
                'primary_color': '#000000',
                'secondary_color': '#FFFFFF'
            },
            {
                'name': 'Corinthians',
                'short_name': 'COR',
                'logo_url': '/teams/corinthians.png',
                'primary_color': '#000000',
                'secondary_color': '#FFFFFF'
            },
            {
                'name': 'Coritiba',
                'short_name': 'CFC',
                'logo_url': '/teams/mirassol.png',
                'primary_color': '#00643C',
                'secondary_color': '#FFFFFF'
            },
            {
                'name': 'Cruzeiro',
                'short_name': 'CRU',
                'logo_url': '/teams/cruzeiro.png',
                'primary_color': '#003399',
                'secondary_color': '#FFFFFF'
            },
            {
                'name': 'Cuiabá',
                'short_name': 'CUI',
                'logo_url': '/teams/mirassol.png',
                'primary_color': '#FFCC00',
                'secondary_color': '#006400'
            },
            {
                'name': 'Flamengo',
                'short_name': 'FLA',
                'logo_url': '/teams/flamengo.png',
                'primary_color': '#E30613',
                'secondary_color': '#000000'
            },
            {
                'name': 'Fluminense',
                'short_name': 'FLU',
                'logo_url': '/teams/fluminense.png',
                'primary_color': '#7F1E3C',
                'secondary_color': '#006400'
            },
            {
                'name': 'Fortaleza',
                'short_name': 'FOR',
                'logo_url': '/teams/fortaleza.png',
                'primary_color': '#003399',
                'secondary_color': '#E30613'
            },
            {
                'name': 'Grêmio',
                'short_name': 'GRE',
                'logo_url': '/teams/gremio.png',
                'primary_color': '#0088CC',
                'secondary_color': '#000000'
            },
            {
                'name': 'Internacional',
                'short_name': 'INT',
                'logo_url': '/teams/internacional.png',
                'primary_color': '#E30613',
                'secondary_color': '#FFFFFF'
            },
            {
                'name': 'Palmeiras',
                'short_name': 'PAL',
                'logo_url': '/teams/palmeiras.png',
                'primary_color': '#006400',
                'secondary_color': '#FFFFFF'
            },
            {
                'name': 'Red Bull Bragantino',
                'short_name': 'RBB',
                'logo_url': '/teams/rb-bragantino.png',
                'primary_color': '#FFCC00',
                'secondary_color': '#E30613'
            },
            {
                'name': 'Santos',
                'short_name': 'SAN',
                'logo_url': '/teams/santos.png',
                'primary_color': '#FFFFFF',
                'secondary_color': '#000000'
            },
            {
                'name': 'São Paulo',
                'short_name': 'SAO',
                'logo_url': '/teams/sao_paulo.png',
                'primary_color': '#E30613',
                'secondary_color': '#000000'
            },
            {
                'name': 'Vasco',
                'short_name': 'VAS',
                'logo_url': '/teams/vasco-da-gama.png',
                'primary_color': '#000000',
                'secondary_color': '#FFFFFF'
            },
            {
                'name': 'Vitória',
                'short_name': 'VIT',
                'logo_url': '/teams/vitoria.png',
                'primary_color': '#E30613',
                'secondary_color': '#000000'
            }
        ]

        created_count = 0
        updated_count = 0

        for team_data in teams_data:
            team, created = Team.objects.update_or_create(
                name=team_data['name'],
                defaults={
                    'short_name': team_data['short_name'],
                    'logo_url': team_data['logo_url'],
                    'primary_color': team_data['primary_color'],
                    'secondary_color': team_data['secondary_color']
                }
            )
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'[+] Time criado: {team.name}')
                )
            else:
                updated_count += 1
                self.stdout.write(
                    self.style.WARNING(f'[*] Time atualizado: {team.name}')
                )

        self.stdout.write(
            self.style.SUCCESS(f'\n[+] Processo concluido!')
        )
        self.stdout.write(
            self.style.SUCCESS(f'  - {created_count} times criados')
        )
        self.stdout.write(
            self.style.SUCCESS(f'  - {updated_count} times atualizados')
        )
        self.stdout.write(
            self.style.SUCCESS(f'  - Total: {created_count + updated_count} times')
        )
