import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, KeyRound } from 'lucide-react';
import { Button, PasswordInput } from '@/components/ui';
import { resetPasswordSchema } from '@/lib/validations/authSchemas';
import { useResetPassword } from '@/hooks/useAuth';
import { mapServerErrors } from '@/utils/mapServerErrors';
import { ROUTES } from '@/config/constants';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';

  const { mutateAsync, isPending } = useResetPassword();
  const [formError, setFormError] = useState(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', passwordConfirmation: '' },
  });

  const onSubmit = async (values) => {
    setFormError(null);
    try {
      await mutateAsync({ ...values, token, email });
      setSuccess(true);
      setTimeout(() => navigate(ROUTES.LOGIN, { replace: true }), 2000);
    } catch (error) {
      const generalMessage = mapServerErrors(error, setError);
      if (generalMessage) setFormError(generalMessage);
    }
  };

  if (!token || !email) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-danger-100 text-danger-600">
          <KeyRound className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-extrabold text-ink-900">Invalid or expired link</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ink-400">
          This password reset link is invalid or has expired. Please request a new one.
        </p>
        <Link
          to={ROUTES.FORGOT_PASSWORD}
          className="mt-6 inline-block text-sm font-semibold text-primary-600 hover:text-primary-700"
        >
          Request a new link
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-success-100 text-success-600">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-extrabold text-ink-900">Password updated</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ink-400">Redirecting you to the login page…</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-ink-900">Set a new password</h1>
        <p className="mt-1.5 text-sm text-ink-400">
          Choose a strong new password for <span className="font-semibold text-ink-700">{email}</span>.
        </p>
      </div>

      {formError && (
        <div className="mb-5 rounded-xl border border-danger-100 bg-danger-50 px-4 py-3 text-sm font-medium text-danger-700">
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <PasswordInput
          label="New password"
          autoComplete="new-password"
          placeholder="••••••••"
          hint="At least 8 characters, one uppercase letter, one number"
          required
          error={errors.password?.message}
          {...register('password')}
        />
        <PasswordInput
          label="Confirm new password"
          autoComplete="new-password"
          placeholder="••••••••"
          required
          error={errors.passwordConfirmation?.message}
          {...register('passwordConfirmation')}
        />

        <Button type="submit" fullWidth size="lg" isLoading={isPending}>
          Reset password
        </Button>
      </form>
    </div>
  );
}