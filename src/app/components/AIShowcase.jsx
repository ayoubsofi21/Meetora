import { ImageWithFallback } from './figma/ImageWithFallback';
import { MessageCircle, Sparkles } from 'lucide-react';

export function AIShowcase() {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-600 to-purple-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] -z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
              <Sparkles className="size-4" />
              <span>Powered by Advanced AI</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl">
              Your AI scheduling assistant that never sleeps
            </h2>
            
            <p className="text-xl text-indigo-100">
              Our intelligent chatbot understands natural language, answers questions about your services, 
              and books appointments automatically—even at 2 AM. It's like having a personal assistant 
              working around the clock.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <MessageCircle className="size-6 mt-1 flex-shrink-0" />
                <div>
                  <div className="mb-1">Natural Conversations</div>
                  <div className="text-sm text-indigo-100">
                    Clients chat naturally—no forms, no confusion
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Sparkles className="size-6 mt-1 flex-shrink-0" />
                <div>
                  <div className="mb-1">Learns & Improves</div>
                  <div className="text-sm text-indigo-100">
                    Gets smarter over time, adapting to your preferences
                  </div>
                </div>
              </div>
            </div>
            
            <button className="px-8 py-4 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors shadow-xl">
              Try the AI Demo
            </button>
          </div>
          
          {/* Right Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-white rounded-3xl opacity-10 blur-3xl"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMGNoYXRib3QlMjBhc3Npc3RhbnQlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MzA1MzE1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="AI chatbot technology"
              className="relative rounded-2xl shadow-2xl w-full aspect-video object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
