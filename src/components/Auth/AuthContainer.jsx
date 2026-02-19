import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShieldAlert, ShieldCheck, CheckCircle, AlertTriangle, Siren } from 'lucide-react';
import LoginForm from './LoginForm';
import SectorSelection from './SectorSelection';
import AnalysisForm from '../Analysis/AnalysisForm';

const AuthContainer = () => {
    const [user, setUser] = useState(null);
    const [selectedSector, setSelectedSector] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleSectorSelect = (sectorId) => {
        setSelectedSector(sectorId);
    };

    const handleCheckFraud = async (data) => {
        try {
            const endpoint = selectedSector === 'hospital' ? '/api/fraud/hospital' : '/api/fraud/banking';
            const response = await fetch(`http://localhost:8080${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Backend analysis failed');
            }

            const result = await response.json();

            // Map backend result to front-end visual states
            let color = '#22c55e';
            let Icon = CheckCircle;

            if (result.result === 'FRAUD') {
                color = '#ff2d55';
                Icon = Siren;
            } else if (result.result === 'MEDIUM RISK') {
                color = '#ff9500';
                Icon = AlertTriangle;
            }

            setAnalysisResult({
                status: result.result === 'FRAUD' ? 'FRAUDULENT!' : result.result,
                message: result.reason,
                color,
                Icon,
                riskScore: result.riskScore,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.error('Fraud analysis error:', error);
            alert('Error connecting to AI Backend. Please ensure the Spring Boot server is running on port 8080.');
        }
    };

    const handleBack = () => {
        if (analysisResult) {
            setAnalysisResult(null);
        } else if (selectedSector) {
            setSelectedSector(null);
        } else if (user) {
            setUser(null);
        }
    };

    return (
        <div className="app-container">
            {/* Background decoration */}
            <div className="bg-nodes">
                <svg width="100%" height="100%">
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 242, 255, 0.05)" strokeWidth="1" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Navigation Header */}
            <AnimatePresence>
                {(user || selectedSector) && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        style={{
                            position: 'fixed',
                            top: '2rem',
                            left: '2rem',
                            zIndex: 1000
                        }}
                    >
                        <button
                            onClick={handleBack}
                            className="glass-card"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 15px',
                                color: 'var(--primary)',
                                border: '1px solid var(--primary)',
                                cursor: 'pointer',
                                borderRadius: '12px',
                                background: 'rgba(0, 242, 255, 0.05)',
                                fontWeight: '600',
                                fontSize: '0.9rem',
                                fontFamily: 'Orbitron, sans-serif'
                            }}
                        >
                            <ArrowLeft size={18} />
                            {analysisResult ? 'NEW ANALYSIS' : selectedSector ? 'CHANGE SECTOR' : 'SIGN OUT'}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {!user ? (
                    <motion.div
                        key="login"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                    >
                        <LoginForm onLogin={handleLogin} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="sector-content"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                    >
                        {/* Show selection for both, but Analysis only for regular user */}
                        {!selectedSector ? (
                            <SectorSelection onSelect={handleSectorSelect} />
                        ) : !user.isAdmin && !analysisResult ? (
                            <AnalysisForm sector={selectedSector} onCheckFraud={handleCheckFraud} />
                        ) : !user.isAdmin && analysisResult ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-card"
                                style={{
                                    padding: '3rem',
                                    textAlign: 'center',
                                    border: `2px solid ${analysisResult.color}`,
                                    maxWidth: '600px',
                                    width: '100%'
                                }}
                            >
                                <div style={{ color: analysisResult.color, marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                                    <analysisResult.Icon size={80} />
                                </div>
                                <h2 style={{ color: analysisResult.color, fontSize: '2rem', marginBottom: '1rem' }}>
                                    {analysisResult.status}
                                </h2>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                                    {analysisResult.message}
                                </p>
                                <div style={{ marginTop: '2.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                    SECTOR: {selectedSector.toUpperCase()} • TIMESTAMP: {analysisResult.timestamp}
                                </div>
                                <button
                                    onClick={() => setAnalysisResult(null)}
                                    className="cyber-button"
                                    style={{ marginTop: '2.5rem', width: '100%' }}
                                >
                                    RUN NEW ANALYSIS
                                </button>
                            </motion.div>
                        ) : (
                            /* Admin view after selecting sector (as requested: visible that is enough) */
                            <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '500px' }}>
                                <ShieldCheck size={64} className="accent-text" style={{ marginBottom: '1.5rem', opacity: 0.7 }} />
                                <h2 style={{ color: 'var(--secondary)', marginBottom: '1rem' }}>ADMIN MONITOR</h2>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                    You are viewing the **{selectedSector.toUpperCase()}** sector.
                                    Analytical tools are restricted for Admin accounts.
                                </p>
                            </div>
                        )}
                    </motion.div>
                )}    </AnimatePresence>

            {/* Floating status indicator */}
            {user && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        position: 'fixed',
                        bottom: '2rem',
                        left: '2rem',
                        padding: '12px 20px',
                        background: 'rgba(0,0,0,0.8)',
                        border: '1px solid var(--primary)',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        color: 'var(--primary)',
                        zIndex: 100,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}
                >
                    <div style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%', boxShadow: '0 0 8px var(--primary)' }}></div>
                    SESSION ACTIVE: {user.isAdmin ? 'ADMIN_ROOT' : 'USER_SECURE'}
                    {selectedSector && <span style={{ opacity: 0.6 }}> • SECTOR: {selectedSector.toUpperCase()}</span>}
                </motion.div>
            )}
        </div>
    );
};

export default AuthContainer;
