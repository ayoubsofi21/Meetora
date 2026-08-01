import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, LogIn } from 'lucide-react';
import { Button, Input, PasswordInput, Checkbox } from '@/components/ui';
import { loginSchema } from '@/lib/validations/authSchemas';
import { useLogin } from '@/hooks/useAuth';
import { mapServerErrors } from '@/utils/mapServerErrors';
import { DASHBOARD_ROUTE_BY_ROLE, ROUTES } from '@/config/constants';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutateAsync, isPending } = useLogin();
  const [formError, setFormError] = useState(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', remember: false },
  });

  const onSubmit = async (values) => {
    setFormError(null);
    try {
      const data = await mutateAsync(values);
      const role = data.user.role;
      const redirectTo = location.state?.from?.pathname || DASHBOARD_ROUTE_BY_ROLE[role] || ROUTES.HOME;
      navigate(redirectTo, { replace: true });
    } catch (error) {
      const generalMessage = mapServerErrors(error, setError);
      if (generalMessage) setFormError(generalMessage);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-ink-900">Welcome back</h1>
        <p className="mt-1.5 text-sm text-ink-400">Log in to manage your appointments and health records.</p>
      </div>

      {formError && (
        <div className="mb-5 rounded-xl border border-danger-100 bg-danger-50 px-4 py-3 text-sm font-medium text-danger-700">
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <Input
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          leftIcon={<Mail />}
          required
          error={errors.email?.message}
          {...register('email')}
        />

        <PasswordInput
          label="Password"
          autoComplete="current-password"
          placeholder="••••••••"
          required
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="flex items-center justify-between">
          <Checkbox label="Remember me" {...register('remember')} />
          <Link to={ROUTES.FORGOT_PASSWORD} className="text-sm font-semibold text-primary-600 hover:text-primary-700">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" fullWidth size="lg" isLoading={isPending} leftIcon={!isPending && <LogIn />}>
          Log In
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-ink-500">
        Don&apos;t have an account?{' '}
        <Link to={ROUTES.REGISTER} className="font-semibold text-primary-600 hover:text-primary-700">
          Sign up for free
        </Link>
      </p>
    </div>
  );
}