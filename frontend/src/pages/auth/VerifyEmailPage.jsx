import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';
import { ROUTES } from '@/config/constants';

export default function VerifyEmailPage() {
	const navigate = useNavigate();

	const handleBackToLogin = useCallback(() => {
		navigate(ROUTES.LOGIN, { replace: true });
	}, [navigate]);

	return (
		<div>
			<div className="mb-8">
				<h1 className="text-2xl font-extrabold text-ink-900">Verify your email</h1>
				<p className="mt-1.5 text-sm text-ink-400">
					We sent a verification link to your email address. Click the link to activate your account.
				</p>
			</div>

			<div className="rounded-xl border border-ink-100 bg-white/60 p-6 text-sm text-ink-600">
				<p>If you didn't receive the email, check your spam folder or try registering again.</p>

				<div className="mt-4">
					<Button variant="secondary" onClick={handleBackToLogin}>
						Back to login
					</Button>
				</div>
			</div>
		</div>
	);
}
