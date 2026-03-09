import { Calendar, Bot, Zap, Bell, Users, Shield } from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'AI-Powered Chatbot',
    description: 'Let our intelligent chatbot handle appointment bookings naturally through conversation, saving you time and effort.',
    color: 'indigo',
  },
  {
    icon: Calendar,
    title: 'Google Calendar Sync',
    description: 'Seamlessly integrate with Google Calendar. All appointments automatically sync in real-time across all your devices.',
    color: 'purple',
  },
  {
    icon: Zap,
    title: 'Real-Time Updates',
    description: 'Instant notifications and updates. Stay informed about new bookings, changes, and cancellations as they happen.',
    color: 'blue',
  },
  {
    icon: Bell,
    title: 'Smart Reminders',
    description: 'Automated email and push notifications ensure neither you nor your clients miss an appointment.',
    color: 'pink',
  },
  {
    icon: Users,
    title: 'Multi-User Support',
    description: 'Perfect for teams. Manage multiple service providers, schedules, and appointment types from one dashboard.',
    color: 'teal',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with 99.9% uptime. Your data is encrypted and backed up automatically.',
    color: 'green',
  },
];

const colorClasses = {
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', iconBg: 'bg-indigo-100' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', iconBg: 'bg-purple-100' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', iconBg: 'bg-blue-100' },
  pink: { bg: 'bg-pink-50', text: 'text-pink-600', iconBg: 'bg-pink-100' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-600', iconBg: 'bg-teal-100' },
  green: { bg: 'bg-green-50', text: 'text-green-600', iconBg: 'bg-green-100' },
};

export function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">
            Everything you need to manage appointments
          </h2>
          <p className="text-xl text-slate-600">
            Powerful features designed to streamline your scheduling workflow and delight your clients
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colors = colorClasses[feature.color];
            
            return (
              <div
                key={index}
                className={`${colors.bg} rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`${colors.iconBg} ${colors.text} size-14 rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className="size-7" />
                </div>
                <h3 className="text-xl mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
