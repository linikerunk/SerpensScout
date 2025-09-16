"""
🦇 ASGI config for football_analysis project.

Seguindo a filosofia DracoPunk: configurações elegantes e funcionais.
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'football_analysis.settings')

application = get_asgi_application()
