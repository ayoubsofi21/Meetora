import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axios';
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
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
        localStorage.removeItem('meetora_token');
        localStorage.removeItem('meetora_user');
      }
      setLoading(false);
    };
    initAuth();
  }, [token]);

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
      const newToken = data.token || data.access_token || data.data?.token;
      const userData = data.user || data.data?.user || data;

      if (!newToken || newToken === 'undefined') {
        throw new Error("Jeton d'authentification manquant dans la réponse API.");
      }
      localStorage.setItem('meetora_token', newToken);
      localStorage.setItem('meetora_user', JSON.stringify(userData));
      setToken(newToken);
      setUser(userData);
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
  const logout = async () => {
    try {
      if (token) {
        await apiClient.post('/auth/logout');
      }
    } catch (err) {
      console.warn("Erreur déconnexion serveur :", err);
    } finally {
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