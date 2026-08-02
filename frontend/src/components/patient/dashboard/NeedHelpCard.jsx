import { HelpCircle } from 'lucide-react';
import { Card } from '@/components/ui';

/** Light-blue support callout at the bottom of the right rail. */
export default function NeedHelpCard() {
  return (
    <Card variant="soft" padding="lg" className="border-primary-100 bg-primary-50">
      <div className="flex items-center gap-2">
        <HelpCircle className="h-5 w-5 text-primary-600" />
        <h3 className="text-sm font-bold text-ink-900">Need help?</h3>
      </div>
      <p className="mt-2 text-sm text-ink-500">
        Our patient coordinators are available 24/7 for your questions.
      </p>
      <button
        type="button"
        className="mt-4 w-full rounded-xl border border-primary-200 bg-white py-2.5 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-100"
      >
        Chat with Support
      </button>
    </Card>
  );
}