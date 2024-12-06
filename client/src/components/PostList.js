import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/api/post')
      .then((response) => {
        setPosts(response.data.posts);
        setLoading(false);
      })
      .catch(() => {
        setError('Erro ao carregar os posts');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={styles.loading}>Carregando...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      {posts.map((post) => (
        <div
          key={post._id}
          style={{
            ...styles.card,
            ...(hoveredCard === post._id ? styles.hover : {}),
          }}
          onMouseEnter={() => setHoveredCard(post._id)}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => navigate(`/post/${post._id}`)}
        >
          <h2 style={styles.title}>{post.title}</h2>
          <p style={styles.content}>{post.content}</p>
          <small style={styles.area}>{post.area}</small>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '20px',
    padding: '20px',
    flexGrow: 1,
    minHeight: 'calc(100vh - 100px)',
    overflowY: 'auto',
  },
  card: {
    backgroundColor: 'var(--cor-1)', // cor de fundo do card
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '280px',
    padding: '20px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    textAlign: 'center',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    height: '250px',
  },
  hover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    margin: '0 0 10px',
    flexShrink: 0,
  },
  content: {
    flexGrow: 1,
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,  // Limite de 3 linhas
    WebkitBoxOrient: 'vertical',
    marginBottom: '10px',
    fontSize: '0.9rem',
  },
  area: {
    textAlign: 'center',
    fontSize: '0.8rem',
    marginTop: 'auto', // Faz o "area" se mover para o fundo do card
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

export default PostList;
