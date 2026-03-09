import { Calendar, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-20 pb-32">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm">
              <Calendar className="size-4" />
              <span>AI-Powered Scheduling</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tight">
              Schedule smarter with{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Meetora
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-xl">
              The intelligent appointment scheduling platform that syncs with your calendar, 
              uses AI to assist bookings, and eliminates the back-and-forth.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-200">
                Get Started Free
                <ArrowRight className="size-5" />
              </button>
              <button className="px-8 py-4 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors border border-slate-200">
                Watch Demo
              </button>
            </div>
            
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl">10K+</div>
                <div className="text-sm text-slate-600">Active Users</div>
              </div>
              <div className="h-12 w-px bg-slate-300"></div>
              <div>
                <div className="text-3xl">50K+</div>
                <div className="text-sm text-slate-600">Appointments Booked</div>
              </div>
              <div className="h-12 w-px bg-slate-300"></div>
              <div>
                <div className="text-3xl">99.9%</div>
                <div className="text-sm text-slate-600">Uptime</div>
              </div>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl opacity-20 blur-3xl"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1758556549027-879615701c61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWxlbmRhciUyMHNjaGVkdWxpbmclMjBhcHBvaW50bWVudHxlbnwxfHx8fDE3NzMwNTMxNTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Calendar scheduling interface"
              className="relative rounded-2xl shadow-2xl w-full aspect-square object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
