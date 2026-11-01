'use client'

import { motion } from 'framer-motion'

type Orb = {
    left: string
    top: string
    size: number
    color: string
    opacity: number
    x: string[]
    y: string[]
    duration: number
}

const ORBS: Orb[] = [
    { left: '-5%', top: '-10%', size: 520, color: '124,92,255', opacity: 0.38,
        x: ['0vw', '38vw', '12vw', '0vw'], y: ['0vh', '18vh', '42vh', '0vh'], duration: 11 },

    { left: '70%', top: '-5%', size: 460, color: '99,102,241', opacity: 0.34,
        x: ['0vw', '-34vw', '-10vw', '0vw'], y: ['0vh', '30vh', '8vh', '0vh'], duration: 13 },

    { left: '10%', top: '55%', size: 500, color: '109,40,217', opacity: 0.32,
        x: ['0vw', '30vw', '55vw', '0vw'], y: ['0vh', '-28vh', '-8vh', '0vh'], duration: 12 },

    { left: '65%', top: '60%', size: 440, color: '124,92,255', opacity: 0.30,
        x: ['0vw', '-40vw', '-18vw', '0vw'], y: ['0vh', '-36vh', '-12vh', '0vh'], duration: 10 },

    { left: '40%', top: '30%', size: 340, color: '79,70,229', opacity: 0.26,
        x: ['0vw', '-30vw', '26vw', '0vw'], y: ['0vh', '26vh', '-24vh', '0vh'], duration: 9 },
]

export const AuroraBackground = () => {
    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
        >
            {ORBS.map((orb, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full mix-blend-screen will-change-transform"
                    style={{
                        left: orb.left,
                        top: orb.top,
                        width: orb.size,
                        height: orb.size,
                        opacity: orb.opacity,
                        background: `radial-gradient(circle at center, rgba(${orb.color},1) 0%, rgba(${orb.color},0) 70%)`,
                        filter: 'blur(60px)',
                    }}
                    animate={{ x: orb.x, y: orb.y }}
                    transition={{
                        duration: orb.duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}

            <div
                className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
            />
        </div>
    )
}