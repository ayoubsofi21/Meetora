import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
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
        err.response?.data?.message || 'Invalid email or password. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white grid grid-cols-1 lg:grid-cols-2">
      {/* ========================================== */}
      {/* LEFT SECTION: HOSPITAL IMAGE & OVERLAY     */}
      {/* ========================================== */}
      <div className="relative hidden lg:block h-full w-full overflow-hidden select-none">
        {/* Background Image */}
        <img
          src={hospitalImage}
          alt="Modern healthcare facility corridor"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Gradient Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1120]/85 via-[#111827]/40 to-transparent" />

        {/* Marketing / Brand Panel Content */}
        <div className="absolute left-12 xl:left-16 bottom-16 max-w-[480px] z-10 text-white pr-6">
          {/* Medical Icon Box */}
          <div className="w-12 h-12 rounded-lg bg-[#0F56D9] flex items-center justify-center mb-8 shadow-md">
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>

          {/* Headline */}
          <h1 className="text-[44px] xl:text-[52px] font-bold leading-[1.12] tracking-tight text-white mb-6">
            Empowering
            <br />
            Healthcare
            <br />
            Providers
          </h1>

          {/* Subtitle / Description */}
          <p className="text-white/90 text-base xl:text-lg leading-relaxed font-normal">
            Secure, scalable, and intelligent solutions for modern medical enterprises.
            Streamline patient care and operational efficiency.
          </p>
        </div>
      </div>

      {/* ========================================== */}
      {/* RIGHT SECTION: LOGIN FORM CONTAINER       */}
      {/* ========================================== */}
      <div className="flex flex-col justify-center items-center px-6 sm:px-12 lg:px-16 py-12 bg-white">
        {/* Compact Brand Header (Mobile View Only) */}
        <div className="lg:hidden w-full max-w-[440px] mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-[#0F56D9] flex items-center justify-center text-white">
              <svg
                className="w-4 h-4 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#111827]">MEETORA</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-[440px]">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-[38px] font-bold text-[#111827] tracking-tight">
              Welcome Back
            </h2>
            <p className="text-[#475569] text-sm sm:text-base mt-2">
              Log in to your Meetora dashboard to continue.
            </p>
          </div>

          {/* Inline Error Alert */}
          {error && (
            <div className="mb-6 p-3.5 rounded-lg bg-[#FEF2F2] border border-[#FECACA] flex items-start gap-3 text-[#DC2626] text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#111827] mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#9CA3AF]">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@hospital.com"
                  className="w-full h-[52px] pl-11 pr-4 bg-white border border-[#CBD5E1] rounded-lg text-base text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0F56D9] focus:ring-2 focus:ring-[#0F56D9]/20 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-[#111827]">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-[#0F56D9] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#9CA3AF]">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-[52px] pl-11 pr-12 bg-white border border-[#CBD5E1] rounded-lg text-base text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0F56D9] focus:ring-2 focus:ring-[#0F56D9]/20 transition-all"
                  required
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#9CA3AF] hover:text-[#475569] focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-[52px] bg-[#0F56D9] hover:bg-[#0B46B7] text-white font-medium rounded-lg text-base transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
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

          {/* Social Login Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 h-[1px] bg-[#CBD5E1]" />
            <span className="px-4 text-sm text-[#475569] font-normal">Or continue with</span>
            <div className="flex-1 h-[1px] bg-[#CBD5E1]" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="h-[48px] border border-[#CBD5E1] rounded-lg bg-white hover:bg-[#F8FAFC] transition-colors flex items-center justify-center gap-2.5 text-sm font-medium text-[#111827] cursor-pointer"
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
              <span>Google</span>
            </button>

            <button
              type="button"
              className="h-[48px] border border-[#CBD5E1] rounded-lg bg-white hover:bg-[#F8FAFC] transition-colors flex items-center justify-center gap-2.5 text-sm font-medium text-[#111827] cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current text-black" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.8 1.11-1.92.99-3.04-.96.04-2.12.64-2.8 1.44-.61.71-1.14 1.86-.99 2.96 1.08.08 2.18-.55 2.8-1.36z" />
              </svg>
              <span>Apple</span>
            </button>
          </div>

          {/* Footer Link */}
          <p className="mt-8 text-center text-sm text-[#475569]">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#0F56D9] font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}