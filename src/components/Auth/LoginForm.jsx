import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, ShieldCheck, Mail, LogIn, Cpu } from 'lucide-react';

const LoginForm = ({ onLogin }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isAdmin) {
      if (email === 'sreehasa2007@gmail.com' && password === 'sreehasa2007') {
        onLogin({ email, isAdmin: true });
      } else {
        alert('Invalid Admin Credentials');
      }
    } else {
      // General user login (no fixed credentials for users as per previous flow)
      onLogin({ email, isAdmin: false });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card login-container"
      style={{
        padding: '3rem',
        width: '100%',
        maxWidth: '450px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="login-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ marginBottom: '1rem', display: 'inline-block' }}
        >
          <Cpu size={48} className="accent-text" />
        </motion.div>
        <h1 style={{ margin: 0, fontSize: '1.8rem' }}>JAVA <span className="accent-text">AI</span></h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
          Fraud Detection System
        </p>
      </div>

      <div className="login-toggle" style={{
        display: 'flex',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '12px',
        padding: '4px',
        marginBottom: '2rem'
      }}>
        <button
          onClick={() => setIsAdmin(false)}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '8px',
            border: 'none',
            background: !isAdmin ? 'rgba(0, 242, 255, 0.15)' : 'transparent',
            color: !isAdmin ? 'var(--primary)' : 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontWeight: '600',
            fontSize: '0.85rem'
          }}
        >
          <User size={16} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          USER LOGIN
        </button>
        <button
          onClick={() => setIsAdmin(true)}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '8px',
            border: 'none',
            background: isAdmin ? 'rgba(112, 0, 255, 0.15)' : 'transparent',
            color: isAdmin ? 'var(--secondary)' : 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontWeight: '600',
            fontSize: '0.85rem'
          }}
        >
          <ShieldCheck size={16} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          ADMIN LOGIN
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>EMAIL ADDRESS</label>
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-secondary)' }} />
            <input
              type="email"
              className="cyber-input"
              placeholder="Enter your email"
              required
              style={{ paddingLeft: '40px' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>PASSWORD</label>
          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-secondary)' }} />
            <input
              type="password"
              className="cyber-input"
              placeholder="••••••••"
              required
              style={{ paddingLeft: '40px' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="cyber-button" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <LogIn size={20} />
          {isAdmin ? 'AUTHENTICATE ADMIN' : 'SECURE LOGIN'}
        </button>
      </form>

      <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        Authorized Personnel Only • Powered by JAVA AI
      </div>
    </motion.div>
  );
};

export default LoginForm;
