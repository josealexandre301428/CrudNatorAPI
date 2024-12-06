import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (isLogin) {
      // Corrigir o endpoint para '/api/users/login'
      axios
      .post('/api/users/login', { email, password })
      .then((response) => {
        // Armazenando o token JWT no localStorage
        localStorage.setItem('token', response.data.token);
        navigate('/profile');  // Redireciona para a página de perfil após login
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Erro ao fazer login');
        setLoading(false);
      });
    } else {
      // Corrigir o endpoint para '/api/users/signup'
      axios
        .post('/api/users/signup', { email, password, username })
        .then(() => navigate('/home'))
        .catch((err) => {
          setError(err.response?.data?.message || 'Erro ao criar conta');
          setLoading(false);
        });
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}
        </h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Digite seu nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
          )}
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Criar Conta'}
          </button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
        {isLogin && (
          <button
            style={styles.signupButton}
            onClick={handleSignUpRedirect}
          >
            Criar conta
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    padding: '40px 30px',
    textAlign: 'center',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    outline: 'none',
  },
  button: {
    padding: '12px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#F0C808',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: 'red',
    fontSize: '0.9rem',
    marginTop: '10px',
  },
  signupButton: {
    marginTop: '15px',
    padding: '10px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
    width: '100%',
  },
};

export default LoginPage;
