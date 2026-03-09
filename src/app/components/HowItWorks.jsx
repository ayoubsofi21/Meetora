import { MessageSquare, Calendar, Clock } from 'lucide-react';

const steps = [
  {
    icon: Calendar,
    title: 'Set Your Availability',
    description: 'Connect your Google Calendar and define when you\'re available for appointments.',
  },
  {
    icon: MessageSquare,
    title: 'Let AI Do the Work',
    description: 'Share your booking link. Our AI chatbot handles client questions and scheduling 24/7.',
  },
  {
    icon: Clock,
    title: 'Get Booked & Notified',
    description: 'Receive instant notifications for new bookings. Everything syncs automatically.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">
            Get started in minutes
          </h2>
          <p className="text-xl text-slate-600">
            Simple setup, powerful results. Here's how Meetora works
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connection lines for desktop */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200 -z-10"></div>
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-xl opacity-20"></div>
                    <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 size-20 rounded-full flex items-center justify-center">
                      <Icon className="size-9 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-white text-indigo-600 size-8 rounded-full flex items-center justify-center border-2 border-indigo-600 text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-2xl mb-3">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
