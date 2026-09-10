import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../api/axios';

import {
  Activity,
  Lock,
  Mail,
  User,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Eye,
  EyeOff,
  ShieldCheck,
} from 'lucide-react';

import hospitalImage from '../../assets/images/hospital-register.png';

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.password_confirmation) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }

    if (!acceptTerms) {
      setError('You must accept the Terms of Service and Privacy Policy.');
      return;
    }

    setIsSubmitting(true);

    try {
      await apiClient.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        role: 'patient',
      });

      setSuccess(true);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      const serverMessage =
        err.response?.data?.message ||
        'An error occurred during registration. Please try again.';

      setError(serverMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white grid grid-cols-1 lg:grid-cols-2">
      {/* =========================================================
          LEFT — HOSPITAL IMAGE & OVERLAY (DESKTOP)
      ========================================================== */}
      <div className="relative hidden lg:block h-full w-full overflow-hidden select-none bg-[#0F172A]">
        {/* Background Image */}
        <img
          src={hospitalImage}
          alt="Modern healthcare facility corridor"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1120]/85 via-[#111827]/40 to-transparent" />

        {/* Marketing / Brand Panel Content */}
        <div className="absolute left-12 xl:left-16 bottom-16 max-w-[480px] z-10 text-white pr-6">
          {/* Medical Icon Box */}
          <div className="w-12 h-12 rounded-lg bg-[#0F56D9] flex items-center justify-center mb-8 shadow-md">
            <Activity className="w-6 h-6 text-white" />
          </div>

          {/* Headline */}
          <h1 className="text-[44px] xl:text-[52px] font-bold leading-[1.12] tracking-tight text-white mb-6">
            Healthcare
            <br />
            Starts With
            <br />
            Better Access
          </h1>

          {/* Subtitle / Description */}
          <p className="text-white/90 text-base xl:text-lg leading-relaxed font-normal">
            Create your patient account and access appointments, medical records,
            prescriptions, and healthcare services from one secure platform.
          </p>
        </div>
      </div>

      {/* =========================================================
          RIGHT — REGISTER FORM CONTAINER
      ========================================================== */}
      <div className="flex flex-col justify-center items-center px-6 sm:px-12 lg:px-16 py-12 bg-white">
        {/* Mobile-Only Brand Header */}
        <div className="lg:hidden w-full max-w-[440px] mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-[#0F56D9] flex items-center justify-center text-white">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#111827]">MEETORA</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-[440px]">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-[38px] font-bold text-[#111827] tracking-tight">
              Create Your Account
            </h2>
            <p className="text-[#475569] text-sm sm:text-base mt-2">
              Create your Meetora patient account to get started.
            </p>
          </div>

          {/* Success Notification Alert */}
          {success && (
            <div className="mb-6 p-3.5 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] flex items-start gap-3 text-[#047857] text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              <span>Account created successfully. Redirecting to login...</span>
            </div>
          )}

          {/* Inline Error Alert */}
          {error && !success && (
            <div className="mb-6 p-3.5 rounded-lg bg-[#FEF2F2] border border-[#FECACA] flex items-start gap-3 text-[#DC2626] text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#111827] mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#9CA3AF]">
                  <User className="w-5 h-5" />
                </div>
                <input
                  id="name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Sarah Jenkins"
                  className="w-full h-[52px] pl-11 pr-4 bg-white border border-[#CBD5E1] rounded-lg text-base text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0F56D9] focus:ring-2 focus:ring-[#0F56D9]/20 transition-all"
                  required
                />
              </div>
            </div>

            {/* Email Address */}
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
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full h-[52px] pl-11 pr-4 bg-white border border-[#CBD5E1] rounded-lg text-base text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0F56D9] focus:ring-2 focus:ring-[#0F56D9]/20 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#111827] mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#9CA3AF]">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full h-[52px] pl-11 pr-12 bg-white border border-[#CBD5E1] rounded-lg text-base text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0F56D9] focus:ring-2 focus:ring-[#0F56D9]/20 transition-all"
                  required
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#9CA3AF] hover:text-[#475569] focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="mt-1.5 text-xs text-[#64748B]">
                Minimum 8 characters
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-[#111827] mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#9CA3AF]">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  id="password_confirmation"
                  type={showConfirmation ? 'text' : 'password'}
                  name="password_confirmation"
                  autoComplete="new-password"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full h-[52px] pl-11 pr-12 bg-white border border-[#CBD5E1] rounded-lg text-base text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0F56D9] focus:ring-2 focus:ring-[#0F56D9]/20 transition-all"
                  required
                />
                <button
                  type="button"
                  aria-label={showConfirmation ? 'Hide password' : 'Show password'}
                  onClick={() => setShowConfirmation((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#9CA3AF] hover:text-[#475569] focus:outline-none"
                >
                  {showConfirmation ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="pt-1">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-[#CBD5E1] text-[#0F56D9] focus:ring-[#0F56D9]"
                />
                <span className="text-sm text-[#475569] leading-tight">
                  I agree to the{' '}
                  <Link to="/terms" className="text-[#0F56D9] hover:underline font-medium">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-[#0F56D9] hover:underline font-medium">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || success}
              className="w-full h-[52px] bg-[#0F56D9] hover:bg-[#0B46B7] text-white font-medium rounded-lg text-base transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>

          {/* Social Auth Divider */}
          <div className="my-6 flex items-center">
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

          {/* Login Link */}
          <p className="mt-7 text-center text-sm text-[#475569]">
            Already have an account?{' '}
            <Link to="/login" className="text-[#0F56D9] font-medium hover:underline">
              Log In
            </Link>
          </p>

          {/* Security Trust Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#64748B]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Your information is protected and securely processed.</span>
          </div>
        </div>
      </div>
    </div>
  );
}