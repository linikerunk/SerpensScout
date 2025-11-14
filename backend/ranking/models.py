from django.db import models
from django.contrib.auth.models import User


TIMES_SERIE_A = [
    ('Palmeiras', 'Palmeiras'),
    ('Flamengo', 'Flamengo'),
    ('Cruzeiro', 'Cruzeiro'),
    ('Mirassol', 'Mirassol'),
    ('Bahia', 'Bahia'),
    ('Botafogo', 'Botafogo'),
    ('Fluminense', 'Fluminense'),
    ('São Paulo', 'São Paulo'),
    ('Atlético-MG', 'Atlético-MG'),
    ('Vasco', 'Vasco'),
    ('Bragantino', 'Bragantino'),
    ('Ceará', 'Ceará'),
    ('Corinthians', 'Corinthians'),
    ('Grêmio', 'Grêmio'),
    ('Internacional', 'Internacional'),
    ('Vitória', 'Vitória'),
    ('Santos', 'Santos'),
    ('Juventude', 'Juventude'),
    ('Fortaleza', 'Fortaleza'),
    ('Sport', 'Sport'),
]

RESULTADOS = TIMES_SERIE_A + [('Empate', 'Empate')]

PLACARES = [
    ('0x0', '0x0'),
    ('1x0', '1x0'),
    ('2x0', '2x0'),
    ('3x0', '3x0'),
    ('4x0', '4x0'),
    ('5x0', '5x0'),
    ('6x0', '6x0'),
    ('7x0', '7x0'),
    ('0x1', '0x1'),
    ('0x2', '0x2'),
    ('0x3', '0x3'),
    ('0x4', '0x4'),
    ('0x5', '0x5'),
    ('0x6', '0x6'),
    ('0x7', '0x7'),
    ('1x1', '1x1'),
    ('2x1', '2x1'),
    ('3x1', '3x1'),
    ('4x1', '4x1'),
    ('5x1', '5x1'),
    ('6x1', '6x1'),
    ('7x1', '7x1'),
    ('1x2', '1x2'),
    ('2x2', '2x2'),
    ('3x2', '3x2'),
    ('4x2', '4x2'),
    ('5x2', '5x2'),
    ('6x2', '6x2'),
    ('7x2', '7x2'),
    ('1x3', '1x3'),
    ('2x3', '2x3'),
    ('3x3', '3x3'),
    ('4x3', '4x3'),
    ('5x3', '5x3'),
    ('6x3', '6x3'),
    ('7x3', '7x3'),
    ('1x4', '1x4'),
    ('2x4', '2x4'),
    ('3x4', '3x4'),
    ('4x4', '4x4'),
    ('5x4', '5x4'),
    ('6x4', '6x4'),
    ('7x4', '7x4'),
    ('1x5', '1x5'),
    ('2x5', '2x5'),
    ('3x5', '3x5'),
    ('4x5', '4x5'),
    ('5x5', '5x5'),
    ('6x5', '6x5'),
    ('7x5', '7x5'),
    ('1x6', '1x6'),
    ('2x6', '2x6'),
    ('3x6', '3x6'),
    ('4x6', '4x6'),
    ('5x6', '5x6'),
    ('6x6', '6x6'),
    ('7x6', '7x6'),
    ('1x7', '1x7'),
    ('2x7', '2x7'),
    ('3x7', '3x7'),
    ('4x7', '4x7'),
    ('5x7', '5x7'),
    ('6x7', '6x7'),
    ('7x7', '7x7'),
]

class Jogo(models.Model):
    time1 = models.CharField(max_length=100, choices=TIMES_SERIE_A)
    time2 = models.CharField(max_length=100, choices=TIMES_SERIE_A)
    emblema_time1 = models.URLField(null=True, blank=True)
    emblema_time2 = models.URLField(null=True, blank=True)

    def __str__(self):
        return f"{self.time1} x {self.time2}"


class Palpite(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='palpites')
    jogo = models.ForeignKey(Jogo, on_delete=models.CASCADE)
    palpite = models.CharField(choices=RESULTADOS)
    resultado_correto = models.CharField(max_length=10, choices=PLACARES, null=True, blank=True)
    criado_em = models.DateTimeField(auto_now_add=True)

    @property
    def display(self):
        return f"O Usuário {self.usuario} - Jogo: {self.jogo} - Palpite: {self.palpite}"