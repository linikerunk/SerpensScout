"""
🦇 WSGI config for football_analysis project.

Seguindo a filosofia DracoPunk: configurações elegantes e funcionais.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'football_analysis.settings')

application = get_wsgi_application()
