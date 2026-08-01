import api from '@/lib/axios';

/**
 * Auth API calls against the Laravel 12 / Sanctum backend.
 * Adjust endpoint paths here only if your backend routes differ.
 */
export const authService = {
  async getCsrfCookie() {
    // Required once for Sanctum SPA (stateful) auth, no-op if using token-based Sanctum.
    await api.get('/sanctum/csrf-cookie', { baseURL: api.defaults.baseURL.replace('/api/v1', '') });
  },

  async login({ email, password, remember }) {
    const { data } = await api.post('/auth/login', { email, password, remember });
    return data; // { user, token }
  },

  async register(payload) {
    const { data } = await api.post('/auth/register', {
      first_name: payload.firstName,
      last_name: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      date_of_birth: payload.dateOfBirth,
      password: payload.password,
      password_confirmation: payload.passwordConfirmation,
    });
    return data; // { user, token }
  },

  async logout() {
    const { data } = await api.post('/auth/logout');
    return data;
  },

  async fetchCurrentUser() {
    const { data } = await api.get('/auth/user');
    return data.user ?? data;
  },

  async forgotPassword({ email }) {
    const { data } = await api.post('/auth/forgot-password', { email });
    return data;
  },

  async resetPassword({ token, email, password, passwordConfirmation }) {
    const { data } = await api.post('/auth/reset-password', {
      token,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
    return data;
  },

  async resendVerificationEmail() {
    const { data } = await api.post('/auth/email/resend');
    return data;
  },

  async verifyEmail({ id, hash, expires, signature }) {
    const { data } = await api.get(`/auth/email/verify/${id}/${hash}`, {
      params: { expires, signature },
    });
    return data;
  },
};

export default authService;