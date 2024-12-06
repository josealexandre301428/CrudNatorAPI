import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { FaUser } from 'react-icons/fa';

const Navbar = () => {
  const [showLogoutOptions, setShowLogoutOptions] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
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
      <div style={styles.sidebar}>
        {/* Ícone de usuário para login/logout */}
        <div style={styles.profileContainer}>
          <button onClick={token ? toggleMenu : handleProfileClick} style={styles.loginButton}>
            <FaUser style={styles.icon} />
          </button>

          {token && showLogoutOptions && (
            <div style={styles.logoutMenu}>
              <Link to="/profile" style={styles.logoutLink}>Perfil</Link>
              <button onClick={handleLogout} style={styles.logoutLink}>Logout</button>
            </div>
          )}
        </div>

        {/* Botão de login centralizado na parte inferior */}
        <div style={styles.loginButtonBottom}>
          {!token && (
            <button onClick={() => navigate('/login')} style={styles.loginButton}>
              <FaUser style={styles.icon} />
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    position: 'fixed',
    top: '0',
    left: '0',
    bottom: '0',
    width: '50px',  // Largura ajustada para uma navbar mais estreita
    flexDirection: 'column',
    backgroundColor: '#fff',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    padding: '15px 8px',  // Menos padding para diminuir a altura
    justifyContent: 'space-between',  // Garante que os itens fiquem distribuídos entre o topo e o fundo
    alignItems: 'center',  // Centraliza os itens horizontalmente
    zIndex: '1000',  // Garante que a navbar fique acima de outros elementos
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
  },
  profileContainer: {
    marginBottom: 'auto', // Move o ícone de usuário para o topo
    position: 'relative', // Para o menu de logout se posicionar corretamente
  },
  loginButton: {
    padding: '8px',  // Menos padding para compactar os botões
    backgroundColor: 'transparent',
    color: '#333',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '20px',  // Ícone um pouco menor
    transition: 'background-color 0.3s ease',
  },
  icon: {
    fontSize: '18px',  // Ajuste do tamanho do ícone para um tamanho mais adequado
    marginRight: '5px', // Menos espaço entre o ícone e o texto
  },
  logoutMenu: {
    position: 'absolute',
    top: '0', // Ajusta a posição para que a aba fique alinhada ao topo do botão
    left: '100%', // Faz a aba aparecer à direita do botão
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '8px',
    zIndex: 1000,
    width: '140px', // Menor largura para o menu de logout
    marginLeft: '8px', // Menos espaço entre o botão e o menu
  },
  logoutLink: {
    display: 'block',
    padding: '6px 10px',  // Menos padding nos links
    color: '#333',
    textDecoration: 'none',
    fontSize: '14px',  // Fonte menor para o menu de logout
    borderRadius: '4px',
    marginBottom: '6px',  // Menos espaço entre os itens
    transition: 'background-color 0.3s ease',
  },
  loginButtonBottom: {
    marginTop: 'auto', // Garante que o botão de login fique na parte inferior
    display: 'flex',
    justifyContent: 'center',
  },

  // Responsividade para telas pequenas
  '@media (max-width: 768px)': {
    header: {
      width: '40px', // Largura reduzida para telas menores
    },
    icon: {
      fontSize: '16px',  // Menor tamanho de ícone em telas pequenas
    },
    logoutMenu: {
      width: '120px', // Ajuste do menu de logout para telas menores
    },
  },
};

export default Navbar;
