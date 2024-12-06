import React from 'react';
import Header from '../components/Header';
import PostList from '../components/PostList';

const HomePage = () => {
  return (
    <div style={styles.container}>
      <Header />
      <main style={styles.main}>
        <section style={styles.heroSection}>
          <h1 style={styles.heroTitle}>Welcome to CrudNator!</h1>
          <p style={styles.heroSubtitle}>
            "As melhores inovações vêm da colaboração, não da competição." – Satya Nadella (CEO da Microsoft)
          </p>
        </section>
        <PostList />
      </main>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f9f9f9',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'row', // Muda para linha, com o header ao lado
    minHeight: '100vh', // A altura mínima da página é 100vh
    marginLeft: '60px', // Adiciona a largura do header fixo
  },
  main: {
    flexGrow: 1, // O conteúdo do main cresce para preencher o espaço restante
    padding: '20px',
    paddingBottom: '40px', // Adiciona um espaçamento no final
    paddingLeft: '20px', // Adiciona um espaço à esquerda para o conteúdo
  },
  heroSection: {
    textAlign: 'center',
    padding: '20px 10px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  heroTitle: {
    fontSize: '60px',  // Aumenta o tamanho do título
    color: '#000',  // Define a cor como preta
    marginBottom: '10px',
  },
  heroSubtitle: {
    fontSize: '24px',  // Aumenta o tamanho do subtítulo
    color: '#555',
  },
};

export default HomePage;
