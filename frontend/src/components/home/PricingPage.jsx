import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

import PublicNavbar from '../../components/layout/PublicNavbar';
import PublicFooter from '../../components/layout/PublicFooter';

export default function PricingPage() {
  const plans = [
    {
      name: 'Patient',
      price: 'Free',
      description: 'For patients looking to manage their healthcare.',
      features: [
        'Find doctors',
        'Book appointments',
        'Access prescriptions',
        'View medical records',
      ],
    },
    {
      name: 'Professional',
      price: '$19',
      period: '/ month',
      description: 'For independent healthcare professionals.',
      popular: true,
      features: [
        'Patient management',
        'Appointment management',
        'Availability scheduling',
        'Consultation records',
        'Prescription management',
      ],
    },
    {
      name: 'Clinic',
      price: '$49',
      period: '/ month',
      description: 'For growing medical practices and clinics.',
      features: [
        'Everything in Professional',
        'Multiple practitioners',
        'Administration dashboard',
        'Advanced patient management',
        'Priority support',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F8FD] text-[#0F172A]">
      <PublicNavbar />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-bold text-[#3F38CA] uppercase tracking-wider">
            Simple Pricing
          </span>

          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
            Choose the right plan for your healthcare needs
          </h1>

          <p className="mt-5 text-[#64748B] text-lg">
            Start simple and choose the plan that fits your practice.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-16 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl p-7 border ${
                plan.popular
                  ? 'border-[#3F38CA] shadow-xl'
                  : 'border-[#E2E8F0] shadow-sm'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-6 bg-[#3F38CA] text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <h2 className="text-xl font-bold">
                {plan.name}
              </h2>

              <p className="mt-2 text-sm text-[#64748B] min-h-10">
                {plan.description}
              </p>

              <div className="mt-6">
                <span className="text-4xl font-extrabold">
                  {plan.price}
                </span>

                {plan.period && (
                  <span className="text-[#64748B]">
                    {plan.period}
                  </span>
                )}
              </div>

              <Link
                to="/register"
                className={`mt-7 h-11 rounded-xl flex items-center justify-center
                  font-semibold text-sm transition-all ${
                    plan.popular
                      ? 'bg-[#3F38CA] hover:bg-[#312E81] text-white'
                      : 'border border-[#E2E8F0] hover:border-[#3F38CA] text-[#0F172A]'
                  }`}
              >
                Get Started
              </Link>

              <div className="mt-7 pt-6 border-t border-[#E2E8F0] space-y-4">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-sm text-[#475569]"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#EEF2FF] text-[#3F38CA] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>

                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}