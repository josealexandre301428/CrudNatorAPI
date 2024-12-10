import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostDetailsPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se o usuário está autenticado
    const token = localStorage.getItem('token');
    if (!token) {
      // Se não estiver autenticado, armazena o post de destino e redireciona para a página de login
      localStorage.setItem('redirectAfterLogin', `/post/${id}`);
      navigate('/login');
    } else {
      // Se estiver autenticado, carrega os detalhes do post
      axios
        .get(`/api/post/${id}`)
        .then((response) => {
          setPost(response.data.post);
          setLoading(false);
        })
        .catch(() => {
          setError('Erro ao carregar os detalhes do post');
          setLoading(false);
        });
    }
  }, [id, navigate]);
  

  if (loading) {
    return <div style={styles.loading}>Carregando...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{post.title}</h1>
      <p style={styles.content}>{post.content}</p>
      <small style={styles.area}>Área: {post.area}</small>
      {post.link && (
        <a href={post.link} target="_blank" rel="noopener noreferrer" style={styles.link}>
          Link do Projeto
        </a>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '32px',
    marginBottom: '10px',
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    fontSize: '18px',
    marginBottom: '15px',
    color: '#555',
    maxWidth: '800px',
    textAlign: 'center',
  },
  area: {
    fontSize: '16px',
    color: '#777',
    textAlign: 'center',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '18px',
    color: '#555',
  },
  error: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '18px',
    color: 'red',
  },
};

export default PostDetailsPage;
