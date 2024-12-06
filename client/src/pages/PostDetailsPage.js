import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetailsPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/post/${id}`)
      .then((response) => {
        setPost(response.data.post); // Acessando a chave 'post' da resposta
        setLoading(false);
      })
      .catch(() => {
        setError('Erro ao carregar os detalhes do post');
        setLoading(false);
      });
  }, [id]);

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
    minHeight: '100vh',  // Garante que o conteúdo ocupe toda a altura da tela
    padding: '20px',
    backgroundColor: '#f9f9f9', // Um fundo leve para o layout
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
    maxWidth: '800px', // Limita a largura do conteúdo
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
