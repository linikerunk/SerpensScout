import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { matchesService, statsService } from '../services/api'

/**
 * Predictions Page - Football Predictions and Ranking System
 * Now with real data from Django API
 */
const Predictions = () => {
  const navigate = useNavigate()
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [userPrediction, setUserPrediction] = useState(null)
  const [confidenceLevel, setConfidenceLevel] = useState(3)
  const [upcomingMatches, setUpcomingMatches] = useState([])
  const [rankingData, setRankingData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Fetch data on component mount
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch matches and ranking in parallel
      const [matchesResponse, rankingResponse] = await Promise.all([
        matchesService.getUpcomingMatches(),
        statsService.getRanking(100) // Fetch more data for pagination
      ])

      // Transform matches data to match frontend format
      const formattedMatches = matchesResponse.map(match => ({
        id: match.id,
        homeTeam: match.home_team,
        awayTeam: match.away_team,
        date: match.match_date,
        time: match.match_time.slice(0, 5), // HH:MM format
        competition: match.competition,
        status: match.status
      }))

      // Transform ranking data
      const formattedRanking = rankingResponse.map((user, index) => ({
        position: user.position || (index + 1),
        name: user.user_name,
        totalPredictions: user.total_predictions,
        correctPredictions: user.correct_predictions,
        accuracy: user.accuracy,
        points: user.total_points,
        trend: 'same' // This would come from historical data
      }))

      setUpcomingMatches(formattedMatches)
      setRankingData(formattedRanking)
    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Erro ao carregar dados. Usando dados de exemplo.')

      // Fallback to mock data if API fails
      setUpcomingMatches([
        {
          id: 1,
          homeTeam: 'Flamengo',
          awayTeam: 'Palmeiras',
          date: '2025-11-15',
          time: '19:00',
          competition: 'Brasileirão',
          status: 'scheduled'
        }
      ])

      setRankingData([
        {
          position: 1,
          name: 'João Silva',
          totalPredictions: 60,
          correctPredictions: 45,
          accuracy: 75,
          points: 450,
          trend: 'up'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  // Generate avatar color based on name
  const getAvatarColor = (name) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-indigo-500 to-indigo-600',
      'from-violet-500 to-violet-600',
      'from-cyan-500 to-cyan-600',
      'from-teal-500 to-teal-600',
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  // Get user initials for avatar
  const getInitials = (name) => {
    const parts = name.split(' ')
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return (
          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        )
      case 'down':
        return (
          <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        )
      default:
        return (
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
          </svg>
        )
    }
  }

  const handlePredictionSubmit = () => {
    if (selectedMatch && userPrediction) {
      alert(`Palpite registrado com ${confidenceLevel} estrelas de confiança!`)
      setSelectedMatch(null)
      setUserPrediction(null)
      setConfidenceLevel(3)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00')
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
  }

  const handleUserClick = (userName) => {
    // Navigate to user profile page
    navigate(`/perfil/${encodeURIComponent(userName)}`)
  }

  // Pagination calculations
  const totalPages = Math.ceil(rankingData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentRankingData = rankingData.slice(startIndex, endIndex)

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando partidas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header - Redesigned */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700/50">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full mb-4 border border-blue-600/30">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-semibold">Sistema de Palpites</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Comunidade de <span className="text-blue-400">Palpiteiros</span>
              </h1>

              <p className="text-slate-300 text-lg mb-2">
                Faça seus palpites, participe do clube do palpitrometro pelo WhatsApp (19) 99374-0142
              </p>

              <p className="text-slate-400 text-sm">
                Acompanhe os jogos ao vivo, dispute com os amigos e suba no ranking
              </p>

              {error && (
                <div className="mt-6 bg-yellow-600/20 border border-yellow-600/30 text-yellow-200 px-4 py-3 rounded-xl inline-flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {error}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Matches */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 shadow-2xl border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Próximos Jogos
              </h2>

              {upcomingMatches.length === 0 ? (
                <p className="text-slate-400 text-center py-8">
                  Nenhum jogo disponível no momento
                </p>
              ) : (
                <div className="space-y-3">
                  {upcomingMatches.map((match) => (
                    <motion.div
                      key={match.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedMatch(match)}
                      className={`p-4 rounded-xl cursor-pointer transition-all border ${
                        selectedMatch?.id === match.id
                          ? 'bg-blue-600/20 border-blue-500/50'
                          : 'bg-slate-900/50 border-slate-700/50 hover:bg-slate-900/70'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-400">{match.competition}</span>
                        <span className="text-xs text-slate-400">{formatDate(match.date)} • {match.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white font-semibold text-sm">{match.homeTeam}</span>
                        <span className="text-slate-500 font-bold mx-2">VS</span>
                        <span className="text-white font-semibold text-sm">{match.awayTeam}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Prediction Panel */}
              <AnimatePresence>
                {selectedMatch && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-slate-700"
                  >
                    <h3 className="text-white font-semibold mb-3">Faça seu palpite:</h3>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <button
                        onClick={() => setUserPrediction('home')}
                        className={`py-3 px-2 rounded-lg font-semibold transition-all text-sm ${
                          userPrediction === 'home'
                            ? 'bg-green-600 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        Vitória<br/>Casa
                      </button>
                      <button
                        onClick={() => setUserPrediction('draw')}
                        className={`py-3 px-2 rounded-lg font-semibold transition-all text-sm ${
                          userPrediction === 'draw'
                            ? 'bg-yellow-600 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        Empate
                      </button>
                      <button
                        onClick={() => setUserPrediction('away')}
                        className={`py-3 px-2 rounded-lg font-semibold transition-all text-sm ${
                          userPrediction === 'away'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        Vitória<br/>Fora
                      </button>
                    </div>

                    <div className="mb-4">
                      <label className="text-slate-400 text-sm mb-2 block">
                        Confiança ({confidenceLevel} estrelas):
                      </label>
                      <div className="flex items-center justify-between gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setConfidenceLevel(star)}
                            className="flex-1"
                          >
                            <svg
                              className={`w-full h-8 ${
                                star <= confidenceLevel ? 'text-yellow-400' : 'text-slate-600'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handlePredictionSubmit}
                      disabled={!userPrediction}
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Confirmar Palpite
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 hover:bg-slate-900/70 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="text-slate-400 text-xs">Seus Palpites</p>
                </div>
                <p className="text-white text-3xl font-bold">24</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 hover:bg-slate-900/70 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-slate-400 text-xs">Acertos</p>
                </div>
                <p className="text-white text-3xl font-bold">18</p>
              </div>
            </div>
          </motion.div>

          {/* Ranking Section - Redesigned for UX */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 shadow-2xl border border-slate-700/50">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-3xl font-bold text-white">
                    Palpitômetro
                  </h2>
                  <div className="flex items-center gap-2 px-3 py-1 bg-slate-700/50 rounded-full">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-slate-300">Ao vivo</span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm">
                  Acompanhe os melhores palpiteiros da comunidade em tempo real
                </p>
              </div>

              {/* Stats Summary */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-slate-400 text-xs mb-1">Total de Palpiteiros</p>
                  <p className="text-white text-2xl font-bold">{rankingData.length}</p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-slate-400 text-xs mb-1">Palpites Hoje</p>
                  <p className="text-white text-2xl font-bold">{upcomingMatches.length}</p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-slate-400 text-xs mb-1">Taxa Média</p>
                  <p className="text-white text-2xl font-bold">
                    {rankingData.length > 0 ? Math.round(rankingData.reduce((acc, p) => acc + p.accuracy, 0) / rankingData.length) : 0}%
                  </p>
                </div>
              </div>

              {/* Ranking List */}
              <div className="space-y-3">
                {rankingData.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-slate-400">Nenhum palpiteiro cadastrado ainda</p>
                  </div>
                ) : (
                  currentRankingData.map((player, index) => (
                    <motion.div
                      key={player.position}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-slate-900/50 hover:bg-slate-900/70 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        {/* Position Badge */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center border-2 border-slate-600">
                            <span className="text-slate-300 font-bold text-lg">#{player.position}</span>
                          </div>
                        </div>

                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${getAvatarColor(player.name)} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                            {getInitials(player.name)}
                          </div>
                        </div>

                        {/* Player Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <button
                              onClick={() => handleUserClick(player.name)}
                              className="text-white font-bold text-lg hover:text-blue-400 transition-colors truncate"
                            >
                              {player.name}
                            </button>
                            {getTrendIcon(player.trend)}
                          </div>

                          {/* Stats Row */}
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                              </svg>
                              <span className="text-slate-400">{player.totalPredictions} palpites</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-green-400 font-semibold">{player.correctPredictions} acertos</span>
                            </div>
                          </div>
                        </div>

                        {/* Accuracy & Points */}
                        <div className="hidden md:flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-xs text-slate-400 mb-1">Taxa de Acerto</p>
                            <div className="flex items-center gap-2">
                              <div className="w-24 bg-slate-700 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                                  style={{ width: `${player.accuracy}%` }}
                                />
                              </div>
                              <span className="text-blue-400 font-bold text-sm min-w-[45px]">{player.accuracy}%</span>
                            </div>
                          </div>

                          <div className="text-right min-w-[80px]">
                            <p className="text-xs text-slate-400 mb-1">Pontos</p>
                            <p className="text-white text-xl font-bold">{player.points}</p>
                          </div>
                        </div>

                        {/* Mobile Stats */}
                        <div className="md:hidden flex flex-col items-end gap-1">
                          <div className="flex items-center gap-1">
                            <span className="text-blue-400 font-bold text-sm">{player.accuracy}%</span>
                          </div>
                          <div className="text-white font-bold">{player.points}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}

                {/* Pagination Controls - Redesigned */}
                {rankingData.length > itemsPerPage && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-slate-800 border border-slate-700/50 text-white rounded-xl hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    <div className="flex items-center gap-2">
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let page
                        if (totalPages <= 5) {
                          page = i + 1
                        } else if (currentPage <= 3) {
                          page = i + 1
                        } else if (currentPage >= totalPages - 2) {
                          page = totalPages - 4 + i
                        } else {
                          page = currentPage - 2 + i
                        }
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 rounded-xl font-semibold transition-all min-w-[44px] ${
                              currentPage === page
                                ? 'bg-blue-600 text-white border border-blue-500/50'
                                : 'bg-slate-800 border border-slate-700/50 text-slate-300 hover:bg-slate-700'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      })}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-slate-800 border border-slate-700/50 text-white rounded-xl hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    <div className="ml-4 text-slate-400 text-sm">
                      Página {currentPage} de {totalPages}
                    </div>
                  </div>
                )}
              </div>

              {/* Call to Action - Redesigned */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-8 bg-slate-900/80 backdrop-blur rounded-2xl p-8 border border-slate-700/50"
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <h3 className="text-white text-2xl font-bold mb-2">
                      Mostre seu conhecimento
                    </h3>
                    <p className="text-slate-400">
                      Faça seus palpites, acumule pontos e dispute o topo do ranking
                    </p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105">
                    Começar a Palpitar
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Predictions
