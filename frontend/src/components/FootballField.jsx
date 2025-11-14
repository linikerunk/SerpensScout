import { motion } from 'framer-motion'
import { useState } from 'react'

/**
 * Football Field Component with Animated Players
 * Displays a soccer field with selectable player positions
 */
const FootballField = ({ selectedPlayers = [], onPlayerSelect }) => {
  const [hoveredPosition, setHoveredPosition] = useState(null)

  // Player positions on the field (4-3-3 formation)
  const positions = [
    // Goalkeeper
    { id: 'GK', x: 50, y: 90, label: 'GK', role: 'Goleiro' },

    // Defenders
    { id: 'RB', x: 20, y: 75, label: 'LD', role: 'Lateral Direito' },
    { id: 'CB1', x: 40, y: 78, label: 'ZAG', role: 'Zagueiro' },
    { id: 'CB2', x: 60, y: 78, label: 'ZAG', role: 'Zagueiro' },
    { id: 'LB', x: 80, y: 75, label: 'LE', role: 'Lateral Esquerdo' },

    // Midfielders
    { id: 'CDM', x: 50, y: 60, label: 'VOL', role: 'Volante' },
    { id: 'CM1', x: 35, y: 50, label: 'MC', role: 'Meio Campo' },
    { id: 'CM2', x: 65, y: 50, label: 'MC', role: 'Meio Campo' },

    // Forwards
    { id: 'RW', x: 20, y: 25, label: 'PD', role: 'Ponta Direita' },
    { id: 'ST', x: 50, y: 20, label: 'ATA', role: 'Atacante' },
    { id: 'LW', x: 80, y: 25, label: 'PE', role: 'Ponta Esquerda' }
  ]

  const handlePositionClick = (position) => {
    if (onPlayerSelect) {
      onPlayerSelect(position)
    }
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-green-600 via-green-500 to-green-600 rounded-lg overflow-hidden shadow-2xl">
      {/* Field Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 50px,
            rgba(255,255,255,0.1) 50px,
            rgba(255,255,255,0.1) 52px
          )`
        }}></div>
      </div>

      {/* Field Markings */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Outer border */}
        <rect x="2" y="2" width="96" height="96" fill="none" stroke="white" strokeWidth="0.3" opacity="0.8"/>

        {/* Center line */}
        <line x1="2" y1="50" x2="98" y2="50" stroke="white" strokeWidth="0.3" opacity="0.8"/>

        {/* Center circle */}
        <circle cx="50" cy="50" r="8" fill="none" stroke="white" strokeWidth="0.3" opacity="0.8"/>
        <circle cx="50" cy="50" r="0.5" fill="white" opacity="0.8"/>

        {/* Penalty areas */}
        <rect x="35" y="2" width="30" height="15" fill="none" stroke="white" strokeWidth="0.3" opacity="0.8"/>
        <rect x="35" y="83" width="30" height="15" fill="none" stroke="white" strokeWidth="0.3" opacity="0.8"/>

        {/* Goal areas */}
        <rect x="42" y="2" width="16" height="7" fill="none" stroke="white" strokeWidth="0.3" opacity="0.8"/>
        <rect x="42" y="91" width="16" height="7" fill="none" stroke="white" strokeWidth="0.3" opacity="0.8"/>

        {/* Penalty spots */}
        <circle cx="50" cy="10" r="0.5" fill="white" opacity="0.8"/>
        <circle cx="50" cy="90" r="0.5" fill="white" opacity="0.8"/>
      </svg>

      {/* Player Positions */}
      {positions.map((position, index) => {
        const isSelected = selectedPlayers.some(p => p.id === position.id)
        const isHovered = hoveredPosition === position.id

        return (
          <motion.div
            key={position.id}
            className="absolute cursor-pointer"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: index * 0.1,
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onHoverStart={() => setHoveredPosition(position.id)}
            onHoverEnd={() => setHoveredPosition(null)}
            onClick={() => handlePositionClick(position)}
          >
            {/* Player Circle */}
            <motion.div
              className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                isSelected
                  ? 'bg-yellow-400 ring-4 ring-yellow-300'
                  : 'bg-white/90 hover:bg-white'
              }`}
              animate={{
                boxShadow: isSelected
                  ? ['0 0 20px rgba(250, 204, 21, 0.6)', '0 0 40px rgba(250, 204, 21, 0.8)', '0 0 20px rgba(250, 204, 21, 0.6)']
                  : '0 10px 25px rgba(0, 0, 0, 0.3)'
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <span className={`text-xs font-bold ${isSelected ? 'text-gray-800' : 'text-gray-700'}`}>
                {position.label}
              </span>
            </motion.div>

            {/* Player Label on Hover */}
            {isHovered && (
              <motion.div
                className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap shadow-lg z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {position.role}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-900"></div>
              </motion.div>
            )}

            {/* Selection Pulse Effect */}
            {isSelected && (
              <motion.div
                className="absolute inset-0 rounded-full bg-yellow-400"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            )}
          </motion.div>
        )
      })}

      {/* Corner Flags Animation */}
      {[
        { x: 2, y: 2 },
        { x: 98, y: 2 },
        { x: 2, y: 98 },
        { x: 98, y: 98 }
      ].map((corner, index) => (
        <motion.div
          key={`corner-${index}`}
          className="absolute w-2 h-2"
          style={{
            left: `${corner.x}%`,
            top: `${corner.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: index * 0.2
          }}
        >
          <div className="w-full h-full bg-white rounded-full shadow-lg"></div>
        </motion.div>
      ))}
    </div>
  )
}

export default FootballField
