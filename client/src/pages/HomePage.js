import React from 'react';
import Header from '../components/Header';
import PostList from '../components/PostList';

const HomePage = () => {
  return (
    <div style={styles.container}>
      <Header />
      <main style={styles.main}>
        <section style={styles.heroSection}>
          <h2 style={styles.heroTitle}>Bem vindo ao CrudNator</h2>
          <p style={styles.heroSubtitle}>
          "As melhores inovações vêm da colaboração, não da competição." – Satya Nadella (CEO da Microsoft)
          </p>
        </section>
        <PostList />
      </main>
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <p>&copy; {new Date().getFullYear()} CrudNator. All rights reserved.</p>
          <nav style={styles.footerNav}>
            <a href="#about" style={styles.footerLink}>About</a>
            <a href="#privacy" style={styles.footerLink}>Privacy Policy</a>
            <a href="#contact" style={styles.footerLink}>Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f9f9f9',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  main: {
    flexGrow: 1,
    padding: '20px',
  },
  heroSection: {
    textAlign: 'center',
    padding: '20px 10px', // Ajuste o padding para controlar o espaçamento interno
    borderRadius: '8px',
    marginBottom: '20px', // Adicione um espaço definido abaixo do Hero
  },
  heroTitle: {
    fontSize: '28px',
    color: '#F0C808', // Cor amarela para combinar com o tema
    marginBottom: '10px',
  },
  heroSubtitle: {
    fontSize: '16px',
    color: '#555',
  },
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px 10px',
    textAlign: 'center',
  },
  footerContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  footerNav: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  footerLink: {
    color: '#F0C808', // Destaque em amarelo suave
    textDecoration: 'none',
    fontSize: '14px',
  },
};

export default HomePage;
