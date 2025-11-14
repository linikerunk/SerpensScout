import React, { useState, useEffect } from 'react';
import { teamsService } from '../services/api';
import './Teams.css';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      setLoading(true);
      const data = await teamsService.getTeams();
      setTeams(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar times. Tente novamente mais tarde.');
      console.error('Erro ao carregar times:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.short_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="teams-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Carregando times...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="teams-container">
        <div className="error-state">
          <p>{error}</p>
          <button onClick={loadTeams} className="retry-button">
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="teams-container">
      <header className="teams-header">
        <h1>Times do Brasileirão</h1>
        <p className="teams-subtitle">
          Conheça os {teams.length} times que disputam o Campeonato Brasileiro Série A
        </p>
      </header>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar time..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="teams-grid">
        {filteredTeams.map((team) => (
          <div
            key={team.id}
            className="team-card"
            style={{
              borderTop: `4px solid ${team.primary_color}`,
            }}
          >
            <div className="team-logo-container">
              <img
                src={team.logo_url}
                alt={`Logo ${team.name}`}
                className="team-logo"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/100x100?text=Logo';
                }}
              />
            </div>

            <div className="team-info">
              <h3 className="team-name">{team.name}</h3>
              <p className="team-short-name">{team.short_name}</p>
            </div>

            <div className="team-colors">
              <div
                className="color-circle"
                style={{ backgroundColor: team.primary_color }}
                title={`Cor primária: ${team.primary_color}`}
              ></div>
              <div
                className="color-circle"
                style={{ backgroundColor: team.secondary_color }}
                title={`Cor secundária: ${team.secondary_color}`}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {filteredTeams.length === 0 && searchTerm && (
        <div className="no-results">
          <p>Nenhum time encontrado para "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default Teams;
