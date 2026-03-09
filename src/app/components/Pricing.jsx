import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '29',
    description: 'Perfect for solo professionals',
    features: [
      'Up to 100 appointments/month',
      'AI chatbot assistant',
      'Google Calendar sync',
      'Email notifications',
      'Basic analytics',
      'Mobile app access',
    ],
    popular: false,
  },
  {
    name: 'Professional',
    price: '79',
    description: 'For growing businesses',
    features: [
      'Unlimited appointments',
      'Advanced AI chatbot',
      'Multiple calendar integrations',
      'SMS + Email notifications',
      'Advanced analytics & reports',
      'Priority support',
      'Custom branding',
      'Team collaboration (up to 5)',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'Everything in Professional',
      'Unlimited team members',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced security features',
      'SLA guarantee',
      'White-label option',
      'API access',
    ],
    popular: false,
  },
];

export function Pricing() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-slate-600">
            Choose the plan that's right for you. All plans include a 14-day free trial.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 ${
                plan.popular
                  ? 'ring-2 ring-indigo-600 shadow-2xl scale-105'
                  : 'shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl mb-2">{plan.name}</h3>
                <p className="text-slate-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-2">
                  {plan.price !== 'Custom' && <span className="text-4xl">$</span>}
                  <span className="text-5xl">{plan.price}</span>
                  {plan.price !== 'Custom' && (
                    <span className="text-slate-600">/month</span>
                  )}
                </div>
              </div>
              
              <button
                className={`w-full py-3 rounded-lg mb-8 transition-colors ${
                  plan.popular
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                }`}
              >
                {plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
              </button>
              
              <div className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <Check className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-center text-slate-600 mt-12">
          All plans include 14-day free trial. No credit card required. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
