import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const ProfilePage = () => {
  const [user, setUser] = useState(null); // Armazenar as informações do usuário
  const [posts, setPosts] = useState([]); // Armazenar os posts do usuário
  const [loading, setLoading] = useState(true); // Controlar o estado de carregamento
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Se o token não estiver presente, redireciona para a página de login
      navigate('/login');
    } else {
      // Simula a obtenção dos dados do usuário
      const userData = {
        _id: "670d4bf3ea8d97cd63001d4a",
        username: "gustavonobg",
      };
      setUser(userData); // Atribuir dados do usuário

      // Busca os posts do usuário
      fetchPosts(userData._id);
    }
  }, [navigate]);

  // Função para buscar os posts
  const fetchPosts = async (userId) => {
    try {
      const response = await fetch(`api/post/postsByUser/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts); // Armazena os posts
      } else {
        console.error('Erro ao buscar posts');
      }
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    } finally {
      setLoading(false); // Marca o carregamento como concluído
    }
  };

  if (loading) {
    return <div>Carregando...</div>; // Exibe "Carregando..." até que os dados sejam carregados
  }

  return (
    <div style={styles.container}>
      <Header /> {/* Adiciona o Header aqui */}
      <div style={styles.profileCard}>
        <h1>Bem-vindo ao seu perfil!</h1>
        <p><strong>ID:</strong> {user._id}</p>
        <p><strong>Usuário:</strong> {user.username}</p>
        
        <h2>Seus Posts</h2>
        <div>
          {posts.length === 0 ? (
            <p>Você não tem posts ainda.</p>
          ) : (
            posts.map(post => (
              <div key={post._id} style={styles.post}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
              </div>
            ))
          )}
        </div>
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
  post: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '5px',
    boxShadow: '0 2px 3px rgba(0, 0, 0, 0.1)',
  }
};

export default ProfilePage;
