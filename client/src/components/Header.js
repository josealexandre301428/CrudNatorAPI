import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { FaUser } from 'react-icons/fa';

const Header = () => {
  const [showLogoutOptions, setShowLogoutOptions] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remover o token e redirecionar para a página de login
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleMenu = () => {
    setShowLogoutOptions(!showLogoutOptions);
  };

  const handleProfileClick = () => {
    if (!token) {
      navigate('/login');
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.profileContainer}>
        {/* Exibe o mesmo botão, mas muda o comportamento conforme o estado do token */}
        <button onClick={token ? toggleMenu : handleProfileClick} style={styles.loginButton}>
          <FaUser style={styles.icon} />
        </button>

        {/* Exibe o menu de logout se o token estiver presente e o menu estiver aberto */}
        {token && showLogoutOptions && (
          <div style={styles.logoutMenu}>
            <Link to="/profile" style={styles.logoutLink}>Perfil</Link>
            <button onClick={handleLogout} style={styles.logoutLink}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'flex-end', // Alinha o botão à direita
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: 'transparent', // Cabeçalho transparente
    boxShadow: 'none', // Remover sombra
  },
  profileContainer: {
    position: 'relative', // Necessário para posicionar o menu de logout
  },
  loginButton: {
    padding: '10px 20px',
    backgroundColor: 'transparent', // Fundo transparente no botão
    color: '#333', // Cor do ícone
    border: 'none',
    borderRadius: '50%', // Formato redondo
    cursor: 'pointer',
    fontSize: '24px', // Tamanho do ícone
    transition: 'background-color 0.3s ease',
  },
  icon: {
    fontSize: '24px', // Tamanho do ícone
  },
  logoutMenu: {
    position: 'absolute',
    top: '40px',
    right: '0',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '10px',
    zIndex: '1000', // Garante que o menu ficará acima dos outros elementos
  },
  logoutLink: {
    display: 'block',
    padding: '8px 12px',
    color: '#333',
    textDecoration: 'none',
    fontSize: '16px',
    borderRadius: '4px',
    marginBottom: '8px',
    transition: 'background-color 0.3s ease',
  },
};

export default Header;
