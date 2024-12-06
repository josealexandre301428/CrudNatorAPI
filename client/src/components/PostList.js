import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [hoveredCard, setHoveredCard] = useState(null);

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
        <div 
          key={post._id} 
          style={{
            ...styles.card,
            ...(hoveredCard === post._id ? styles.hover : {})
          }}
          onMouseEnter={() => setHoveredCard(post._id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
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
    justifyContent: 'center',
    gap: '20px',
    padding: '20px',
    alignItems: 'center',
    transition: 'all 0.3s ease',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '280px',
    padding: '20px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    textAlign: 'center',
    marginBottom: '20px',
    height: '250px', // Altura fixa para os cards
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  hover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
  },
  cardContent: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap', // Garante que o texto não quebre em várias linhas
    height: '60px', // Limita a altura do texto para caber na área
  },
  '@media (max-width: 768px)': {
    container: {
      flexDirection: 'column', // Cards em coluna quando a tela for menor
    },
    card: {
      width: '100%', // Ocupa toda a largura disponível
    },
  },
};

export default PostList;
