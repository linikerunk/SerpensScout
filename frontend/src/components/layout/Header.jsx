import React from "react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-black/95 backdrop-blur border-b border-neutral-800"
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center"
          >
            <motion.img
              src="/fcscout.png"
              alt="FC Scout Logo"
              className="h-10 w-auto select-none"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
          </motion.div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">

            {["Área", "Palpites", "Jogos", "Sobre", "Contato"].map(
              (item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05, opacity: 1 }}
                  className="text-white/80 font-light hover:text-white transition-colors"
                >
                  {item}
                </motion.a>
              )
            )}

            {/* Botão Entrar */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              className="px-4 py-1.5 rounded-full border border-white/30 text-white font-light hover:bg-white hover:text-black transition-all"
            >
              Entrar
            </motion.button>
          </div>

          {/* Menu Mobile Button */}
          <motion.button
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.5 }}
            whileTap={{ scale: 0.85 }}
            className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>

        </nav>
      </div>
    </motion.header>
  );
};

export default Header;