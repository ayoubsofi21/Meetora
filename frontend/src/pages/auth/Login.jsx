import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  ShieldCheck,
} from 'lucide-react';

import hospitalImage from '../../assets/images/hospital-login.jpg';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      setIsSubmitting(true);

      const result = await login(email, password);

      if (result && !result.success) {
        setError(result.message || 'Invalid email or password.');
      } else if (result && result.redirect) {
        navigate(result.redirect);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Invalid email or password. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT — VISUAL */}
      <div className="relative hidden lg:block min-h-screen overflow-hidden select-none">
        <img
          src={hospitalImage}
          alt="Modern healthcare facility"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0
            bg-gradient-to-t
            from-[#0F172A]/90
            via-[#0F172A]/45
            to-[#0F172A]/10"
        />

        {/* Brand */}
        <Link
          to="/"
          className="absolute top-10 left-12 xl:left-16 z-10
            inline-flex items-center gap-2"
        >
          <div
            className="w-10 h-10 rounded-xl
              bg-white/15 backdrop-blur-md
              border border-white/20
              flex items-center justify-center"
          >
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>

          <span className="text-xl font-extrabold text-white tracking-tight">
            Meetora
          </span>
        </Link>

        {/* Marketing Content */}
        <div
          className="absolute left-12 xl:left-16 bottom-16
            max-w-[500px] z-10 text-white pr-6"
        >
          <h1
            className="text-[44px] xl:text-[52px]
              font-extrabold leading-[1.08]
              tracking-tight text-white"
          >
            Empowering
            <br />
            Healthcare
            <br />
            Providers
          </h1>

          <p
            className="text-white/80
              text-base xl:text-lg
              leading-relaxed mt-5 max-w-md"
          >
            Secure, scalable, and intelligent solutions for modern medical
            enterprises. Streamline patient care and operational efficiency.
          </p>

          <div className="mt-7 flex items-center gap-2 text-xs text-white/70">
            <ShieldCheck className="w-4 h-4 text-[#C7D2FE]" />
            <span>Secure healthcare management platform</span>
          </div>
        </div>
      </div>

      {/* RIGHT — LOGIN */}
      <div
        className="flex flex-col justify-center items-center
          px-6 sm:px-12 lg:px-16 py-12
          bg-white"
      >
        <div className="w-full max-w-[440px]">

          {/* Mobile Brand */}
          <Link
            to="/"
            className="lg:hidden inline-flex items-center gap-2 mb-10"
          >
            <div
              className="w-10 h-10 rounded-xl
                bg-[#EEF2FF]
                text-[#3F38CA]
                flex items-center justify-center"
            >
              <ShieldCheck className="w-5 h-5" />
            </div>

            <span className="text-xl font-extrabold tracking-tight text-[#0F172A]">
              Meetora
            </span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h2
              className="text-3xl sm:text-4xl
                font-extrabold text-[#0F172A]
                tracking-tight text-center"
            >
                Welcome back
            </h2>

            <p className="text-[#475569] text-sm sm:text-base mt-2 text-center">
              Access your healthcare management dashboard.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              className="mb-6 p-3.5 rounded-xl
                bg-[#FEE2E2]
                border border-[#FCA5A5]
                flex items-start gap-3
                text-[#DC2626] text-sm"
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />

              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase
                  text-[#475569] mb-1.5"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2
                    w-5 h-5 text-[#94A3B8]"
                />

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@meetora.health"
                  className="w-full h-12
                    pl-12 pr-4
                    bg-[#F8FAFC]
                    border border-[#E2E8F0]
                    rounded-xl
                    text-sm text-[#0F172A]
                    placeholder:text-[#94A3B8]
                    focus:outline-none
                    focus:border-[#3F38CA]
                    focus:ring-2
                    focus:ring-[#3F38CA]/10
                    transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase text-[#475569]"
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold
                    text-[#3F38CA]
                    hover:text-[#312E81]
                    transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2
                    w-5 h-5 text-[#94A3B8]"
                />

                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12
                    pl-12 pr-12
                    bg-[#F8FAFC]
                    border border-[#E2E8F0]
                    rounded-xl
                    text-sm text-[#0F172A]
                    placeholder:text-[#94A3B8]
                    focus:outline-none
                    focus:border-[#3F38CA]
                    focus:ring-2
                    focus:ring-[#3F38CA]/10
                    transition-all"
                  required
                />

                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2
                    text-[#94A3B8]
                    hover:text-[#3F38CA]
                    transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12
                bg-[#3F38CA]
                hover:bg-[#312E81]
                text-white
                font-semibold text-sm
                rounded-xl
                shadow-sm
                transition-all
                flex items-center justify-center gap-2
                disabled:opacity-50
                disabled:cursor-not-allowed
                active:scale-[0.99]
                focus:outline-none
                focus:ring-2
                focus:ring-[#3F38CA]/30
                focus:ring-offset-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Log In</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-7 flex items-center">
            <div className="flex-1 h-px bg-[#E2E8F0]" />

            <span className="px-4 text-xs text-[#94A3B8]">
              Or continue with
            </span>

            <div className="flex-1 h-px bg-[#E2E8F0]" />
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3">

            {/* Google */}
            <button
              type="button"
              className="h-11
                border border-[#E2E8F0]
                rounded-xl
                bg-white
                hover:bg-[#F8FAFC]
                hover:border-[#CBD5E1]
                transition-all
                flex items-center justify-center gap-2.5
                text-sm font-semibold text-[#0F172A]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>

              Google
            </button>

            {/* Apple */}
            <button
              type="button"
              className="h-11
                border border-[#E2E8F0]
                rounded-xl
                bg-white
                hover:bg-[#F8FAFC]
                hover:border-[#CBD5E1]
                transition-all
                flex items-center justify-center gap-2.5
                text-sm font-semibold text-[#0F172A]"
            >
              <svg
                className="w-4 h-4 fill-current text-[#0F172A]"
                viewBox="0 0 24 24"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.8 1.11-1.92.99-3.04-.96.04-2.12.64-2.8 1.44-.61.71-1.14 1.86-.99 2.96 1.08.08 2.18-.55 2.8-1.36z" />
              </svg>

              Apple
            </button>
          </div>

          {/* Register */}
          <p className="mt-8 text-center text-sm text-[#64748B]">
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              className="text-[#3F38CA] font-semibold
                hover:text-[#312E81] transition-colors"
            >
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}