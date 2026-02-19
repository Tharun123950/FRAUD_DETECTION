import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, Activity, ChevronRight, BrainCircuit } from 'lucide-react';

const SectorSelection = ({ onSelect }) => {
    const sectors = [
        {
            id: 'banking',
            title: 'Banking Fraud Detection',
            icon: <Landmark size={40} />,
            description: 'Analyze transactions, suspicious patterns, and account takeovers using AI-driven behavioral models.',
            color: 'var(--primary)',
            glow: 'var(--primary-glow)'
        },
        {
            id: 'hospital',
            title: 'Hospital Fraud Detection',
            icon: <Activity size={40} />,
            description: 'Detect insurance claim anomalies, billing discrepancies, and pharmaceutical fraud patterns.',
            color: '#ff2d55',
            glow: 'rgba(255, 45, 85, 0.4)'
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="sector-selection-container"
            style={{ width: '100%', maxWidth: '900px', textAlign: 'center' }}
        >
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{ marginBottom: '3rem' }}
            >
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>SELECT SERVICE <span className="accent-text">SECTOR</span></h2>
                <p style={{ color: 'var(--text-secondary)' }}>Choose a specialized AI engine for targeted fraud analysis</p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                {sectors.map((sector, index) => (
                    <motion.div
                        key={sector.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ y: -10 }}
                        onClick={() => onSelect(sector.id)}
                        className="glass-card sector-card"
                        style={{
                            padding: '2.5rem',
                            cursor: 'pointer',
                            textAlign: 'left',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem',
                            position: 'relative',
                            border: `1px solid ${sector.color}33`,
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{
                            color: sector.color,
                            background: `${sector.color}11`,
                            width: '80px',
                            height: '80px',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: `0 0 20px ${sector.glow}`
                        }}>
                            {sector.icon}
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1.4rem', margin: '0 0 0.5rem 0', color: sector.color }}>{sector.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>{sector.description}</p>
                        </div>

                        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', color: sector.color, fontWeight: 'bold', fontSize: '0.9rem' }}>
                            LAUNCH ANALYTICS <ChevronRight size={18} />
                        </div>

                        <div style={{
                            position: 'absolute',
                            top: '-50px',
                            right: '-50px',
                            opacity: 0.05,
                            transform: 'rotate(15deg)'
                        }}>
                            <BrainCircuit size={200} />
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default SectorSelection;
