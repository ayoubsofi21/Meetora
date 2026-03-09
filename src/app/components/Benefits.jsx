import { ImageWithFallback } from './figma/ImageWithFallback';
import { CheckCircle2 } from 'lucide-react';

const benefits = [
  'Save 10+ hours per week on scheduling',
  'Reduce no-shows by 70% with automated reminders',
  'Increase bookings with 24/7 AI assistant',
  'Eliminate double-bookings completely',
];

export function Benefits() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1642522029686-5485ea7e6042?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1lZXRpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzcyOTg2Nzg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Business meeting"
                className="rounded-2xl shadow-lg w-full aspect-square object-cover"
              />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758691736843-90f58dce465e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzMwMzQ5Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Team collaboration"
                className="rounded-2xl shadow-lg w-full aspect-square object-cover mt-12"
              />
            </div>
          </div>
          
          {/* Right Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm mb-4">
                Why Meetora?
              </div>
              <h2 className="text-4xl md:text-5xl mb-4">
                Focus on what matters, we'll handle the rest
              </h2>
              <p className="text-xl text-slate-600">
                Stop wasting time coordinating schedules. Meetora automates the entire 
                appointment booking process so you can focus on delivering value to your clients.
              </p>
            </div>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="size-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-lg text-slate-700">{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-4">
              <button className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                Start Your Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
