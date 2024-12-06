import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Corrigindo a URL da requisição
    axios
    .post('/api/users/signUp', { username, email, password })
    .then((response) => {
      alert('Conta criada com sucesso!');
      navigate('/login'); // Redireciona para a página de login
    })
    .catch((err) => {
      setError(err.response?.data?.message || 'Erro ao criar conta');
      setLoading(false);
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Crie sua conta</h2>
        <form onSubmit={handleSignUp} style={styles.form}>
          <input
            type="text"
            placeholder="Digite seu nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
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
            {loading ? 'Carregando...' : 'Criar Conta'}
          </button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
        <button
          style={styles.loginButton}
          onClick={() => navigate('/login')}
        >
          Já tem uma conta? Faça login
        </button>
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
  loginButton: {
    marginTop: '15px',
    padding: '10px',
    borderRadius: '6px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    width: '100%',
  },
};

export default SignUpPage;
