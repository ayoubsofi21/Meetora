import { ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl mb-6">
          Ready to revolutionize your scheduling?
        </h2>
        <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
          Join thousands of professionals who save time and grow their business with Meetora. 
          Start your free 14-day trial today—no credit card required.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-8 py-4 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors shadow-xl flex items-center gap-2">
            Start Free Trial
            <ArrowRight className="size-5" />
          </button>
          <button className="px-8 py-4 bg-transparent text-white rounded-lg hover:bg-white/10 transition-colors border-2 border-white">
            Schedule a Demo
          </button>
        </div>
        
        <p className="mt-8 text-sm text-indigo-200">
          ✓ No credit card required  ✓ 14-day free trial  ✓ Cancel anytime
        </p>
      </div>
    </section>
  );
}
