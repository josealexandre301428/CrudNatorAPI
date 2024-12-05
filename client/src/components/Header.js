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
  },
  loginButton: {
    padding: '8px 12px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Header;
