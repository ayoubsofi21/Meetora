// src/components/home/FeaturedDoctors.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import DoctorCard from './DoctorCard';

export default function FeaturedDoctors() {
  const doctors = [
    {
      id: 1,
      name: 'Dr. Yasmine El Amrani',
      specialty: 'Dermatologue',
      city: 'Casablanca / Paris',
      rating: 4.9,
      reviews: 178,
      experience: '12 ans',
      nextAvailable: 'Aujourd\'hui à 15:30',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMAeb5cWGW6rUyyq23c3otGkGHjvyJ2DLpSgOnP9tskA&s=10',
    },
    {
      id: 2,
      name: 'Dr. Alexandre Martin',
      specialty: 'Cardiologue',
      city: 'Lyon / Bordeaux',
      rating: 4.8,
      reviews: 94,
      experience: '15 ans',
      nextAvailable: 'Demain à 09:00',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD5qzbLX6PLzaL2ff07VpIiYE_5Lw1qUrsPwnPBFIP0A&s=10',
    },
    {
      id: 3,
      name: 'Dr. Sophie Laurent',
      specialty: 'Pédiatre',
      city: 'Paris 15e',
      rating: 4.9,
      reviews: 156,
      experience: '8 ans',
      nextAvailable: 'Jusqu\'à 11:00',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMAeb5cWGW6rUyyq23c3otGkGHjvyJ2DLpSgOnP9tskA&s=10',
    },
    {
      id: 4,
      name: 'Dr. Karim Benjelloun',
      specialty: 'Médecin Généraliste',
      city: 'Marrakech',
      rating: 4.8,
      reviews: 210,
      experience: '10 ans',
      nextAvailable: 'Aujourd\'hui à 17:00',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMAeb5cWGW6rUyyq23c3otGkGHjvyJ2DLpSgOnP9tskA&s=10',
    },
  ];

  return (
    <section className="py-20 bg-[#F6FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#134E5E]">
              Praticiens
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A2E38] mt-1">
              Des professionnels de santé à votre écoute
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Des médecins certifiés, vérifiés et recommandés par leur communauté de patients.
            </p>
          </div>

          <a
            href="/doctors"
            className="mt-4 sm:mt-0 inline-flex items-center text-sm font-semibold text-[#134E5E] hover:text-[#0A2E38] transition-colors"
          >
            <span>Tous les praticiens</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

      </div>
    </section>
  );
}