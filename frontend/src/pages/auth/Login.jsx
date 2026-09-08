import { useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { Shield, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);

    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F7FB] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        {/* En-tête de la marque */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#2563EB] text-white mb-3 shadow-md">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Meetora Health</h1>
          <p className="text-sm text-[#475569] mt-1">Plateforme de Gestion de Cabinet Médical</p>
        </div>

        {/* Formulaire dans une carte propre */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sm:p-8">
          <h2 className="text-xl font-bold text-[#0F172A] mb-1">Connexion</h2>
          <p className="text-sm text-[#475569] mb-6">Accédez à votre espace sécurisé</p>

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] flex items-start gap-2.5 text-[#DC2626] text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Champ Email */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                Adresse Email
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemple@meetora.health"
                  className="w-full h-11 pl-10 pr-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] transition-all"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] transition-all"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 mt-2 bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99] text-white font-semibold rounded-xl text-sm shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Connexion en cours...</span>
                </>
              ) : (
                <span>Se connecter</span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-[#475569]">
            Vous n'avez pas encore de compte ?{' '}
            <Link to="/register" className="text-[#2563EB] font-semibold hover:underline">
              S'inscrire comme Patient
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}