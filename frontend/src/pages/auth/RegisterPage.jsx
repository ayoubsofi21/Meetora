import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Phone, Calendar, UserPlus } from 'lucide-react';
import { Button, Input, PasswordInput, Checkbox } from '@/components/ui';
import { registerSchema } from '@/lib/validations/authSchemas';
import { useRegister } from '@/hooks/useAuth';
import { mapServerErrors } from '@/utils/mapServerErrors';
import { ROUTES } from '@/config/constants';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useRegister();
  const [formError, setFormError] = useState(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      password: '',
      passwordConfirmation: '',
      acceptTerms: false,
    },
  });

  const onSubmit = async (values) => {
    setFormError(null);
    try {
      await mutateAsync(values);
      navigate(ROUTES.VERIFY_EMAIL, { replace: true });
    } catch (error) {
      const generalMessage = mapServerErrors(error, setError);
      if (generalMessage) setFormError(generalMessage);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-ink-900">Create your account</h1>
        <p className="mt-1.5 text-sm text-ink-400">
          Join Meetora to book appointments and manage your health, all in one place.
        </p>
      </div>

      {formError && (
        <div className="mb-5 rounded-xl border border-danger-100 bg-danger-50 px-4 py-3 text-sm font-medium text-danger-700">
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input
            label="First name"
            placeholder="Sarah"
            leftIcon={<User />}
            required
            error={errors.firstName?.message}
            {...register('firstName')}
          />
          <Input
            label="Last name"
            placeholder="Chen"
            leftIcon={<User />}
            required
            error={errors.lastName?.message}
            {...register('lastName')}
          />
        </div>

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

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input
            label="Phone number"
            type="tel"
            placeholder="+212 6 00 00 00 00"
            leftIcon={<Phone />}
            required
            error={errors.phone?.message}
            {...register('phone')}
          />
          <Input
            label="Date of birth"
            type="date"
            leftIcon={<Calendar />}
            required
            error={errors.dateOfBirth?.message}
            {...register('dateOfBirth')}
          />
        </div>

        <PasswordInput
          label="Password"
          autoComplete="new-password"
          placeholder="••••••••"
          hint="At least 8 characters, one uppercase letter, one number"
          required
          error={errors.password?.message}
          {...register('password')}
        />

        <PasswordInput
          label="Confirm password"
          autoComplete="new-password"
          placeholder="••••••••"
          required
          error={errors.passwordConfirmation?.message}
          {...register('passwordConfirmation')}
        />

        <Checkbox
          label={
            <span>
              I agree to the{' '}
              <a href="#" className="font-semibold text-primary-600 hover:text-primary-700">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-semibold text-primary-600 hover:text-primary-700">
                Privacy Policy
              </a>
            </span>
          }
          error={errors.acceptTerms?.message}
          {...register('acceptTerms')}
        />
        {errors.acceptTerms && (
          <p className="-mt-3 text-xs font-medium text-danger-600">{errors.acceptTerms.message}</p>
        )}

        <Button type="submit" fullWidth size="lg" isLoading={isPending} leftIcon={!isPending && <UserPlus />}>
          Create Account
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-ink-500">
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} className="font-semibold text-primary-600 hover:text-primary-700">
          Log in
        </Link>
      </p>
    </div>
  );
}