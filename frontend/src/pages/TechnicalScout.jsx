import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { teamPlayers, defaultPlayers } from '../data/teamPlayers'

/**
 * Technical Scout Page - Professional Scouting Interface
 */
const TechnicalScout = () => {
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [scoutNotes, setScoutNotes] = useState('')
  const [selectedMetric, setSelectedMetric] = useState('overall')
  const [filterNationality, setFilterNationality] = useState('all')
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  // Check if is desktop
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }

    checkIsDesktop()
    window.addEventListener('resize', checkIsDesktop)

    return () => window.removeEventListener('resize', checkIsDesktop)
  }, [])

  // Times mock - Campeonato Brasileiro
  const mockTeams = [
    { id: 1, name: 'Flamengo', logo: '/teams/flamengo.png' },
    { id: 2, name: 'Palmeiras', logo: '/teams/palmeiras.png' },
    { id: 3, name: 'Fluminense', logo: '/teams/fluminense.png' },
    { id: 4, name: 'São Paulo', logo: '/teams/sao_paulo.png' },
    { id: 5, name: 'Corinthians', logo: '/teams/corinthians.png' },
    { id: 6, name: 'Internacional', logo: '/teams/internacional.png' },
    { id: 7, name: 'Atlético-MG', logo: '/teams/atletico_mineiro.png' },
    { id: 8, name: 'Botafogo', logo: '/teams/botafogo.png' },
    { id: 9, name: 'Grêmio', logo: '/teams/gremio.png' },
    { id: 10, name: 'Vasco', logo: '/teams/vasco-da-gama.png' },
    { id: 11, name: 'Cruzeiro', logo: '/teams/cruzeiro.png' },
    { id: 12, name: 'Bahia', logo: '/teams/bahia.png' },
    { id: 13, name: 'Fortaleza', logo: '/teams/fortaleza.png' },
    { id: 14, name: 'Bragantino', logo: '/teams/rb-bragantino.png' },
    { id: 16, name: 'Vitória', logo: '/teams/vitoria.png' },
    { id: 17, name: 'Santos', logo: '/teams/santos.png' },
    { id: 18, name: 'Juventude', logo: '/teams/juventude.png' }
  ]

  const [teams] = useState(mockTeams)
  const [selectedTeam, setSelectedTeam] = useState(mockTeams[0])
  const [loadingTeams] = useState(false)

  // Automatically load all players when a team is selected
  useEffect(() => {
    if (selectedTeam) {
      loadTeamPlayers(selectedTeam.name)
    }
  }, [selectedTeam])

  // Function to load all 11 players from the selected team
  const loadTeamPlayers = (teamName) => {
    const teamData = teamPlayers[teamName] || defaultPlayers
    const positions = [
      { id: 'GK', label: 'GOL', role: 'Goleiro' },
      { id: 'RB', label: 'LD', role: 'Lateral Direito' },
      { id: 'CB1', label: 'ZAG', role: 'Zagueiro' },
      { id: 'CB2', label: 'ZAG', role: 'Zagueiro' },
      { id: 'LB', label: 'LE', role: 'Lateral Esquerdo' },
      { id: 'CDM', label: 'VOL', role: 'Volante' },
      { id: 'CM1', label: 'MC', role: 'Meio Campo' },
      { id: 'CM2', label: 'MC', role: 'Meio Campo' },
      { id: 'RW', label: 'PD', role: 'Ponta Direita' },
      { id: 'ST', label: 'ATA', role: 'Atacante' },
      { id: 'LW', label: 'PE', role: 'Ponta Esquerda' }
    ]

    const allPlayers = positions.map(pos => {
      const playerData = playerDatabase[pos.id]
      const teamPlayerData = teamData[pos.id]

      return {
        ...playerData,
        id: pos.id,
        label: pos.label,
        role: pos.role,
        name: teamPlayerData?.name || playerData.name,
        number: teamPlayerData?.number || '-'
      }
    })

    setSelectedPlayers(allPlayers)
  }

  // Professional player database with detailed metrics
  const playerDatabase = {
    'GK': {
      id: 'P001',
      name: 'Jogador #001',
      age: 28,
      height: 190,
      weight: 85,
      rating: 85,
      nationality: 'BRA',
      contract: '2025',
      marketValue: '15M',
      technical: 82,
      physical: 88,
      mental: 85,
      tactical: 84,
      attributes: {
        reflexos: 88,
        posicionamento: 85,
        jogo_aéreo: 82,
        saída: 80
      }
    },
    'RB': {
      id: 'P002',
      name: 'Jogador #002',
      age: 26,
      height: 178,
      weight: 75,
      rating: 82,
      nationality: 'ARG',
      contract: '2024',
      marketValue: '12M',
      technical: 84,
      physical: 86,
      mental: 80,
      tactical: 82,
      attributes: {
        velocidade: 88,
        cruzamento: 82,
        desarme: 84,
        resistência: 86
      }
    },
    'CB1': {
      id: 'P003',
      name: 'Jogador #003',
      age: 29,
      height: 188,
      weight: 83,
      rating: 87,
      nationality: 'FRA',
      contract: '2026',
      marketValue: '25M',
      technical: 80,
      physical: 90,
      mental: 87,
      tactical: 88,
      attributes: {
        força: 92,
        marcação: 90,
        antecipação: 88,
        jogo_aéreo: 89
      }
    },
    'CB2': {
      id: 'P004',
      name: 'Jogador #004',
      age: 27,
      height: 186,
      weight: 82,
      rating: 86,
      nationality: 'ESP',
      contract: '2025',
      marketValue: '22M',
      technical: 82,
      physical: 89,
      mental: 85,
      tactical: 87,
      attributes: {
        passe: 84,
        marcação: 89,
        posicionamento: 87,
        força: 88
      }
    },
    'LB': {
      id: 'P005',
      name: 'Jogador #005',
      age: 25,
      height: 176,
      weight: 74,
      rating: 83,
      nationality: 'POR',
      contract: '2024',
      marketValue: '14M',
      technical: 86,
      physical: 85,
      mental: 81,
      tactical: 83,
      attributes: {
        drible: 86,
        velocidade: 87,
        cruzamento: 84,
        resistência: 85
      }
    },
    'CDM': {
      id: 'P006',
      name: 'Jogador #006',
      age: 24,
      height: 182,
      weight: 78,
      rating: 84,
      nationality: 'ITA',
      contract: '2026',
      marketValue: '18M',
      technical: 85,
      physical: 84,
      mental: 83,
      tactical: 86,
      attributes: {
        passe: 87,
        visão: 86,
        desarme: 84,
        interceptação: 85
      }
    },
    'CM1': {
      id: 'P007',
      name: 'Jogador #007',
      age: 26,
      height: 180,
      weight: 76,
      rating: 85,
      nationality: 'GER',
      contract: '2025',
      marketValue: '20M',
      technical: 88,
      physical: 83,
      mental: 84,
      tactical: 85,
      attributes: {
        passe: 89,
        visão: 88,
        chute_longa_distância: 85,
        controle: 87
      }
    },
    'CM2': {
      id: 'P008',
      name: 'Jogador #008',
      age: 23,
      height: 175,
      weight: 72,
      rating: 82,
      nationality: 'NED',
      contract: '2024',
      marketValue: '16M',
      technical: 87,
      physical: 80,
      mental: 82,
      tactical: 81,
      attributes: {
        drible: 88,
        velocidade: 82,
        controle: 87,
        criatividade: 86
      }
    },
    'RW': {
      id: 'P009',
      name: 'Jogador #009',
      age: 22,
      height: 177,
      weight: 73,
      rating: 89,
      nationality: 'BRA',
      contract: '2027',
      marketValue: '35M',
      technical: 92,
      physical: 87,
      mental: 86,
      tactical: 85,
      attributes: {
        velocidade: 93,
        drible: 92,
        finalização: 88,
        aceleração: 94
      }
    },
    'ST': {
      id: 'P010',
      name: 'Jogador #010',
      age: 30,
      height: 183,
      weight: 79,
      rating: 88,
      nationality: 'URU',
      contract: '2025',
      marketValue: '28M',
      technical: 90,
      physical: 86,
      mental: 89,
      tactical: 87,
      attributes: {
        finalização: 92,
        posicionamento: 90,
        jogo_aéreo: 87,
        força: 86
      }
    },
    'LW': {
      id: 'P011',
      name: 'Jogador #011',
      age: 24,
      height: 179,
      weight: 74,
      rating: 87,
      nationality: 'ENG',
      contract: '2026',
      marketValue: '30M',
      technical: 91,
      physical: 85,
      mental: 84,
      tactical: 86,
      attributes: {
        drible: 91,
        velocidade: 88,
        cruzamento: 89,
        finalização: 87
      }
    }
  }

  const handlePlayerSelect = (position) => {
    const playerData = playerDatabase[position.id]
    const playerInfo = {
      ...position,
      ...playerData
    }

    setSelectedPlayers(prev => {
      const exists = prev.find(p => p.id === position.id)
      if (exists) {
        return prev.filter(p => p.id !== position.id)
      } else {
        return [...prev, playerInfo]
      }
    })
  }

  const handleClearSelection = () => {
    setSelectedPlayers([])
  }

  const handleExportReport = () => {
    const report = {
      date: new Date().toISOString(),
      selectedPlayers,
      notes: scoutNotes,
      formation: '4-3-3',
      metrics: {
        avgRating: (selectedPlayers.reduce((sum, p) => sum + p.rating, 0) / selectedPlayers.length).toFixed(1),
        avgAge: (selectedPlayers.reduce((sum, p) => sum + p.age, 0) / selectedPlayers.length).toFixed(1),
        avgTechnical: (selectedPlayers.reduce((sum, p) => sum + p.technical, 0) / selectedPlayers.length).toFixed(1),
        avgPhysical: (selectedPlayers.reduce((sum, p) => sum + p.physical, 0) / selectedPlayers.length).toFixed(1),
        avgMental: (selectedPlayers.reduce((sum, p) => sum + p.mental, 0) / selectedPlayers.length).toFixed(1),
        avgTactical: (selectedPlayers.reduce((sum, p) => sum + p.tactical, 0) / selectedPlayers.length).toFixed(1)
      }
    }

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `scout-report-${new Date().toISOString().split('T')[0]}.json`
    a.click()
  }

  const getAverageMetric = (metric) => {
    if (selectedPlayers.length === 0) return 0
    return (selectedPlayers.reduce((sum, p) => sum + p[metric], 0) / selectedPlayers.length).toFixed(1)
  }

  // Get team lineup with player details
  const getTeamLineup = (teamName) => {
    const players = teamPlayers[teamName] || defaultPlayers

    const positions = [
      { id: 'GK', position: 'GOL', role: 'Goleiro', age: 28, nationality: 'BRA' },
      { id: 'RB', position: 'LD', role: 'Lateral Direito', age: 26, nationality: 'BRA' },
      { id: 'CB1', position: 'ZAG', role: 'Zagueiro', age: 29, nationality: 'BRA' },
      { id: 'CB2', position: 'ZAG', role: 'Zagueiro', age: 27, nationality: 'BRA' },
      { id: 'LB', position: 'LE', role: 'Lateral Esquerdo', age: 25, nationality: 'BRA' },
      { id: 'CDM', position: 'VOL', role: 'Volante', age: 24, nationality: 'BRA' },
      { id: 'CM1', position: 'MC', role: 'Meio Campo', age: 26, nationality: 'BRA' },
      { id: 'CM2', position: 'MC', role: 'Meio Campo', age: 23, nationality: 'BRA' },
      { id: 'RW', position: 'PD', role: 'Ponta Direita', age: 22, nationality: 'BRA' },
      { id: 'ST', position: 'ATA', role: 'Atacante', age: 30, nationality: 'BRA' },
      { id: 'LW', position: 'PE', role: 'Ponta Esquerda', age: 24, nationality: 'BRA' }
    ]

    return positions.map(pos => ({
      name: players[pos.id]?.name || pos.role,
      number: players[pos.id]?.number || '-',
      position: pos.position,
      role: pos.role,
      age: pos.age,
      nationality: pos.nationality
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-2 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Professional Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
                Sistema de Scout Técnico
              </h1>
              <p className="text-slate-400 text-sm sm:text-base">
                Análise tática e avaliação de desempenho de jogadores
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="bg-slate-800 px-3 sm:px-4 py-2 rounded-lg border border-slate-700 flex-1 sm:flex-initial">
                <span className="text-slate-400 text-xs sm:text-sm">Data:</span>
                <p className="text-white font-semibold text-sm sm:text-base">{new Date().toLocaleDateString('pt-BR')}</p>
              </div>
              <div className="bg-slate-800 px-3 sm:px-4 py-2 rounded-lg border border-slate-700 flex-1 sm:flex-initial">
                <span className="text-slate-400 text-xs sm:text-sm">Formação:</span>
                <p className="text-white font-semibold text-sm sm:text-base">4-3-3</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* WhatsApp CTA Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-4 sm:mb-6"
        >
          <div className="bg-gradient-to-r from-green-600 via-green-500 to-blue-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl border-2 border-green-400/30 relative overflow-hidden">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <h3 className="text-white text-base sm:text-xl md:text-2xl font-bold">
                    Faça parte do Grupo Oficial de Scout Técnico!
                  </h3>
                </div>
                <p className="text-green-50 text-xs sm:text-sm md:text-base mb-3">
                  Quer aprender a analisar jogos, interpretar dados e virar um verdadeiro analista técnico de futebol?
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                  {['Indicadores avançados', 'Painéis de performance', 'Métricas exclusivas', 'Análises por IA', 'Comunidade'].map((item, idx) => (
                    <span key={idx} className="bg-white/20 backdrop-blur text-white text-xs px-2 sm:px-3 py-1 rounded-full border border-white/30">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex-shrink-0 w-full md:w-auto">
                <a
                  href="https://wa.me/5519993740142?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20clube%20de%20scout%20e%20como%20fa%C3%A7o%20para%20virar%20um."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 sm:gap-3 bg-white hover:bg-green-50 text-green-600 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 w-full md:w-auto"
                >
                  <svg className="w-5 h-5 sm:w-7 sm:h-7 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-xs text-green-600/80 leading-tight">Fale Conosco</p>
                    <p className="text-xs sm:text-sm font-bold leading-tight">+55 19 99374-0142</p>
                  </div>
                </a>
                <p className="text-center text-white/80 text-xs mt-2">
                  Venha evoluir com a gente!
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Seletor de Times */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <div className="bg-slate-800/50 backdrop-blur rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-slate-700/50">
            <h3 className="text-white text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Escolha o Time para Análise
            </h3>

            {loadingTeams ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3 md:gap-4">
                {teams.map((team) => (
                  <motion.button
                    key={team.id}
                    whileHover={{ scale: 1.08, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTeam(team)}
                    className={`relative p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border-2 transition-all ${
                      selectedTeam?.id === team.id
                        ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/30'
                        : 'bg-slate-900/50 border-slate-700/50 hover:border-slate-600 hover:bg-slate-900/70'
                    }`}
                  >
                    {selectedTeam?.id === team.id && (
                      <motion.div
                        layoutId="activeTeam"
                        className="absolute inset-0 bg-blue-600/10 rounded-lg sm:rounded-xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <div className="relative flex flex-col items-center gap-1.5 sm:gap-2 md:gap-3">
                      <motion.img
                        animate={selectedTeam?.id === team.id ? {
                          rotate: [0, 10, -10, 0],
                        } : {}}
                        transition={{
                          duration: 0.5,
                        }}
                        src={team.logo}
                        alt={team.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/64?text=' + team.name.substring(0, 3)
                        }}
                      />
                      <span className="text-white text-xs sm:text-sm font-bold text-center line-clamp-2">
                        {team.name}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Desktop: Grid Layout | Mobile: Full Width */}
        <div className={`${isDesktop ? 'grid grid-cols-3 gap-6' : ''}`}>
          {/* Team Badge Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`bg-slate-800 rounded-xl p-3 sm:p-4 md:p-6 shadow-2xl border border-slate-700 ${isDesktop ? 'col-span-2' : ''}`}
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-white">Time Selecionado</h2>
              <div className="flex gap-2">
                <span className="px-2 sm:px-3 py-1 bg-green-600/20 text-green-400 rounded-lg text-xs sm:text-sm border border-green-600/30">
                  {selectedPlayers.length}/11 Jogadores
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] md:min-h-[600px] py-6 sm:py-8 md:py-12">
              {selectedTeam ? (
                <motion.div
                  key={selectedTeam.id}
                  initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    duration: 0.8
                  }}
                  className="text-center w-full flex flex-col items-center justify-center"
                >
                  {/* Team Badge */}
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: [0, -5, 5, -5, 0] }}
                    transition={{ duration: 0.5 }}
                    className="relative mb-4 sm:mb-6 md:mb-8 flex items-center justify-center"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-full blur-3xl"></div>
                    <img
                      src={selectedTeam.logo}
                      alt={selectedTeam.name}
                      className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl mx-auto"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/256?text=' + selectedTeam.name.substring(0, 3)
                      }}
                    />
                  </motion.div>

                  {/* Team Name */}
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg"
                  >
                    {selectedTeam.name}
                  </motion.h3>

                  {/* Formation Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 px-4 sm:px-6 py-2 sm:py-3 rounded-full"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="text-white font-semibold text-sm sm:text-base">Formação 4-3-3</span>
                  </motion.div>

                  {/* Stats Overview */}
                  {selectedPlayers.length === 11 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 w-full px-4"
                    >
                      <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-2 sm:p-3 md:p-4">
                        <p className="text-slate-400 text-xs mb-1">Rating Médio</p>
                        <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-400">{getAverageMetric('rating')}</p>
                      </div>
                      <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-2 sm:p-3 md:p-4">
                        <p className="text-slate-400 text-xs mb-1">Idade Média</p>
                        <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-400">{getAverageMetric('age')}</p>
                      </div>
                      <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-2 sm:p-3 md:p-4">
                        <p className="text-slate-400 text-xs mb-1">Técnica</p>
                        <p className="text-lg sm:text-xl md:text-2xl font-bold text-purple-400">{getAverageMetric('technical')}</p>
                      </div>
                      <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-2 sm:p-3 md:p-4">
                        <p className="text-slate-400 text-xs mb-1">Físico</p>
                        <p className="text-lg sm:text-xl md:text-2xl font-bold text-orange-400">{getAverageMetric('physical')}</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <div className="text-slate-400 text-center">
                  <svg className="w-24 h-24 mx-auto mb-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <p className="text-lg">Selecione um time para começar a análise</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Analysis Panel - Desktop */}
          {isDesktop && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 col-span-1"
            >

            {/* Selected Players List */}
            <div className="bg-slate-800 rounded-xl p-3 sm:p-4 md:p-6 shadow-2xl border border-slate-700">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4">
                Jogadores Analisados
              </h2>

              <div className="space-y-2 sm:space-y-3 max-h-[300px] sm:max-h-[400px] overflow-y-auto custom-scrollbar">
                <AnimatePresence>
                  {selectedPlayers.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-slate-400 text-center py-12 border-2 border-dashed border-slate-700 rounded-lg"
                    >
                      <svg className="w-12 h-12 mx-auto mb-3 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <p className="text-sm">Selecione um time acima</p>
                      <p className="text-xs mt-1">para carregar os jogadores automaticamente</p>
                    </motion.div>
                  ) : (
                    selectedPlayers.map((player) => (
                      <motion.div
                        key={player.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-slate-700/50 rounded-lg p-2 sm:p-3 md:p-4 hover:bg-slate-700 transition-colors border border-slate-600"
                      >
                        <div className="flex items-start justify-between mb-2 sm:mb-3">
                          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white text-xs font-bold px-1.5 sm:px-2 md:px-2.5 py-1 sm:py-1.5 rounded">
                              {player.label}
                            </div>
                            <div className="bg-slate-900 border border-slate-600 text-white text-xs sm:text-sm font-bold w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded flex items-center justify-center">
                              {player.number}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="text-white font-semibold text-xs sm:text-sm truncate">
                                {player.name}
                              </h3>
                              <p className="text-slate-400 text-xs truncate">{player.role}</p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-1 sm:gap-1.5 md:gap-2 mb-2 sm:mb-3">
                          <div className="bg-slate-800 rounded p-1 sm:p-1.5 md:p-2">
                            <span className="text-slate-400 text-xs block">Rating</span>
                            <p className="text-green-400 font-bold text-sm sm:text-base md:text-lg">{player.rating}</p>
                          </div>
                          <div className="bg-slate-800 rounded p-1 sm:p-1.5 md:p-2">
                            <span className="text-slate-400 text-xs block">Idade</span>
                            <p className="text-white font-semibold text-sm sm:text-base md:text-lg">{player.age}</p>
                          </div>
                          <div className="bg-slate-800 rounded p-1 sm:p-1.5 md:p-2">
                            <span className="text-slate-400 text-xs block">Alt.</span>
                            <p className="text-white font-semibold text-sm sm:text-base md:text-lg">{player.height}</p>
                          </div>
                          <div className="bg-slate-800 rounded p-1 sm:p-1.5 md:p-2">
                            <span className="text-slate-400 text-xs block">Peso</span>
                            <p className="text-white font-semibold text-sm sm:text-base md:text-lg">{player.weight}</p>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400">Técnico</span>
                            <span className="text-white font-semibold">{player.technical}</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-1.5">
                            <div
                              className="bg-gradient-to-r from-blue-600 to-blue-400 h-1.5 rounded-full"
                              style={{ width: `${player.technical}%` }}
                            />
                          </div>

                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400">Físico</span>
                            <span className="text-white font-semibold">{player.physical}</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-1.5">
                            <div
                              className="bg-gradient-to-r from-green-600 to-green-400 h-1.5 rounded-full"
                              style={{ width: `${player.physical}%` }}
                            />
                          </div>

                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400">Mental</span>
                            <span className="text-white font-semibold">{player.mental}</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-1.5">
                            <div
                              className="bg-gradient-to-r from-purple-600 to-purple-400 h-1.5 rounded-full"
                              style={{ width: `${player.mental}%` }}
                            />
                          </div>

                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400">Tático</span>
                            <span className="text-white font-semibold">{player.tactical}</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-1.5">
                            <div
                              className="bg-gradient-to-r from-orange-600 to-orange-400 h-1.5 rounded-full"
                              style={{ width: `${player.tactical}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-600">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-xs">País:</span>
                            <span className="text-white text-sm font-medium">{player.nationality}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-xs">Valor:</span>
                            <span className="text-green-400 text-sm font-bold">{player.marketValue}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Team Analytics */}
            {selectedPlayers.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-3 sm:p-4 md:p-6 shadow-2xl"
              >
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4">
                  Análise Coletiva
                </h2>

                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-2 sm:p-3">
                    <span className="text-blue-100 text-xs block mb-1">Rating Médio</span>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{getAverageMetric('rating')}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-2 sm:p-3">
                    <span className="text-blue-100 text-xs block mb-1">Idade Média</span>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{getAverageMetric('age')}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-blue-100">Técnico Médio</span>
                      <span className="text-white font-bold">{getAverageMetric('technical')}</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-white h-2 rounded-full shadow-lg"
                        style={{ width: `${getAverageMetric('technical')}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-blue-100">Físico Médio</span>
                      <span className="text-white font-bold">{getAverageMetric('physical')}</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-white h-2 rounded-full shadow-lg"
                        style={{ width: `${getAverageMetric('physical')}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-blue-100">Mental Médio</span>
                      <span className="text-white font-bold">{getAverageMetric('mental')}</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-white h-2 rounded-full shadow-lg"
                        style={{ width: `${getAverageMetric('mental')}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-blue-100">Tático Médio</span>
                      <span className="text-white font-bold">{getAverageMetric('tactical')}</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-white h-2 rounded-full shadow-lg"
                        style={{ width: `${getAverageMetric('tactical')}%` }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Scout Notes */}
            <div className="bg-slate-800 rounded-xl p-3 sm:p-4 md:p-6 shadow-2xl border border-slate-700">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4">
                Observações Técnicas
              </h2>
              <textarea
                value={scoutNotes}
                onChange={(e) => setScoutNotes(e.target.value)}
                placeholder="Registre observações sobre:&#10;• Pontos fortes identificados&#10;• Áreas de melhoria&#10;• Adequação tática&#10;• Recomendações estratégicas"
                className="w-full h-32 sm:h-36 md:h-40 bg-slate-700 text-white rounded-lg p-3 sm:p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 text-xs sm:text-sm border border-slate-600"
              />
            </div>
            </motion.div>
          )}
        </div>

        {/* Analysis Panel - Mobile (Drawer) */}
        <AnimatePresence>
          {!isDesktop && isPanelOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 right-0 h-full w-[85vw] sm:w-96 bg-slate-900 z-50 overflow-y-auto shadow-2xl p-4"
            >
              {/* Close Button */}
              <div className="flex justify-between items-center mb-4 sticky top-0 bg-slate-900 z-10 pb-2">
                <h3 className="text-lg font-bold text-white">Análise do Time</h3>
                <button
                  onClick={() => setIsPanelOpen(false)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* Selected Players List */}
                <div className="bg-slate-800 rounded-xl p-4 shadow-2xl border border-slate-700">
                  <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
                    <AnimatePresence>
                      {selectedPlayers.length === 0 ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-slate-400 text-center py-12 border-2 border-dashed border-slate-700 rounded-lg"
                        >
                          <svg className="w-12 h-12 mx-auto mb-3 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <p className="text-sm">Selecione um time acima</p>
                          <p className="text-xs mt-1">para carregar os jogadores automaticamente</p>
                        </motion.div>
                      ) : (
                        selectedPlayers.map((player) => (
                          <motion.div
                            key={player.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-slate-700/50 rounded-lg p-3 hover:bg-slate-700 transition-colors border border-slate-600"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white text-xs font-bold px-2 py-1 rounded">
                                  {player.label}
                                </div>
                                <div className="bg-slate-900 border border-slate-600 text-white text-xs font-bold w-8 h-8 rounded flex items-center justify-center">
                                  {player.number}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h3 className="text-white font-semibold text-sm truncate">
                                    {player.name}
                                  </h3>
                                  <p className="text-slate-400 text-xs truncate">{player.role}</p>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-4 gap-1.5 mb-2">
                              <div className="bg-slate-800 rounded p-1.5">
                                <span className="text-slate-400 text-xs block">Rating</span>
                                <p className="text-green-400 font-bold text-sm">{player.rating}</p>
                              </div>
                              <div className="bg-slate-800 rounded p-1.5">
                                <span className="text-slate-400 text-xs block">Idade</span>
                                <p className="text-white font-semibold text-sm">{player.age}</p>
                              </div>
                              <div className="bg-slate-800 rounded p-1.5">
                                <span className="text-slate-400 text-xs block">Alt.</span>
                                <p className="text-white font-semibold text-sm">{player.height}</p>
                              </div>
                              <div className="bg-slate-800 rounded p-1.5">
                                <span className="text-slate-400 text-xs block">Peso</span>
                                <p className="text-white font-semibold text-sm">{player.weight}</p>
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-400">Técnico</span>
                                <span className="text-white font-semibold">{player.technical}</span>
                              </div>
                              <div className="w-full bg-slate-800 rounded-full h-1.5">
                                <div
                                  className="bg-gradient-to-r from-blue-600 to-blue-400 h-1.5 rounded-full"
                                  style={{ width: `${player.technical}%` }}
                                />
                              </div>

                              <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-400">Físico</span>
                                <span className="text-white font-semibold">{player.physical}</span>
                              </div>
                              <div className="w-full bg-slate-800 rounded-full h-1.5">
                                <div
                                  className="bg-gradient-to-r from-green-600 to-green-400 h-1.5 rounded-full"
                                  style={{ width: `${player.physical}%` }}
                                />
                              </div>

                              <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-400">Mental</span>
                                <span className="text-white font-semibold">{player.mental}</span>
                              </div>
                              <div className="w-full bg-slate-800 rounded-full h-1.5">
                                <div
                                  className="bg-gradient-to-r from-purple-600 to-purple-400 h-1.5 rounded-full"
                                  style={{ width: `${player.mental}%` }}
                                />
                              </div>

                              <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-400">Tático</span>
                                <span className="text-white font-semibold">{player.tactical}</span>
                              </div>
                              <div className="w-full bg-slate-800 rounded-full h-1.5">
                                <div
                                  className="bg-gradient-to-r from-orange-600 to-orange-400 h-1.5 rounded-full"
                                  style={{ width: `${player.tactical}%` }}
                                />
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-600">
                              <div className="flex items-center gap-2">
                                <span className="text-slate-400 text-xs">País:</span>
                                <span className="text-white text-sm font-medium">{player.nationality}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-slate-400 text-xs">Valor:</span>
                                <span className="text-green-400 text-sm font-bold">{player.marketValue}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Team Analytics */}
                {selectedPlayers.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 shadow-2xl"
                  >
                    <h2 className="text-lg font-bold text-white mb-4">
                      Análise Coletiva
                    </h2>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-white/10 backdrop-blur rounded-lg p-2">
                        <span className="text-blue-100 text-xs block mb-1">Rating Médio</span>
                        <p className="text-2xl font-bold text-white">{getAverageMetric('rating')}</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur rounded-lg p-2">
                        <span className="text-blue-100 text-xs block mb-1">Idade Média</span>
                        <p className="text-2xl font-bold text-white">{getAverageMetric('age')}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-blue-100">Técnico Médio</span>
                          <span className="text-white font-bold">{getAverageMetric('technical')}</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div
                            className="bg-white h-2 rounded-full shadow-lg"
                            style={{ width: `${getAverageMetric('technical')}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-blue-100">Físico Médio</span>
                          <span className="text-white font-bold">{getAverageMetric('physical')}</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div
                            className="bg-white h-2 rounded-full shadow-lg"
                            style={{ width: `${getAverageMetric('physical')}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-blue-100">Mental Médio</span>
                          <span className="text-white font-bold">{getAverageMetric('mental')}</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div
                            className="bg-white h-2 rounded-full shadow-lg"
                            style={{ width: `${getAverageMetric('mental')}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-blue-100">Tático Médio</span>
                          <span className="text-white font-bold">{getAverageMetric('tactical')}</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div
                            className="bg-white h-2 rounded-full shadow-lg"
                            style={{ width: `${getAverageMetric('tactical')}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Scout Notes */}
                <div className="bg-slate-800 rounded-xl p-4 shadow-2xl border border-slate-700">
                  <h2 className="text-lg font-bold text-white mb-4">
                    Observações Técnicas
                  </h2>
                  <textarea
                    value={scoutNotes}
                    onChange={(e) => setScoutNotes(e.target.value)}
                    placeholder="Registre observações sobre:&#10;• Pontos fortes identificados&#10;• Áreas de melhoria&#10;• Adequação tática&#10;• Recomendações estratégicas"
                    className="w-full h-36 bg-slate-700 text-white rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 text-sm border border-slate-600"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Button (Mobile Only) */}
        {!isPanelOpen && !isDesktop && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPanelOpen(true)}
            className="fixed bottom-6 right-6 z-40 bg-gradient-to-br from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all border-2 border-blue-400/30"
          >
            <div className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              {selectedPlayers.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white shadow-lg"
                >
                  {selectedPlayers.length}
                </motion.span>
              )}
            </div>
          </motion.button>
        )}

        {/* Overlay (Mobile Only) */}
        <AnimatePresence>
          {isPanelOpen && !isDesktop && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPanelOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgb(51, 65, 85);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(71, 85, 105);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(100, 116, 139);
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </div>
  )
}

export default TechnicalScout
