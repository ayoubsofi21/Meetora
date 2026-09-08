import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialisation sécurisée de l'état utilisateur depuis le localStorage
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('meetora_user');
      return savedUser && savedUser !== 'undefined' ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // Initialisation sécurisée du token depuis le localStorage
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('meetora_token');
    return savedToken && savedToken !== 'undefined' ? savedToken : null;
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Hydratation / Vérification du token auprès de l'API au chargement initial
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const response = await apiClient.get('/auth/me');
          const userData = response.data.user || response.data.data || response.data;
          setUser(userData);
          localStorage.setItem('meetora_user', JSON.stringify(userData));
        } catch (error) {
          console.error("Session expirée ou invalide :", error);
          logout();
        }
      } else {
        // Nettoyage préventif si des valeurs "undefined" traînent
        localStorage.removeItem('meetora_token');
        localStorage.removeItem('meetora_user');
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  // Redirection automatique selon le rôle de l'utilisateur
  const redirectByRole = (role) => {
    const userRole = typeof role === 'string' ? role.toLowerCase() : '';
    switch (userRole) {
      case 'admin':
        navigate('/admin');
        break;
      case 'doctor':
        navigate('/doctor');
        break;
      case 'patient':
        navigate('/patient');
        break;
      default:
        navigate('/');
    }
  };

  const login = async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const data = response.data;

      // Extraction robuste du token et des données utilisateur selon le format renvoyé par Laravel
      const newToken = data.token || data.access_token || data.data?.token;
      const userData = data.user || data.data?.user || data;

      if (!newToken || newToken === 'undefined') {
        throw new Error("Jeton d'authentification manquant dans la réponse API.");
      }

      // Sauvegarde dans le localStorage
      localStorage.setItem('meetora_token', newToken);
      localStorage.setItem('meetora_user', JSON.stringify(userData));

      // Mise à jour de l'état React
      setToken(newToken);
      setUser(userData);

      // Redirection vers le dashboard correspondant
      redirectByRole(userData?.role);

      return { success: true };
    } catch (error) {
      console.error("Erreur de connexion :", error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Identifiants invalides. Veuillez réessayer.";
      return { success: false, message };
    }
  };

  // Action de déconnexion
  const logout = async () => {
    try {
      if (token) {
        await apiClient.post('/auth/logout');
      }
    } catch (err) {
      console.warn("Erreur déconnexion serveur :", err);
    } finally {
      // Nettoyage complet du stockage local et réinitialisation de l'état
      localStorage.removeItem('meetora_token');
      localStorage.removeItem('meetora_user');
      setToken(null);
      setUser(null);
      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token && !!user,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé au sein d'un AuthProvider");
  }
  return context;
};