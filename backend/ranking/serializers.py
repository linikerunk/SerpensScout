from rest_framework import serializers
from .models import Jogo, Palpite
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class JogoSerializer(serializers.ModelSerializer):
    display = serializers.SerializerMethodField()

    class Meta:
        model = Jogo
        fields = [
            'id',
            'time1',
            'time2',
            'emblema_time1',
            'emblema_time2',
            'display',
        ]

    def get_display(self, obj):
        return f"{obj.time1} x {obj.time2}"


class PalpiteSerializer(serializers.ModelSerializer):
    usuario = UserSerializer(read_only=True)
    jogo = JogoSerializer(read_only=True)

    class Meta:
        model = Palpite
        fields = ['id', 'usuario', 'jogo', 'palpite', 'resultado_correto', 'criado_em']
