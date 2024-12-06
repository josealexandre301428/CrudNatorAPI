import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Se o token não estiver presente, redireciona para a página de login
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Bem-vindo ao seu perfil!</h1>
      {/* Exiba as informações do perfil do usuário aqui */}
    </div>
  );
};

export default ProfilePage;
