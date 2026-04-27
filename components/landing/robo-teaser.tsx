'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function RoboTeaser() {
  return (
    <section className="bg-sp-dark py-20 md:py-28 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-sans text-xs uppercase tracking-[0.2em]" style={{ color: '#E31E24' }}>
              TECNOLOGÍA EXCLUSIVA EN COLOMBIA
            </span>

            <h2 className="mt-4 font-serif text-display-section text-white leading-tight">
              El primer club deportivo con robótica integrada.
            </h2>

            <p className="mt-6 font-sans text-body-lg text-white/70 leading-relaxed">
              Mientras juegas, el robot trabaja. Bebidas, snacks, pedidos desde tu teléfono — entregados en tu cancha.
            </p>

            <Link
              href="/robotica"
              className="inline-flex items-center gap-2 mt-10 px-6 py-3 rounded-lg font-sans font-bold uppercase tracking-[0.04em] transition-all hover:scale-[1.02]"
              style={{
                background: '#E31E24',
                color: '#FFFFFF',
                boxShadow: '0 4px 20px rgba(227,30,36,0.35)',
              }}
            >
              Ver módulos de automatización
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>

          {/* Robot Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Placeholder for AR4 robot photo */}
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Dramatic dark background */}
              <div className="absolute inset-0 bg-gradient-to-br from-sp-green/20 to-sp-dark rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Robot Arm Illustration */}
                  <div className="relative">
                    {/* Base */}
                    <motion.div
                      className="w-24 h-8 bg-sp-green rounded-lg mx-auto"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    {/* Arm segments */}
                    <motion.div
                      animate={{ rotate: [-5, 5, -5] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ transformOrigin: 'bottom center' }}
                      className="relative h-32 w-6 bg-sp-green mx-auto -mt-1 rounded-t-lg"
                    >
                      <motion.div
                        animate={{ rotate: [10, -10, 10] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ transformOrigin: 'top center' }}
                        className="absolute -top-1 left-1/2 -translate-x-1/2 h-24 w-5 bg-sp-green rounded-lg"
                      >
                        {/* Gripper */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1">
                          <motion.div
                            animate={{ rotate: [0, -20, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-2 h-8 rounded-t-lg" style={{ background: '#E31E24' }}
                            style={{ transformOrigin: 'bottom center' }}
                          />
                          <motion.div
                            animate={{ rotate: [0, 20, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-2 h-8 rounded-t-lg" style={{ background: '#E31E24' }}
                            style={{ transformOrigin: 'bottom center' }}
                          />
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Specs Badge */}
                    <div className="absolute -right-20 top-0 bg-sp-dark/80 backdrop-blur px-3 py-2 rounded">
                      <p className="font-mono text-[10px]" style={{ color: '#E31E24' }}>AR4 6DOF</p>
                      <p className="font-mono text-[10px] text-white/50">600mm reach</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accent lines */}
              <div className="absolute top-4 left-4 w-8 h-px" style={{ background: '#E31E24' }} />
              <div className="absolute top-4 left-4 w-px h-8" style={{ background: '#E31E24' }} />
              <div className="absolute bottom-4 right-4 w-8 h-px" style={{ background: '#E31E24' }} />
              <div className="absolute bottom-4 right-4 w-px h-8" style={{ background: '#E31E24' }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
