import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const ProfilePage = () => {
  const [user, setUser] = useState(null); // Armazenar as informações do usuário
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Se o token não estiver presente, redireciona para a página de login
      navigate('/login');
    } else {
      // Caso o token esteja presente, simular a obtenção dos dados do usuário
      const userData = {
        _id: "670d4bf3ea8d97cd63001d4a",
        username: "gustavonobg",
      };
      setUser(userData); // Atribuir dados do usuário
    }
  }, [navigate]);

  if (!user) {
    return <div>Carregando...</div>; // Exibe "Carregando..." até que os dados sejam carregados
  }

  return (
    <div style={styles.container}>
      <Header /> {/* Adiciona o Header aqui */}
      <div style={styles.profileCard}>
        <h1>Bem-vindo ao seu perfil!</h1>
        <p><strong>ID:</strong> {user._id}</p>
        <p><strong>Usuário:</strong> {user.username}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center', // Centraliza horizontalmente
    alignItems: 'center', // Centraliza verticalmente
    height: '100vh', // Ocupa toda a altura da tela
    backgroundColor: '#f4f4f4',
    marginTop: '60px', // Ajuste para não sobrepor a navbar fixa
  },
  profileCard: {
    textAlign: 'center', // Alinha o texto ao centro
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '300px',
  },
};

export default ProfilePage;
