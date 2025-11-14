import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { statsService } from '../services/api'

/**
 * User Profile Page - Displays user prediction history and statistics
 */
const UserProfile = () => {
  const { username } = useParams()
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchUserData()
  }, [username])

  const fetchUserData = async () => {
    try {
      setLoading(true)
      setError(null)

      // For now, we'll use mock data since the API endpoint might not exist yet
      // TODO: Replace with actual API call when endpoint is ready
      // const response = await statsService.getUserProfile(username)

      // Mock user data
      setUserData({
        name: decodeURIComponent(username),
        totalPredictions: 42,
        correctPredictions: 28,
        accuracy: 66.7,
        points: 280,
        position: 5,
        joinDate: '2025-01-01',
        badge: null
      })

      // Mock predictions history
      setPredictions([
        {
          id: 1,
          homeTeam: 'Flamengo',
          awayTeam: 'Palmeiras',
          prediction: 'home',
          result: 'home',
          correct: true,
          points: 10,
          date: '2025-11-10',
          competition: 'Brasileirão'
        },
        {
          id: 2,
          homeTeam: 'São Paulo',
          awayTeam: 'Corinthians',
          prediction: 'away',
          result: 'draw',
          correct: false,
          points: 0,
          date: '2025-11-08',
          competition: 'Brasileirão'
        },
        {
          id: 3,
          homeTeam: 'Botafogo',
          awayTeam: 'Vasco',
          prediction: 'home',
          result: 'home',
          correct: true,
          points: 10,
          date: '2025-11-05',
          competition: 'Brasileirão'
        }
      ])
    } catch (err) {
      console.error('Error fetching user data:', err)
      setError('Erro ao carregar dados do usuário')
    } finally {
      setLoading(false)
    }
  }

  const getPredictionText = (prediction) => {
    switch (prediction) {
      case 'home':
        return 'Vitória Casa'
      case 'away':
        return 'Vitória Fora'
      case 'draw':
        return 'Empate'
      default:
        return prediction
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00')
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando perfil...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <button
            onClick={() => navigate('/palpites')}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
          >
            Voltar para Rankings
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/palpites')}
          className="mb-6 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para Rankings
        </motion.button>

        {/* User Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800 rounded-xl p-8 shadow-2xl border border-slate-700 mb-6"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {userData?.name.charAt(0).toUpperCase()}
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-cyan-400 mb-2">{userData?.name}</h1>
              <p className="text-slate-400 mb-4">
                Membro desde {formatDate(userData?.joinDate)}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <p className="text-slate-400 text-sm mb-1">Posição</p>
                  <p className="text-white text-2xl font-bold">#{userData?.position}</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <p className="text-slate-400 text-sm mb-1">Pontos</p>
                  <p className="text-yellow-400 text-2xl font-bold">{userData?.points}</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <p className="text-slate-400 text-sm mb-1">Palpites</p>
                  <p className="text-white text-2xl font-bold">{userData?.totalPredictions}</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <p className="text-slate-400 text-sm mb-1">Acertos</p>
                  <p className="text-green-400 text-2xl font-bold">{userData?.correctPredictions}</p>
                </div>
              </div>

              {/* Accuracy Bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Aproveitamento</span>
                  <span className="text-cyan-400 font-bold">{userData?.accuracy}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${userData?.accuracy}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Predictions History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800 rounded-xl p-6 shadow-2xl border border-slate-700"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Histórico de Palpites
          </h2>

          {predictions.length === 0 ? (
            <p className="text-slate-400 text-center py-8">
              Nenhum palpite registrado ainda
            </p>
          ) : (
            <div className="space-y-3">
              {predictions.map((pred, index) => (
                <motion.div
                  key={pred.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border ${
                    pred.correct
                      ? 'bg-green-900/20 border-green-700/30'
                      : 'bg-red-900/20 border-red-700/30'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    {/* Match Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-slate-400">{pred.competition}</span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-400">{formatDate(pred.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">{pred.homeTeam}</span>
                        <span className="text-slate-500 font-bold">VS</span>
                        <span className="text-white font-semibold">{pred.awayTeam}</span>
                      </div>
                    </div>

                    {/* Prediction Info */}
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-xs text-slate-400 mb-1">Seu Palpite</p>
                        <p className="text-cyan-400 font-semibold text-sm">{getPredictionText(pred.prediction)}</p>
                      </div>

                      {/* Result Badge */}
                      <div className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                        pred.correct ? 'bg-green-600' : 'bg-red-600'
                      }`}>
                        {pred.correct ? (
                          <>
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-white font-bold">+{pred.points}</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-white font-bold">{pred.points}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default UserProfile
