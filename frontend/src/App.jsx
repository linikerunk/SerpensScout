import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './contexts/AppContext'
import Header from './components/layout/Header'
import Aside from './components/layout/Aside'
import About from './pages/About'
import TechnicalScout from './pages/TechnicalScout'
import Predictions from './pages/Predictions'
import UserProfile from './pages/UserProfile'
import Teams from './pages/Teams'

/**
 * 🦇 App Component - O Coração da Aplicação
 *
 * Aqui é onde tudo começa. O componente raiz que carrega
 * a alma de todo o projeto. Seguindo a filosofia DracoPunk:
 * elegante, funcional e com propósito.
 */
function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <div className="flex">
            <Aside />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Navigate to="/palpites" replace />} />
                <Route path="/scout" element={<TechnicalScout />} />
                <Route path="/palpites" element={<Predictions />} />
                <Route path="/times" element={<Teams />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AppProvider>
  )
}

export default App
