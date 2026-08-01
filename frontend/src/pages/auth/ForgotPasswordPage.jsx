import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, ArrowLeft, MailCheck } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { forgotPasswordSchema } from '@/lib/validations/authSchemas';
import { useForgotPassword } from '@/hooks/useAuth';
import { mapServerErrors } from '@/utils/mapServerErrors';
import { ROUTES } from '@/config/constants';

export default function ForgotPasswordPage() {
  const { mutateAsync, isPending } = useForgotPassword();
  const [formError, setFormError] = useState(null);
  const [sentTo, setSentTo] = useState(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (values) => {
    setFormError(null);
    try {
      await mutateAsync(values);
      setSentTo(values.email);
    } catch (error) {
      const generalMessage = mapServerErrors(error, setError);
      if (generalMessage) setFormError(generalMessage);
    }
  };

  if (sentTo) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-success-100 text-success-600">
          <MailCheck className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-extrabold text-ink-900">Check your inbox</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ink-400">
          If an account exists for <span className="font-semibold text-ink-700">{sentTo}</span>, we&apos;ve sent a
          password reset link.
        </p>
        <Link
          to={ROUTES.LOGIN}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-ink-900">Forgot password?</h1>
        <p className="mt-1.5 text-sm text-ink-400">
          Enter the email associated with your account and we&apos;ll send you a reset link.
        </p>
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

        <Button type="submit" fullWidth size="lg" isLoading={isPending}>
          Send reset link
        </Button>
      </form>

      <Link
        to={ROUTES.LOGIN}
        className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to login
      </Link>
    </div>
  );
}