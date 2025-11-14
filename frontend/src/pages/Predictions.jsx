import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { matchesService, statsService } from '../services/api'

/**
 * Predictions Page - Football Predictions and Ranking System
 * Now with real data from Django API
 */
const Predictions = () => {
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [userPrediction, setUserPrediction] = useState(null)
  const [confidenceLevel, setConfidenceLevel] = useState(3)
  const [upcomingMatches, setUpcomingMatches] = useState([])
  const [rankingData, setRankingData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
        statsService.getRanking(10)
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
        trend: 'same', // This would come from historical data
        badge: index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : null
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
          trend: 'up',
          badge: 'gold'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'gold':
        return 'from-yellow-400 to-yellow-600'
      case 'silver':
        return 'from-gray-300 to-gray-500'
      case 'bronze':
        return 'from-orange-400 to-orange-600'
      default:
        return 'from-slate-600 to-slate-700'
    }
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Palpiteiros FC
          </h1>
          <p className="text-slate-400 text-lg mb-2">
            Desafie seus amigos e suba no ranking!
          </p>
          <p className="text-slate-500 text-sm">
            Participe do sistema de palpites, marque presença nos jogos e mostre que você entende de futebol
          </p>

          {error && (
            <div className="mt-4 bg-yellow-600/20 border border-yellow-600/30 text-yellow-200 px-4 py-2 rounded-lg inline-block">
              {error}
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Matches */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-slate-800 rounded-xl p-6 shadow-2xl border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      className={`p-4 rounded-lg cursor-pointer transition-all border ${
                        selectedMatch?.id === match.id
                          ? 'bg-blue-600/20 border-blue-500'
                          : 'bg-slate-700/50 border-slate-600 hover:bg-slate-700'
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
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-4 shadow-xl">
                <p className="text-green-100 text-sm mb-1">Seus Palpites</p>
                <p className="text-white text-3xl font-bold">24</p>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 shadow-xl">
                <p className="text-blue-100 text-sm mb-1">Acertos</p>
                <p className="text-white text-3xl font-bold">18</p>
              </div>
            </div>
          </motion.div>

          {/* Ranking Table */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-slate-800 rounded-xl p-6 shadow-2xl border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <svg className="w-7 h-7 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Ranking dos Palpiteiros
                </h2>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Dados da API
                </div>
              </div>

              <p className="text-slate-400 mb-6">
                Quem acerta mais... aparece no topo! A cada acerto, você ganha pontos e sobe no ranking geral.
              </p>

              {/* Table Header */}
              <div className="overflow-x-auto">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-slate-900/50 rounded-lg mb-2 border border-slate-700">
                  <div className="col-span-1 text-slate-400 font-semibold text-sm">#</div>
                  <div className="col-span-4 text-slate-400 font-semibold text-sm">Participante</div>
                  <div className="col-span-2 text-slate-400 font-semibold text-sm text-center">Palpites</div>
                  <div className="col-span-2 text-slate-400 font-semibold text-sm text-center">Acertos</div>
                  <div className="col-span-2 text-slate-400 font-semibold text-sm text-center">Aproveitamento</div>
                  <div className="col-span-1 text-slate-400 font-semibold text-sm text-center">Pontos</div>
                </div>

                {/* Table Rows */}
                {rankingData.length === 0 ? (
                  <p className="text-slate-400 text-center py-8">
                    Nenhum dado de ranking disponível
                  </p>
                ) : (
                  <div className="space-y-2">
                    {rankingData.map((player, index) => (
                      <motion.div
                        key={player.position}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`grid grid-cols-1 md:grid-cols-12 gap-4 p-4 rounded-lg border transition-all hover:scale-[1.01] ${
                          player.badge
                            ? `bg-gradient-to-r ${getBadgeColor(player.badge)} bg-opacity-10 border-${player.badge === 'gold' ? 'yellow' : player.badge === 'silver' ? 'gray' : 'orange'}-500/30`
                            : 'bg-slate-700/30 border-slate-600 hover:bg-slate-700/50'
                        }`}
                      >
                        {/* Position */}
                        <div className="col-span-1 flex items-center justify-center md:justify-start">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                            player.badge
                              ? `bg-gradient-to-br ${getBadgeColor(player.badge)} text-white shadow-lg`
                              : 'bg-slate-600 text-slate-300'
                          }`}>
                            {player.position}
                          </div>
                        </div>

                        {/* Name */}
                        <div className="col-span-4 flex items-center gap-2">
                          <span className="text-white font-semibold">{player.name}</span>
                          {getTrendIcon(player.trend)}
                        </div>

                        {/* Stats - Mobile */}
                        <div className="md:hidden col-span-1 grid grid-cols-4 gap-2 text-center">
                          <div>
                            <p className="text-xs text-slate-400">Palpites</p>
                            <p className="text-white font-bold">{player.totalPredictions}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400">Acertos</p>
                            <p className="text-green-400 font-bold">{player.correctPredictions}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400">Aproveit.</p>
                            <p className="text-blue-400 font-bold">{player.accuracy}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400">Pontos</p>
                            <p className="text-yellow-400 font-bold">{player.points}</p>
                          </div>
                        </div>

                        {/* Stats - Desktop */}
                        <div className="hidden md:flex col-span-2 items-center justify-center">
                          <span className="text-white font-semibold">{player.totalPredictions}</span>
                        </div>

                        <div className="hidden md:flex col-span-2 items-center justify-center">
                          <span className="text-green-400 font-bold">{player.correctPredictions}</span>
                        </div>

                        <div className="hidden md:flex col-span-2 items-center justify-center">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-slate-600 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                                style={{ width: `${player.accuracy}%` }}
                              />
                            </div>
                            <span className="text-blue-400 font-bold text-sm">{player.accuracy}%</span>
                          </div>
                        </div>

                        <div className="hidden md:flex col-span-1 items-center justify-center">
                          <span className="text-yellow-400 font-bold">{player.points}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-6 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-center"
              >
                <h3 className="text-white text-xl font-bold mb-2">
                  Quer fazer parte do ranking?
                </h3>
                <p className="text-green-100 mb-4">
                  Entre para a comunidade e comece a palpitar agora mesmo!
                </p>
                <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-all shadow-lg">
                  Criar Conta Grátis
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Predictions
