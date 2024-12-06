import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null); // Estado para o card hovered
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      const userData = {
        _id: "670d4bf3ea8d97cd63001d4a",
        username: "gustavonobg",
      };
      setUser(userData);
      fetchPosts(userData._id);
    }
  }, [navigate]);

  const fetchPosts = async (userId) => {
    try {
      const response = await fetch(`api/post/postsByUser/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts);
      } else {
        console.error('Erro ao buscar posts');
      }
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.profileCard}>
        <h1>Bem-vindo ao seu perfil!</h1>
        <p><strong>ID:</strong> {user._id}</p>
        <p><strong>Usuário:</strong> {user.username}</p>

        <h2>Seus Posts</h2>
        <div>
          {posts.length === 0 ? (
            <p>Você não tem posts ainda.</p>
          ) : (
            posts.map((post) => (
              <div
                key={post._id}
                style={{
                  ...styles.post,
                  ...(hoveredCard === post._id ? styles.hover : {}),
                }}
                onMouseEnter={() => setHoveredCard(post._id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => navigate(`/post/${post._id}`)}
              >
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
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
    marginTop: '60px',
  },
  profileCard: {
    textAlign: 'center',
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
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  hover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '18px',
    color: '#555',
  },
};

export default ProfilePage;
