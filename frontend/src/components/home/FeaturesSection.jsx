// src/components/home/FeaturesSection.jsx
import React from 'react';
import { Clock, Sliders, HardDrive, BellRing } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Clock,
      title: 'Disponible 24/7',
      description:
        'Prenez rendez-vous à tout moment du jour et de la nuit, en toute autonomie et sans attente téléphonique.',
    },
    {
      icon: Sliders,
      title: 'Gestion simplifiée',
      description:
        'Modifiez, meprogrammez ou annulez vos consultations en un clic depuis votre tableau de bord interactif.',
    },
    {
      icon: HardDrive,
      title: 'Infos centralisées',
      description:
        'Accédez à vos ordonnances, comptes-rendus et historiques médicaux dans un espace hautement sécurisé.',
    },
    {
      icon: BellRing,
      title: 'Suivi intelligent',
      description:
        'Recevez des rappels par SMS et email pour ne jamais manquer une consultation médicale importante.',
    },
  ];

  return (
    <section className="py-20 bg-[#0A2E38] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-14">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00F2FE]">
            Technologie & Clinique
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Une expérience médicale <span className="text-[#00F2FE]">pensée pour vous</span>
          </h2>
          <p className="text-slate-300 text-sm mt-2 max-w-xl">
            Des outils modernes conçus pour simplifier chaque étape de votre suivi de santé.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="bg-[#0D3845] border border-slate-700/50 rounded-2xl p-6 hover:border-[#00F2FE]/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#134E5E] text-[#00F2FE] flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}