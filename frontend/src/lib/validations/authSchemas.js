import { z } from 'zod';

const emailField = z
  .string()
  .min(1, 'Email is required')
  .email('Enter a valid email address');

const passwordField = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Include at least one uppercase letter')
  .regex(/[0-9]/, 'Include at least one number');

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    firstName: z.string().min(2, 'First name must be at least 2 characters').max(50),
    lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50),
    email: emailField,
    phone: z
      .string()
      .min(8, 'Enter a valid phone number')
      .regex(/^[+0-9\s()-]+$/, 'Enter a valid phone number'),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    password: passwordField,
    passwordConfirmation: z.string().min(1, 'Please confirm your password'),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the Terms of Service and Privacy Policy' }),
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });

export const forgotPasswordSchema = z.object({
  email: emailField,
});

export const resetPasswordSchema = z
  .object({
    password: passwordField,
    passwordConfirmation: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });