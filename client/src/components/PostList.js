import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar os posts assim que o componente for montado
  useEffect(() => {
    axios
      .get('/api/post')
      .then((response) => {
        console.log(response.data.posts); // Verifique o formato dos dados
        setPosts(response.data.posts);
        setLoading(false);
      })
      .catch((err) => {
        setError('Erro ao carregar os posts');
        setLoading(false);
      });
  }, []);
  
  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={styles.container}>
      {posts.map((post) => (
        <div key={post._id} style={styles.card}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <small>{post.area}</small>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',  // Centraliza os cards horizontalmente
    alignItems: 'center',      // Centraliza os cards verticalmente
    gap: '16px',
    padding: '20px',
    minHeight: '100vh',        // Garante que a tela ocupe a altura completa da janela
  },
  card: {
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '8px',
    width: '200px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center',      // Centraliza o texto dentro de cada card
  },
};

export default PostList;
