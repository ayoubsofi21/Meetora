import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import authService from '@/services/authService';
import { useAuthStore } from '@/store/useAuthStore';

/**
 * Normalizes a raw API user payload (snake_case) into the shape used across the app.
 */
function normalizeUser(rawUser) {
  return {
    id: rawUser.id,
    firstName: rawUser.first_name ?? rawUser.firstName,
    lastName: rawUser.last_name ?? rawUser.lastName,
    email: rawUser.email,
    role: rawUser.role,
    specialty: rawUser.specialty,
    avatarUrl: rawUser.avatar_url ?? rawUser.avatarUrl,
    emailVerifiedAt: rawUser.email_verified_at ?? rawUser.emailVerifiedAt,
  };
}

/** Wraps authService calls with React Query mutations + global store sync + toasts. */
export function useLogin() {
  const login = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      login(normalizeUser(data.user), data.token);
      toast.success(`Welcome back, ${data.user.first_name ?? data.user.firstName}!`);
    },
  });
}

export function useRegister() {
  const login = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      login(normalizeUser(data.user), data.token);
      toast.success('Account created! Welcome to Meetora.');
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: () => {
      toast.success('If that email exists, a reset link is on its way.');
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: () => {
      toast.success('Password updated. You can now log in.');
    },
  });
}

export function useResendVerificationEmail() {
  return useMutation({
    mutationFn: authService.resendVerificationEmail,
    onSuccess: () => {
      toast.success('Verification email sent.');
    },
  });
}