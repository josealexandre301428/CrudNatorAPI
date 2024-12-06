import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <h1>CrudNator</h1>
      <button style={styles.loginButton}>Login</button>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f4f4f4',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Sombra leve
  },
  loginButton: {
    padding: '10px 20px',
    backgroundColor: '#F0C808', // Amarelo suave
    color: '#333', // Cor do texto para contraste
    border: 'none',
    borderRadius: '25px', // Bordas mais arredondadas
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Sombra para destacar o botão
    transition: 'background-color 0.3s ease', // Animação suave ao passar o mouse
  },
  loginButtonHover: {
    backgroundColor: '#E5B707', // Cor ligeiramente mais escura ao passar o mouse
  },
};

export default Header;
