import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Landmark, ShieldAlert, Cpu, Database, ClipboardList, MapPin, Clock, CreditCard, User } from 'lucide-react';

const AnalysisForm = ({ sector, onCheckFraud }) => {
    const [formData, setFormData] = useState({});
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const isHospital = sector === 'hospital';

    const hospitalFields = [
        { id: 'patientId', label: 'PATIENT ID', icon: <User size={18} />, placeholder: 'P-100452', type: 'text' },
        { id: 'treatmentType', label: 'TREATMENT TYPE', icon: <ClipboardList size={18} />, placeholder: 'Emergency / Routine', type: 'text' },
        { id: 'billAmount', label: 'BILL AMOUNT ($)', icon: <CreditCard size={18} />, placeholder: '5000.00', type: 'number' },
        { id: 'insuranceClaim', label: 'INSURANCE CLAIM ($)', icon: <ShieldAlert size={18} />, placeholder: '4500.00', type: 'number' },
        { id: 'riskScore', label: 'RISK SCORE (0-100)', icon: <Activity size={18} />, placeholder: '25', type: 'number' },
    ];

    const bankingFields = [
        { id: 'accountId', label: 'ACCOUNT ID', icon: <Database size={18} />, placeholder: 'ACC-889021', type: 'text' },
        { id: 'transactionAmount', label: 'TRANSACTION AMOUNT ($)', icon: <CreditCard size={18} />, placeholder: '120.50', type: 'number' },
        { id: 'location', label: 'LOCATION', icon: <MapPin size={18} />, placeholder: 'San Francisco, CA', type: 'text' },
        { id: 'time', label: 'TIME', icon: <Clock size={18} />, placeholder: '14:25:00', type: 'text' },
        { id: 'creditScore', label: 'CREDIT SCORE', icon: <Activity size={18} />, placeholder: '750', type: 'number' },
    ];

    const fields = isHospital ? hospitalFields : bankingFields;

    const handleChange = (id, value) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsAnalyzing(true);
        // Simulate complex AI analysis
        setTimeout(() => {
            setIsAnalyzing(false);
            onCheckFraud(formData);
        }, 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card"
            style={{
                width: '100%',
                maxWidth: '600px',
                padding: '2.5rem',
                margin: '0 auto',
                border: `1px solid ${isHospital ? '#ff2d55' : 'var(--primary)'}44`
            }}
        >
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <div style={{
                    color: isHospital ? '#ff2d55' : 'var(--primary)',
                    marginBottom: '1rem',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    {isHospital ? <Activity size={48} /> : <Landmark size={48} />}
                </div>
                <h2 style={{ margin: 0, fontSize: '1.5rem', textTransform: 'uppercase' }}>
                    {sector} <span className="accent-text">Analysis</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    Real-time AI behavioral scan for {sector} fraud detection
                </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.2rem' }}>
                {fields.map(field => (
                    <div key={field.id}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
                            {field.label}
                        </label>
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '12px', top: '12px', color: isHospital ? '#ff2d55' : 'var(--primary)', opacity: 0.7 }}>
                                {field.icon}
                            </div>
                            <input
                                type={field.type}
                                className="cyber-input"
                                placeholder={field.placeholder}
                                required
                                style={{ paddingLeft: '40px' }}
                                value={formData[field.id] || ''}
                                onChange={(e) => handleChange(field.id, e.target.value)}
                            />
                        </div>
                    </div>
                ))}

                <div style={{ marginTop: '1.5rem' }}>
                    <button
                        type="submit"
                        className="cyber-button"
                        disabled={isAnalyzing}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            background: isHospital ? 'linear-gradient(135deg, #ff2d55, #7000ff)' : undefined,
                            boxShadow: isHospital ? '0 0 15px rgba(255, 45, 85, 0.4)' : undefined,
                            opacity: isAnalyzing ? 0.7 : 1
                        }}
                    >
                        {isAnalyzing ? (
                            <>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                    <Cpu size={20} />
                                </motion.div>
                                ANALYZING PATTERNS...
                            </>
                        ) : (
                            <>
                                <ShieldAlert size={20} />
                                CHECK FRAUD
                            </>
                        )}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default AnalysisForm;
